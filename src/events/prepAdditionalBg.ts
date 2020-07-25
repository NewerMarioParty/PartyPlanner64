import { scopeLabelsStaticByDefault } from "./prepAsm";
import { getAdditionalBackgroundCode, IBoard } from "../boards";
import { defaultAdditionalBgAsm } from "./additionalbg";
import { EventCodeLanguage } from "../types";
import { prepGenericC } from "./prepC";
import { romhandler } from "../romhandler";
import { compile } from "../utils/c-compiler";

export async function getAdditionalBgAsmForOverlay(board: IBoard, bgDir: number, additionalBgIndices: number[] | undefined) {
  const bgCode = getAdditionalBackgroundCode(board);
  if (!bgCode) {
    return prepAdditionalBgAsm(defaultAdditionalBgAsm, bgDir, additionalBgIndices);
  }

  switch (bgCode.language) {
    case EventCodeLanguage.C:
      const cWithDefines = prepAdditionalBgC(bgCode.code, bgDir, additionalBgIndices);
      const game = romhandler.getROMGame()!;
      const preppedC = prepGenericC(cWithDefines, game);
      const asm = await compile(preppedC);
      return scopeLabelsStaticByDefault(`
        .beginfile ; Scopes static labels
        ${asm}
        .align 4
        .endfile
      `, true);

    case EventCodeLanguage.MIPS:
      return prepAdditionalBgAsm(bgCode.code, bgDir, additionalBgIndices);

    default:
      throw new Error(`Unrecognized event code language ${bgCode.language}`);
  }
}

/** Surrounds the additional bg code with the necessary bg symbols. */
export function prepAdditionalBgAsm(asm: string, defaultBgIndex: number, additionalBgIndices?: number[]): string {
  return scopeLabelsStaticByDefault(`
    .beginfile ; Scopes static labels
    __PP64_INTERNAL_ADDITIONAL_BG_CHOICE:
    ${makeBgSymbols(defaultBgIndex, additionalBgIndices).join("\n")}
    ${asm}
    .align 4
    .endfile
  `, true);
}

function makeBgSymbols(defaultBgIndex: number, additionalBgIndices?: number[]): string[] {
  const syms = [
    `.definelabel DEFAULT_BG,${defaultBgIndex}`
  ];

  if (additionalBgIndices) {
    additionalBgIndices.forEach((bgIndex, i) => {
      syms.push(`.definelabel ADDITIONAL_BG_${i + 1},${bgIndex}`);
    });
  }

  return syms;
}

/** Surrounds the additional bg C code with the necessary symbols. */
export function prepAdditionalBgC(code: string, defaultBgIndex: number, additionalBgIndices?: number[]): string {
  return `
    #define PickBackground __PP64_INTERNAL_ADDITIONAL_BG_CHOICE
    ${makeBgDefines(defaultBgIndex, additionalBgIndices).join("\n")}
    ${code}
  `;
}

function makeBgDefines(defaultBgIndex: number, additionalBgIndices?: number[]): string[] {
  const syms = [
    `#define DEFAULT_BG ${defaultBgIndex}`
  ];

  if (additionalBgIndices) {
    additionalBgIndices.forEach((bgIndex, i) => {
      syms.push(`#define ADDITIONAL_BG_${i + 1} ${bgIndex}`);
    });
  }

  return syms;
}