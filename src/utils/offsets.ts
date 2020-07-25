/**
 * Converts a ROM offset to a RAM offset.
 * Does not handle overlay offsets, only simple ones.
 */
export function romToRAM(romOffset: number): number {
  return ((romOffset - 0xC00) | 0x80000000) >>> 0;
}

/**
 * Converts a RAM offset to a ROM offset.
 * Does not handle overlay offsets, only simple ones.
 */
export function ramToROM(ramOffset: number): number {
  return ((ramOffset + 0xC00) & 0x7FFFFFFF) >>> 0;
}
