import { IEvent, IEventWriteInfo } from "./events";
import { IEventInstance } from "../boards";
import { EventParameterType, Game } from "../types";
import { getChainIndexValuesFromAbsoluteIndex } from "../adapter/boarddef";

/**
 * Takes event C code, and makes it able to compile (in isolation)
 */
export function prepC(code: string, event: IEvent, spaceEvent: IEventInstance, info: IEventWriteInfo) {
  const parameterDefines = makeParameterSymbolDefines(event, spaceEvent, info);
  const codeWithParamDefines = [
    ...parameterDefines,
    code,
  ].join("\n");

  return prepGenericC(codeWithParamDefines, info.game);
}

/**
 * Takes event C code, and makes it able to compile (in isolation)
 */
export function prepGenericC(code: string, game: Game) {
  // TODO: Add in game-specific pre-made types.
  // const syms = getGameLibraryHeaders(game, true);
  return [
    //...syms,
    code,
  ].join("\n");
}

/**
 * Creates C pre-processor defines for parameters.
 */
export function makeParameterSymbolDefines(event: IEvent, spaceEvent: IEventInstance, info: IEventWriteInfo): string[] {
  let parameterSymbols: string[] = [];
  const parameters = event.parameters;
  const parameterValues = spaceEvent.parameterValues;
  if (parameters && parameters.length && parameterValues) {
    parameters.forEach(parameter => {
      const parameterValue = parameterValues[parameter.name];
      switch (parameter.type) {
        case EventParameterType.Boolean:
          parameterSymbols.push(`#define ${parameter.name} ${parameterValue ? 1 : 0}`);
          break;

        case EventParameterType.Space:
          parameterSymbols.push(`#define ${parameter.name} ${parameterValue}`);
          if (info.chains) {
            const indices = getChainIndexValuesFromAbsoluteIndex(info.chains, parameterValue as number);
            parameterSymbols.push(`#define ${parameter.name}_chain_index ${indices[0]}`);
            parameterSymbols.push(`#define ${parameter.name}_chain_space_index ${indices[1]}`);
          }
          else {
            // Mostly for testCompile
            parameterSymbols.push(`#define ${parameter.name}_chain_index -1`);
            parameterSymbols.push(`#define ${parameter.name}_chain_space_index -1`);
          }
          break;

        case EventParameterType.Number:
          if (typeof parameterValue === "number") {
            parameterSymbols.push(`#define ${parameter.name} ${parameterValue}`);
          }
          break;

        case EventParameterType.NumberArray:
          break; // TODO: Maybe expose labels for these?

        default:
          if (typeof parameterValue !== "undefined" && parameterValue !== null) {
            parameterSymbols.push(`#define ${parameter.name} ${parameterValue}`);
          }
          break;
      }
    })
  }
  return parameterSymbols;
}
