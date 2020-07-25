import { getRule } from "./validationrules";
import "./validation.common";
import { Game } from "../types";

const commonRules = [
  getRule("TOOMANYGATES", { limit: 0 }),
  getRule("ADDITIONALBGCODEISSUE"),
  getRule("TOOMANYBOOS", { limit: 2 }),
  getRule("TOOMANYBOWSERS", { limit: 1 }),
  getRule("TOOMANYKOOPAS", { limit: 1 }),
  getRule("BADSTARCOUNT", { low: 0, high: 7, disallowed: { 1: true } }),
  getRule("WARNNOSTARSPACES"),
];

export function getValidationRules(gameID: Game) {
  return commonRules.slice(0);
}
