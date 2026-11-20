/** Integer-safe marketplace fee math (avoids float errors like 700 * 0.7 = 489.99999). */

/** net = floor(gross * 0.7) */
export function netFromGross(gross: number): number {
  return Math.floor((Math.max(0, gross) * 7) / 10);
}

/** gross = ceil(net / 0.7) */
export function grossFromNet(net: number): number {
  return Math.ceil((Math.max(0, net) * 10) / 7);
}
