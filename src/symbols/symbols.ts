import { Game } from "../types";

import MarioParty1U from "./MarioParty1U.sym";
import MarioParty1J from "./MarioParty1J.sym";
import MarioParty1E from "./MarioParty1E.sym";
import MarioParty2U from "./MarioParty2U.sym";
import MarioParty2J from "./MarioParty2J.sym";
import MarioParty3U from "./MarioParty3U.sym";
import MarioParty3J from "./MarioParty3J.sym";

function _getSymbolsForGame(game: Game): ISymbol[] {
  switch (game) {
    case Game.MP1_USA: return MarioParty1U;
    case Game.MP1_JPN: return MarioParty1J;
    case Game.MP1_PAL: return MarioParty1E;
    case Game.MP2_USA: return MarioParty2U;
    case Game.MP2_JPN: return MarioParty2J;
    case Game.MP2_PAL: throw new Error("Symbols not available for game type " + game);
    case Game.MP3_USA: return MarioParty3U;
    case Game.MP3_JPN: return MarioParty3J;
    case Game.MP3_PAL: throw new Error("Symbols not available for game type " + game);
  }

  throw new Error("Unrecognized game type " + game);
}

interface ISymbols {
  [symName: string]: ISymbol[];
}

export interface ISymbol {
  name: string;
  type: string;
  addr: number;
}

/** Retrieves the array of symbols for a game, optionally filtered by type. */
export function getSymbols(game: Game, type?: any) {
  let symbols = _getSymbolsForGame(game);
  if (!symbols)
    return [];

  if (type) {
    symbols = symbols.filter(sym => {
      return sym.type === type;
    });
  }

  symbols = symbols.filter(sym => {
    return sym.name[0] !== "_" // Filter private-ish symbols
      && sym.name[0] !== "?"; // Filter non-symbols starting with ?
  });

  return symbols;
}

/** Retrieves the value of a particular symbol. */
export function getSymbol(game: Game, name: string) {
  let symbols = _getSymbolsForGame(game);
  if (!symbols)
    throw new Error(`Symbols aren't available for ${game}.`);

  for (let i = 0; i < symbols.length; i++) {
    if (symbols[i].name === name) {
      return symbols[i].addr;
    }
  }

  throw new Error(`Symbol ${name} wasn't found for ${game}.`);
}
