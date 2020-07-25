import { $$log, $$hex } from "../utils/debug";
import { makeDivisibleBy } from "../utils/number";
import { strings, StringTable } from "./strings";
import { decompress } from "../utils/compression";
import { copyRange } from "../utils/arrays";
import { Game } from "../types";
import { romhandler } from "../romhandler";

interface IOffsetInfo {
  upper: number;
  lower: number;
}

type ILocale = "jp" | "en" | "de" | "es" | "it" | "fr";

let _stringOffsets: { [game in Game]?: { [locale in ILocale]?: IOffsetInfo[] } } = {};
_stringOffsets[Game.MP3_USA] = {
  "jp": [
    { upper: 0x0000F142, lower: 0x0000F14A }, // 0x1209850, len 0x13250
    { upper: 0x0005B3CA, lower: 0x0005B3D2 },
  ],
  "en": [
    { upper: 0x0005B412, lower: 0x0005B41A }, // 0x121CAA0
  ],
  "de": [
    { upper: 0x0005B42A, lower: 0x0005B432 }, // 0x12355C0
  ],
  "es": [
    { upper: 0x0005B436, lower: 0x0005B43E }, // 0x12765F0
  ],
  "it": [
    { upper: 0x0005B442, lower: 0x0005B446 }, // 0x1261F90
  ],
  "fr": [
    { upper: 0x0005B41E, lower: 0x0005B426 }, // 0x124D440
  ],
};
_stringOffsets[Game.MP3_JPN] = {
  "jp": [
    { upper: 0x0000F142, lower: 0x0000F14A }, // 0x1206E00
    { upper: 0x0005B262, lower: 0x0005B26A },
  ],
  // "en": [
  //   { upper: , lower:  }, // 0x121A050
  // ],
  // "de": [
  //   { upper: , lower:  }, // 0x122FCE0
  // ],
  // "es": [
  //   { upper: , lower:  }, // 0x1247B60
  // ],
  // "it": [
  //   { upper: , lower:  }, // 0x125C6B0
  // ],
  // "fr": [
  //   { upper: , lower:  }, // 0x1270D10
  // ],
};


var _strFsInstances: { [locale: string]: StringTableSet } | null;

class StringTableSet {
  private dirs: StringTable[];

  constructor(dataView: DataView) {
    this.dirs = this._extract(dataView)
  }

  _extract(view: DataView) {
    let dirCount = this._getDirectoryCountFromView(view);
    let dirs = new Array(dirCount);
    for (let d = 0; d < dirCount; d++) {
      dirs[d] = this._readDirFromView(view, d);
    }
    return dirs;
  }

  _getDirectoryCountFromView(view: DataView) {
    return view.getUint32(0);
  }

  _readDirFromView(view: DataView, dir: number) {
    let entryOffset = this._getDirOffsetFromView(view, dir);
    let entryView = new DataView(view.buffer, view.byteOffset + entryOffset);
    let decompressedDir = this._decompressDir(entryView);
    return new strings.StringTable(new DataView(decompressedDir));
  }

  _decompressDir(view: DataView) {
    let decompressedSize = view.getUint32(0);
    let compressionType = view.getUint32(4);
    let dirStartView = new DataView(view.buffer, view.byteOffset + 8);
    return decompress(compressionType, dirStartView, decompressedSize)
  }

  _getDirOffsetFromView(view: DataView, dir: number) {
    return view.getUint32(4 * (1 + dir));
  }

  public read(dir: number, index: number, raw: true): ArrayBuffer;
  public read(dir: number, index: number, raw?: false): string;
  public read(dir: number, index: number, raw: boolean): ArrayBuffer | string;
  public read(dir: number, index: number, raw: boolean = false): ArrayBuffer | string {
    if (dir < 0 || dir >= this.getDirectoryCount())
      throw new Error("Requesting non-existent string directory");
    return this.dirs[dir].read(index, raw);
  }

  write(dir: number, index: number, content: ArrayBuffer) {
    this.dirs[dir].write(index, content);
  }

  getDirectoryCount(): number {
    return this.dirs.length;
  }

  getStringCount(dir: number): number {
    return this.dirs[dir].getStringCount();
  }

  getByteLength(): number {
    let byteLen = 0;
    let dirCount = this.dirs.length;

    byteLen += 4; // Count of directories
    byteLen += 4 * dirCount; // Directory offsets

    for (let d = 0; d < dirCount; d++) {
      byteLen += 4; // Decompressed size
      byteLen += 4; // Compression type
      byteLen += this.dirs[d].getByteLength();
      byteLen = makeDivisibleBy(byteLen, 2);
    }

    return byteLen;
  }

