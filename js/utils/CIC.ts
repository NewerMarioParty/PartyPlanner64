namespace PP64.utils {
  /**
   * Different possible CIC variations.
   * MP uses 6102 but we might as well write this in a generic way.
   */
  const Type = {
    "6101": 6101,
    "6102": 6102,
    "6103": 6103,
    "6105": 6105,
    "6106": 6106,
  };

  // We need to initialize a CRC table once that we can reuse.
  const _CRCTable = new Array(256);
  (function() {
    let crcTable = _CRCTable;

    let poly = 0xEDB88320;
    for (let i = 0; i < 256; i++) {
      let crc = i;
      for (let j = 8; j > 0; j--) {
        if (crc & 1)
          crc = ((crc >>> 1) ^ poly) >>> 0;
        else
          crc >>>= 1;
      }
      crcTable[i] = crc >>> 0;
    }
  })();

  /**
   * N64 ROMs have checksums that need to be correct to run on real hardware.
   * The following logic is responsible for recalculating those checksums.
   *
   * I have no idea who originally did the work to figure all this out. I mostly
   * ported the source code from spinout182's n64crc.c code.
   */
  export class CIC {
    static fixChecksum(buffer: ArrayBuffer) {
      function ROL(i: number, b: number) {
        return (i << b) | (i >>> (32 - b));
      }

      let bootcode = PP64.utils.CIC._getGameCIC(buffer);
      let seed = PP64.utils.CIC._getChecksumSeed(bootcode);
      let [t1, t2, t3, t4, t5, t6] = [seed, seed, seed, seed, seed, seed];

      $$log(`CIC.fixChecksum -> Bootcode: ${bootcode}, seed: ${$$hex(seed)}`);

      let romView = new DataView(buffer);
      let N64_HEADER_SIZE = 0x40;
      let CHECKSUM_START = 0x00001000;
      let CHECKSUM_LENGTH = 0x00100000;
      let i = CHECKSUM_START;
      while (i < (CHECKSUM_START + CHECKSUM_LENGTH)) {
        let d = romView.getUint32(i);
        if (((t6 + d) >>> 0) < t6)
          t4++; t4 >>>= 0;
        t6 += d; t6 >>>= 0;
        t3 ^= d; t3 >>>= 0;
        let r = ROL(d, (d & 0x1F)) >>> 0;
        t5 += r; t5 >>>= 0;
        if (t2 > d)
          t2 ^= r;
        else
          t2 ^= (t6 ^ d) >>> 0;
        t2 >>>= 0;

        if (bootcode === 6105)
          t1 += romView.getUint32(N64_HEADER_SIZE + 0x0710 + (i & 0xFF)) ^ d;
        else
          t1 += (t5 ^ d) >>> 0;
        t1 >>>= 0;

        i += 4;
      }

      let crc1, crc2;
      if (bootcode === 6103) {
        crc1 = (t6 ^ t4); crc1 >>>= 0;
        crc1 += t3; crc1 >>>= 0;
        crc2 = (t5 ^ t2); crc2 >>>= 0;
        crc2 += t1; crc2 >>>= 0;
      }
      else if (bootcode === 6106) {
        crc1 = (t6 * t4); crc1 >>>= 0;
        crc1 += t3; crc1 >>>= 0;
        crc2 = (t5 * t2); crc2 >>>= 0;
        crc2 += t1; crc2 >>>= 0;
      }
      else {
        crc1 = (t6 ^ t4); crc1 >>>= 0;
        crc1 ^= t3; crc1 >>>= 0;
        crc2 = (t5 ^ t2); crc2 >>>= 0;
        crc2 ^= t1; crc2 >>>= 0;
      }

      romView.setUint32(0x10, crc1);
      romView.setUint32(0x14, crc2);

      $$log(`CIC.fixChecksum -> CRC1: ${$$hex(crc1)}, CRC2: ${$$hex(crc2)}`);
    }

    static _getChecksumSeed(bootcode: number) {
      switch (bootcode) {
        case 6101:
        case 6102:
          return 0xF8CA4DDC;
        case 6103:
          return 0xA3886759;
        case 6105:
          return 0xDF26F436;
        case 6106:
          return 0x1FEA617A;
      }
      throw `CIC._getChecksumSeed: Bad bootcode ${bootcode}`;
    }

    static _getGameCIC(buffer: ArrayBuffer) {
      let N64_HEADER_SIZE = 0x40;
      let N64_BC_SIZE = 0x1000 - N64_HEADER_SIZE;
      let cicTestingArr = new Uint8Array(buffer, N64_HEADER_SIZE, N64_BC_SIZE);
      let crc = PP64.utils.CIC._crc32(cicTestingArr);
      switch (crc) {
        case 0x6170A4A1: return Type[6101];
        case 0x90BB6CB5: return Type[6102];
        case 0x0B050EE0: return Type[6103];
        case 0x98BC2C86: return Type[6105];
        case 0xACC8580A: return Type[6106];
      }
      return Type[6105]; // Why is this the default?
    }

    static _crc32(arr: Uint8Array) {
      let len = arr.byteLength;
      let crc = 0xFFFFFFFF;
      let crcTable = _CRCTable;
      for (let i = 0; i < len; i++) {
        crc = ((crc >>> 8) ^ crcTable[((crc ^ arr[i]) >>> 0) & 0xFF]) >>> 0;
      }
      return (~crc) >>> 0;
    }
  }
}
