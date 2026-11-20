"use client";

import { useMemo, useState } from "react";
import {
  APP_RATE_PER_ROBUX,
  Channel,
  DEVEX_MINIMUM_ROBUX,
  DEVEX_STANDARD,
  DEVEX_US_18_PLUS,
  RATES_LAST_VERIFIED,
  WEB_RATE_PER_ROBUX,
  afterMarketplaceFee,
  cheapestPackCombo,
  devexUsd,
  formatRobux,
  formatUsd,
  maxRobuxForBudget,
  smoothBuyUsd,
  smoothRobuxFromUsd,
} from "@/lib/robuxRates";

const fieldClass =
  "calc-input w-full rounded-2xl border border-ink/12 bg-[#F4F8F7] px-4 py-3.5 text-base font-semibold text-ink outline-none transition placeholder:text-ink/30 hover:border-ink/20 focus:border-teal/60 focus:bg-white focus:ring-4 focus:ring-teal/15";

type Mode = "robux-to-usd" | "usd-to-robux";

const ROBUX_PRESETS = [400, 800, 1000, 2500, 5000, 10000, 30000, 100000];
const USD_PRESETS = [5, 10, 25, 50, 100];

export default function RobuxCalculator({
  id = "calculator",
  title = "Robux to USD Calculator",
  defaultMode = "robux-to-usd",
}: {
  id?: string;
  title?: string;
  defaultMode?: Mode;
}) {
  const [mode, setMode] = useState<Mode>(defaultMode);
  const [channel, setChannel] = useState<Channel>("web");
  const [robuxInput, setRobuxInput] = useState("1000");
  const [usdInput, setUsdInput] = useState("25");

  const robux = Math.max(0, Number(robuxInput.replace(/,/g, "")) || 0);
  const usd = Math.max(0, Number(usdInput.replace(/,/g, "")) || 0);

  const result = useMemo(() => {
    if (mode === "robux-to-usd") {
      const smooth = smoothBuyUsd(robux, channel);
      const combo = cheapestPackCombo(robux, channel);
      const standard = devexUsd(robux, DEVEX_STANDARD);
      const us18 = devexUsd(robux, DEVEX_US_18_PLUS);
      const afterFee = afterMarketplaceFee(robux);
      return { smooth, combo, standard, us18, afterFee };
    }
    const smoothR = smoothRobuxFromUsd(usd, channel);
    const combo = maxRobuxForBudget(usd, channel);
    return {
      smooth: smoothBuyUsd(smoothR, channel),
      combo,
      standard: devexUsd(smoothR, DEVEX_STANDARD),
      us18: devexUsd(smoothR, DEVEX_US_18_PLUS),
      afterFee: afterMarketplaceFee(smoothR),
      smoothR,
    };
  }, [mode, robux, usd, channel]);

  const rateLabel =
    channel === "web"
      ? `${formatUsd(WEB_RATE_PER_ROBUX, 4)} / Robux · web & gift cards`
      : `${formatUsd(APP_RATE_PER_ROBUX, 4)} / Robux · mobile & console`;

  return (
    <div
      id={id}
      className="calc-shell relative scroll-mt-20 overflow-hidden rounded-[1.75rem] border border-ink/10 bg-white p-1 shadow-[0_28px_70px_-40px_rgba(13,148,136,0.35)]"
    >
      <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-teal/10 blur-3xl hero-glow" />
      <div className="pointer-events-none absolute -bottom-24 -left-10 h-52 w-52 rounded-full bg-orange/10 blur-3xl" />

      <div className="relative rounded-[1.4rem] bg-white p-4 sm:p-6 md:p-7">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-deep">
              Live converter
            </p>
            <h2 className="mt-1 font-display text-xl font-bold text-ink sm:text-2xl">{title}</h2>
            <p className="mt-1 text-sm text-ink/55">
              Rates verified {RATES_LAST_VERIFIED} · informational estimates only
            </p>
          </div>
          <p className="rounded-full bg-ink/[0.04] px-3 py-1.5 text-xs font-medium text-ink/65">
            {rateLabel}
          </p>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2 rounded-2xl bg-ink/[0.03] p-1.5">
          {(
            [
              ["robux-to-usd", "Robux → USD"],
              ["usd-to-robux", "USD → Robux"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setMode(value)}
              className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                mode === value
                  ? "bg-white text-teal-deep shadow-sm"
                  : "text-ink/55 hover:text-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {(
            [
              ["web", "Web / Gift Card"],
              ["app", "Mobile / Console"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setChannel(value)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                channel === value
                  ? "bg-teal text-white"
                  : "bg-ink/[0.05] text-ink/65 hover:bg-ink/10"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {mode === "robux-to-usd" ? (
          <label className="mb-3 block">
            <span className="mb-1.5 block text-sm font-semibold text-ink/70">Robux amount</span>
            <input
              className={fieldClass}
              inputMode="numeric"
              value={robuxInput}
              onChange={(e) => setRobuxInput(e.target.value.replace(/[^\d]/g, ""))}
              placeholder="1000"
              aria-label="Robux amount"
            />
          </label>
        ) : (
          <label className="mb-3 block">
            <span className="mb-1.5 block text-sm font-semibold text-ink/70">USD budget / gift card</span>
            <input
              className={fieldClass}
              inputMode="decimal"
              value={usdInput}
              onChange={(e) => setUsdInput(e.target.value.replace(/[^\d.]/g, ""))}
              placeholder="25"
              aria-label="USD amount"
            />
          </label>
        )}

        <div className="mb-5 flex flex-wrap gap-2">
          {(mode === "robux-to-usd" ? ROBUX_PRESETS : USD_PRESETS).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() =>
                mode === "robux-to-usd"
                  ? setRobuxInput(String(n))
                  : setUsdInput(String(n))
              }
              className="rounded-lg border border-ink/10 bg-white px-2.5 py-1 text-xs font-semibold text-ink/70 transition hover:border-teal/40 hover:text-teal-deep"
            >
              {mode === "robux-to-usd" ? formatRobux(n) : formatUsd(n, 0)}
            </button>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-gradient-to-br from-teal/10 to-teal/5 p-4 ring-1 ring-teal/15">
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-deep">
              {mode === "robux-to-usd" ? "Estimated buy value" : "Robux you can buy"}
            </p>
            <p className="mt-2 font-display text-3xl font-bold text-ink">
              {mode === "robux-to-usd"
                ? formatUsd(result.smooth)
                : formatRobux(result.smoothR ?? 0)}
            </p>
            <p className="mt-1 text-sm text-ink/55">
              Smooth {channel === "web" ? "web" : "app"} rate
              {mode === "robux-to-usd"
                ? ` · ${formatRobux(robux)} Robux`
                : ` · ${formatUsd(usd)} budget`}
            </p>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-orange/10 to-orange/5 p-4 ring-1 ring-orange/15">
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-deep">
              {mode === "robux-to-usd" ? "Cheapest whole packs" : "Best pack combo"}
            </p>
            <p className="mt-2 font-display text-3xl font-bold text-ink">
              {result.combo && result.combo.totalRobux > 0
                ? mode === "robux-to-usd"
                  ? formatUsd(result.combo.totalCost)
                  : formatRobux(result.combo.totalRobux)
                : "—"}
            </p>
            <p className="mt-1 text-sm text-ink/55">
              {result.combo && result.combo.totalRobux > 0
                ? mode === "robux-to-usd"
                  ? `Delivers ${formatRobux(result.combo.totalRobux)} Robux`
                  : `Spends ${formatUsd(result.combo.totalCost)} · left ${formatUsd(
                      Math.max(0, usd - result.combo.totalCost)
                    )}`
                : "Below smallest $2.99 pack"}
            </p>
          </div>
        </div>

        {result.combo && result.combo.packs.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {result.combo.packs.map((p) => (
              <li
                key={`${p.priceUsd}-${p.robux}`}
                className="rounded-lg bg-ink/[0.04] px-2.5 py-1 text-xs font-medium text-ink/70"
              >
                {p.count}× {formatUsd(p.priceUsd)} → {formatRobux(p.robux)} R$
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <div className="rounded-xl border border-ink/8 bg-[#F8FBFA] p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-ink/45">
              DevEx $0.0038
            </p>
            <p className="mt-1 text-lg font-bold text-ink">
              {formatUsd(
                mode === "robux-to-usd" ? result.standard : result.standard
              )}
            </p>
            {(mode === "robux-to-usd" ? robux : result.smoothR ?? 0) <
              DEVEX_MINIMUM_ROBUX && (
              <p className="mt-1 text-[11px] text-orange-deep">
                Below 30,000 Earned Robux minimum
              </p>
            )}
          </div>
          <div className="rounded-xl border border-ink/8 bg-[#F8FBFA] p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-ink/45">
              U.S. 18+ $0.0054
            </p>
            <p className="mt-1 text-lg font-bold text-ink">{formatUsd(result.us18)}</p>
            <p className="mt-1 text-[11px] text-ink/45">Eligible creator spend only</p>
          </div>
          <div className="rounded-xl border border-ink/8 bg-[#F8FBFA] p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-ink/45">
              After 30% fee
            </p>
            <p className="mt-1 text-lg font-bold text-ink">
              {formatRobux(result.afterFee)} R$
            </p>
            <p className="mt-1 text-[11px] text-ink/45">Marketplace keep rate</p>
          </div>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-ink/45">
          US list prices before sales tax. Purchased Robux cannot be cashed out for real money.
          DevEx applies only to eligible Earned Robux. Not affiliated with Roblox Corporation.
        </p>
      </div>
    </div>
  );
}