  pack(buffer: ArrayBuffer, offset: number = 0) {
    let view = new DataView(buffer, offset);

    let dirCount = this.getDirectoryCount();
    view.setUint32(0, dirCount);

    let curDirIndexOffset = 4;
    let curDirWriteOffset = 4 + (dirCount * 4);
    for (let d = 0; d < dirCount; d++) {
      view.setUint32(curDirIndexOffset, curDirWriteOffset);
      curDirIndexOffset += 4;
      view.setUint32(curDirWriteOffset, this.dirs[d].getByteLength()); // Decompressed size
      curDirWriteOffset += 4;
      view.setUint32(curDirWriteOffset, 0); // Compression type
      curDirWriteOffset += 4;
      curDirWriteOffset = this._packDir(d, view, curDirWriteOffset);
      curDirWriteOffset = makeDivisibleBy(curDirWriteOffset, 2);
    }

    return curDirWriteOffset;
  }

  _packDir(d: number, view: DataView, offset: number) {
    const decompressedSize = this.dirs[d].getByteLength();
    let decompressedBuffer = new ArrayBuffer(decompressedSize);
    this.dirs[d].pack(decompressedBuffer, 0);
    copyRange(view, decompressedBuffer, offset, 0, decompressedSize);
    return offset + decompressedSize;
  }
}

export const strings3 = {
  getROMOffset(locale: ILocale = "en") {
    let romView = romhandler.getDataView();
    const localeOffsets = strings3.getPatchOffsets(locale);
    if (!localeOffsets) {
      return null;
    }
    let romOffset = localeOffsets[0];
    if (!romOffset)
      return null;
    let upper = romView.getUint16(romOffset.upper) << 16;
    let lower = romView.getUint16(romOffset.lower);
    let offset = upper | lower;
    if (lower & 0x8000)
      offset = offset - 0x00010000; // Signed ASM addition workaround.
    $$log(`Strings3.getROMOffset[${locale}] -> ${$$hex(offset)}`);
    return offset;
  },

  setROMOffset(newOffset: number, buffer: ArrayBuffer) {
    let romView = new DataView(buffer);
    let curOffset = newOffset;
    let locales = strings3.getLocales(romhandler.getROMGame()!);
    for (let l = 0; l < locales.length; l++) {
      let locale = locales[l];
      let patchOffsets = strings3.getPatchOffsets(locale)!;
      let upper = (curOffset & 0xFFFF0000) >>> 16;
      let lower = curOffset & 0x0000FFFF;
      if (lower & 0x8000)
        upper += 1; // Adjust for signed addition in ASM.
      for (let i = 0; i < patchOffsets.length; i++) {
        romView.setUint16(patchOffsets[i].upper, upper);
        romView.setUint16(patchOffsets[i].lower, lower);
      }
      $$log(`Strings3.setROMOffset[${locale}] -> ${$$hex((upper << 16) | lower)}`);
      curOffset += makeDivisibleBy(_strFsInstances![locale].getByteLength(), 16);
    }
  },

  getPatchOffsets(locale: ILocale = "en") {
    return _stringOffsets[romhandler.getROMGame()!]![locale];
  },

  clear() {
    _strFsInstances = null;
  },

  extract() {
    _strFsInstances = {};
    let locales = strings3.getLocales(romhandler.getROMGame()!);
    for (let l = 0; l < locales.length; l++) {
      let locale = locales[l];
      let localeView = romhandler.getDataView(strings3.getROMOffset(locale)!);
      _strFsInstances[locale] = new StringTableSet(localeView);
    }
    return _strFsInstances;
  },

  extractAsync() {
    return new Promise((resolve, reject) => {
      strings3.extract();
      resolve();
    });
  },

  pack(buffer: ArrayBuffer, offset: number = 0) {
    let nextOffset = offset;
    let locales = strings3.getLocales(romhandler.getROMGame()!);
    for (let l = 0; l < locales.length; l++) {
      let locale = locales[l];
      let instance = _strFsInstances![locale];
      nextOffset = nextOffset + instance.pack(buffer, nextOffset);
      nextOffset = makeDivisibleBy(nextOffset, 16);
    }
    return nextOffset;
  },

  //read(locale: ILocale, dir: number, index: number, raw: true): ArrayBuffer;
  //read(locale: ILocale, dir: number, index: number, raw?: false): string;
  //read(locale: ILocale, dir: number, index: number, raw: boolean): ArrayBuffer | string;
  read(locale: ILocale, dir: number, index: number, raw: boolean = false) {
    return _strFsInstances![locale].read(dir, index, raw);
  },

  // Writes a pre-made buffer for now.
  write(locale: ILocale, dir: number, index: number, content: ArrayBuffer) {
    _strFsInstances![locale].write(dir, index, content);
  },

  getLocales(game: Game): ILocale[] {
    return Object.keys(_stringOffsets[game]!) as ILocale[];
  },

  getDirectoryCount(locale: ILocale) {
    return _strFsInstances![locale].getDirectoryCount();
  },

  getStringCount(locale: ILocale, dir: number) {
    return _strFsInstances![locale].getStringCount(dir);
  },

  // Gets the required byte length of the string section of the ROM.
  getByteLength() {
    let byteLen = 0;
    let locales = strings3.getLocales(romhandler.getROMGame()!);
    for (let l = 0; l < locales.length; l++) {
      let locale = locales[l];
      byteLen += makeDivisibleBy(_strFsInstances![locale].getByteLength(), 16);
    }
    return byteLen;
  }
}
