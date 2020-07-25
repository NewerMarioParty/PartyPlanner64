import { IBoard } from "../boards";
import { EventCodeLanguage, getGameName, Game } from "../types";
import { prepAdditionalBgC, prepAdditionalBgAsm } from "./prepAdditionalBg";
import { prepGenericC } from "./prepC";
import { compile } from "../utils/c-compiler";
import { $$log } from "../utils/debug";
import { assemble } from "mips-assembler";
import { prepGenericAsm } from "./prepAsm";

/** Default assembly code used for background selection. */
export const defaultAdditionalBgAsm = `; Customize the background used each turn!
; This function runs at the start of each turn.
; The default background is available as DEFAULT_BG.
; Additional backgrounds are available as ADDITIONAL_BG_#,
; e.g. ADDITIONAL_BG_1 for the first added background.
ADDIU SP SP -4
SW RA 0(SP)

; Return the background index in V0.
LI V0 DEFAULT_BG

LW RA 0(SP)
JR RA
ADDIU SP SP 4`;

export const defaultAdditionalBgC = `// Customize the background used each turn!
// This function runs at the start of each turn.
// The default background is available as DEFAULT_BG.
// Additional backgrounds are available as ADDITIONAL_BG_#,
// e.g. ADDITIONAL_BG_1 for the first added background.

int PickBackground() {
    return DEFAULT_BG;
}`

export function makeFakeBgSyms(board: IBoard): number[] {
  if (!board.additionalbg)
    return [];

  let i = 0;
  return board.additionalbg.map(bg => ++i);
}

export async function testAdditionalBgCode(code: string, language: EventCodeLanguage, bgIndices: number[], game: Game): Promise<string[]> {
  let failures: string[] = [];

  if (language === EventCodeLanguage.C) {
    const cWithDefines = prepAdditionalBgC(code, 0, bgIndices);
    try {
      const preppedC = prepGenericC(cWithDefines, game);
      $$log(preppedC);
      const asm = await compile(preppedC);
      $$log(asm);
      const preppedAsm = prepGenericAsm(asm, 0x80000000, game);
      assemble(preppedAsm);
    }
    catch (e) {
      failures.push(`Failed test compile/assemble for ${getGameName(game)}:\n${e.toString()}\n`);
    }
  }
  else {
    const asmWithBgSyms = prepAdditionalBgAsm(code, 0, bgIndices);
    try {
      const preppedAsm = prepGenericAsm(asmWithBgSyms, 0x80000000, game);
      $$log(preppedAsm);
      assemble(preppedAsm);
    }
    catch (e) {
      failures.push(`Failed test assembly for ${getGameName(game)}:\n${e.toString()}\n`);
    }
  }

  return failures;
}
