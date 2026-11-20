/** Official-style US Robux pricing constants for informational estimates.
 *  Verified against common public Roblox store listings and DevEx docs (Nov 2026).
 *  Not affiliated with Roblox Corporation.
 */

export const RATES_LAST_VERIFIED = "2026-11-20";

export type RobuxPack = {
  priceUsd: number;
  webRobux: number;
  appRobux: number;
};

/** Nine standard US one-time packs (web/gift-card vs mobile/console). */
export const ROBUX_PACKS: readonly RobuxPack[] = [
  { priceUsd: 2.99, webRobux: 270, appRobux: 240 },
  { priceUsd: 4.99, webRobux: 500, appRobux: 400 },
  { priceUsd: 9.99, webRobux: 1000, appRobux: 800 },
  { priceUsd: 14.99, webRobux: 1500, appRobux: 1200 },
  { priceUsd: 19.99, webRobux: 2000, appRobux: 1700 },
  { priceUsd: 34.99, webRobux: 3625, appRobux: 3150 },
  { priceUsd: 49.99, webRobux: 5250, appRobux: 4500 },
  { priceUsd: 99.99, webRobux: 11000, appRobux: 10000 },
  { priceUsd: 199.99, webRobux: 24000, appRobux: 22500 },
] as const;

/** Smooth purchase benchmarks from the $9.99 tier. */
export const WEB_RATE_PER_ROBUX = 9.99 / 1000; // 0.00999
export const APP_RATE_PER_ROBUX = 9.99 / 800; // 0.0124875

export const DEVEX_STANDARD = 0.0038;
export const DEVEX_US_18_PLUS = 0.0054;
export const DEVEX_LEGACY = 0.0035;
export const DEVEX_MINIMUM_ROBUX = 30_000;

export const MARKETPLACE_FEE = 0.3;
export const MARKETPLACE_KEEP = 0.7;

export type Channel = "web" | "app";

export type PackCombo = {
  totalCost: number;
  totalRobux: number;
  packs: Array<{ priceUsd: number; robux: number; count: number }>;
};

function packRobux(pack: RobuxPack, channel: Channel): number {
  return channel === "web" ? pack.webRobux : pack.appRobux;
}

/** Cheapest whole-pack combo that reaches at least `targetRobux`. */
export function cheapestPackCombo(
  targetRobux: number,
  channel: Channel = "web",
  maxTarget = 50_000
): PackCombo | null {
  if (!Number.isFinite(targetRobux) || targetRobux <= 0) return null;

  const packs = ROBUX_PACKS.map((p) => ({
    priceUsd: p.priceUsd,
    robux: packRobux(p, channel),
  })).sort((a, b) => b.robux - a.robux);

  const biggest = packs[0];
  let bulkCount = 0;
  let remaining = Math.ceil(targetRobux);

  if (remaining > maxTarget && biggest) {
    bulkCount = Math.floor((remaining - maxTarget) / biggest.robux) + 1;
    remaining = Math.max(0, remaining - bulkCount * biggest.robux);
  }

  // Reach at least `remaining`, allow modest overshoot for better packs.
  const limit = remaining + (biggest?.robux ?? 0);
  const INF = 1e15;
  const cost = new Array<number>(limit + 1).fill(INF);
  const prev = new Array<number>(limit + 1).fill(-1);
  const prevPack = new Array<number>(limit + 1).fill(-1);
  cost[0] = 0;

  for (let r = 0; r <= limit; r++) {
    if (cost[r] >= INF) continue;
    for (let i = 0; i < packs.length; i++) {
      const p = packs[i];
      const next = Math.min(limit, r + p.robux);
      // Tiny per-pack penalty prefers fewer transactions when nearly tied.
      const nextCost = cost[r] + p.priceUsd + 0.03;
      if (nextCost < cost[next]) {
        cost[next] = nextCost;
        prev[next] = r;
        prevPack[next] = i;
      }
    }
  }

  let bestIdx = -1;
  let bestScore = INF;
  for (let r = remaining; r <= limit; r++) {
    if (cost[r] < bestScore) {
      bestScore = cost[r];
      bestIdx = r;
    }
  }
  if (bestIdx < 0 || bestScore >= INF) return null;

  const counts = new Map<number, { priceUsd: number; robux: number; count: number }>();
  let cursor = bestIdx;
  let guard = 0;
  while (cursor > 0 && prevPack[cursor] >= 0 && guard < 80) {
    const i = prevPack[cursor];
    const p = packs[i];
    const cur = counts.get(p.priceUsd) ?? { priceUsd: p.priceUsd, robux: p.robux, count: 0 };
    cur.count += 1;
    counts.set(p.priceUsd, cur);
    cursor = prev[cursor];
    guard += 1;
  }

  if (bulkCount > 0 && biggest) {
    const cur = counts.get(biggest.priceUsd) ?? {
      priceUsd: biggest.priceUsd,
      robux: biggest.robux,
      count: 0,
    };
    cur.count += bulkCount;
    counts.set(biggest.priceUsd, cur);
  }

  const packList = Array.from(counts.values()).sort((a, b) => b.priceUsd - a.priceUsd);
  return {
    totalCost: packList.reduce((s, p) => s + p.priceUsd * p.count, 0),
    totalRobux: packList.reduce((s, p) => s + p.robux * p.count, 0),
    packs: packList,
  };
}

