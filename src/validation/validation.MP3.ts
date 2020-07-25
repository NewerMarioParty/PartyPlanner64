import { getRule } from "./validationrules";
import { getArrowRotationLimit } from "../adapter/boardinfo";
import "./validation.common";
import { BankEvent, ItemShopEvent } from "../events/builtin/events.common";
import { Game } from "../types";

const commonRules = [
  getRule("TOOMANYBOWSERS", { limit: 0 }),
  getRule("TOOMANYKOOPAS", { limit: 0 }),
  getRule("GATESETUP"),
  getRule("OVERRECOMMENDEDSPACES", { max: 128 }),
  getRule("ADDITIONALBGCODEISSUE"),
];

export function getValidationRules(gameID: Game) {
  const rules = commonRules.slice(0);

  const totalArrowsToWrite = getArrowRotationLimit();
  rules.push(getRule("TOOMANYARROWROTATIONS", { limit: totalArrowsToWrite }));

  rules.push(getRule("TOOMANYOFEVENT", { event: BankEvent, high: 2 }));
  rules.push(getRule("TOOMANYBANKS", { limit: 2 }));
  rules.push(getRule("TOOMANYOFEVENT", { event: ItemShopEvent, high: 2 }));
  rules.push(getRule("TOOMANYITEMSHOPS", { limit: 2 }));

  // TODO: gamemasterplc: @PartyPlanner64 replace 0x323AAC in ROM with a NOP if you want more boos
  rules.push(getRule("TOOMANYBOOS", { limit: 1 }));
  rules.push(getRule("TOOMANYGATES", { limit: 2 }));

  rules.push(getRule("BADSTARCOUNT", { low: 0, high: 8, disallowed: { 1: true } }));
  rules.push(getRule("WARNNOSTARSPACES"));

  // No longer needed? See MP3 onAfterOverwrite.
  //rules.push(getRule("TOOFEWBLUESPACES", { low: 14 }));
  //rules.push(getRule("TOOFEWREDSPACES", { low: 1 }));

  return rules;
}
