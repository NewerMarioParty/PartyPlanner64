import { ValidationLevel } from "../types";
import { IBoard } from "../boards";

const _rules = Object.create(null);

type ValidationReturnType = false | string;

export interface IValidationRule {
  id: string;
  name: string;
  level: ValidationLevel;
  fails(board: IBoard, args?: any): ValidationReturnType | Promise<ValidationReturnType>;
}

const ValidationRuleBase: IValidationRule = {
  id: "",
  name: "",
  level: ValidationLevel.ERROR,
  fails: function(board, args) { throw new Error("fails not implemented"); },
};

export function createRule(id: string, name: string, level: ValidationLevel): IValidationRule {
  let rule = Object.create(ValidationRuleBase);
  rule.id = id;
  rule.name = name;
  rule.level = level;
  _rules[id] = rule;
  return rule;
}

// var NAMEHERE = createRule("", "");
// NAMEHERE.fails = function(board: IBoard, args: any) {
  
// };

export function getRule(id: string, args?: any) {
  let rule = _rules[id];
  let newRule = {
    id: rule.id,
    name: rule.name,
    level: rule.level,
    fails: function(board: IBoard) {
      return rule.fails(board, args);
    }
  };
  return newRule;
}