/** Maximize Robux for a USD budget using whole packs. */
export function maxRobuxForBudget(
  budgetUsd: number,
  channel: Channel = "web"
): PackCombo | null {
  if (!Number.isFinite(budgetUsd) || budgetUsd < ROBUX_PACKS[0].priceUsd) {
    return {
      totalCost: 0,
      totalRobux: 0,
      packs: [],
    };
  }

  const packs = ROBUX_PACKS.map((p) => ({
    priceUsd: p.priceUsd,
    robux: packRobux(p, channel),
  })).sort((a, b) => b.robux / b.priceUsd - a.robux / a.priceUsd);

  // DP on cents for accuracy
  const budgetCents = Math.floor(budgetUsd * 100 + 1e-6);
  const robuxAt = new Array<number>(budgetCents + 1).fill(0);
  const pickAt = new Array<number>(budgetCents + 1).fill(-1);

  for (let c = 0; c <= budgetCents; c++) {
    for (let i = 0; i < packs.length; i++) {
      const price = Math.round(packs[i].priceUsd * 100);
      if (c + price > budgetCents) continue;
      const next = robuxAt[c] + packs[i].robux;
      if (next > robuxAt[c + price]) {
        robuxAt[c + price] = next;
        pickAt[c + price] = i;
      }
    }
  }

  let bestC = 0;
  for (let c = 0; c <= budgetCents; c++) {
    if (robuxAt[c] > robuxAt[bestC]) bestC = c;
  }

  const counts = new Map<number, { priceUsd: number; robux: number; count: number }>();
  let cursor = bestC;
  let guard = 0;
  while (cursor > 0 && pickAt[cursor] >= 0 && guard < 80) {
    const i = pickAt[cursor];
    const p = packs[i];
    const price = Math.round(p.priceUsd * 100);
    const cur = counts.get(p.priceUsd) ?? { priceUsd: p.priceUsd, robux: p.robux, count: 0 };
    cur.count += 1;
    counts.set(p.priceUsd, cur);
    cursor -= price;
    guard += 1;
  }

  const packList = Array.from(counts.values()).sort((a, b) => b.priceUsd - a.priceUsd);
  return {
    totalCost: packList.reduce((s, p) => s + p.priceUsd * p.count, 0),
    totalRobux: robuxAt[bestC],
    packs: packList,
  };
}

export function smoothBuyUsd(robux: number, channel: Channel): number {
  const rate = channel === "web" ? WEB_RATE_PER_ROBUX : APP_RATE_PER_ROBUX;
  return robux * rate;
}

export function smoothRobuxFromUsd(usd: number, channel: Channel): number {
  const rate = channel === "web" ? WEB_RATE_PER_ROBUX : APP_RATE_PER_ROBUX;
  return Math.round(usd / rate);
}

export function devexUsd(robux: number, rate = DEVEX_STANDARD): number {
  return robux * rate;
}

export function afterMarketplaceFee(robux: number): number {
  // Integer-safe 30% fee: keep 70% without float drift (e.g. 700 → 490).
  return Math.floor((Math.round(robux) * 7) / 10);
}

export function priceForNetRobux(netRobux: number): number {
  // Smallest whole list price that nets at least `netRobux` after 30% fee.
  return Math.ceil((Math.round(netRobux) * 10) / 7);
}

export function formatUsd(n: number, digits = 2): string {
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(n);
}

export function formatRobux(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat("en-US").format(Math.round(n));
}

export const POPULAR_ROBUX = [
  100, 400, 500, 800, 1000, 1500, 2000, 5000, 10000, 30000, 50000, 100000, 1000000,
] as const;

export const POPULAR_USD = [5, 10, 15, 20, 25, 50, 100, 200] as const;
