"use client";

import { useMemo, useState } from "react";
import {
  DEVEX_STANDARD,
  DEVEX_US_18_PLUS,
  WEB_RATE_PER_ROBUX,
  formatRobux,
  formatUsd,
} from "@/lib/robuxRates";
import { grossFromNet, netFromGross } from "@/lib/taxMath";

type Mode = "gross-to-net" | "net-to-gross";

const fieldClass =
  "w-full rounded-2xl border border-ink/12 bg-[#F4F8F7] px-4 py-3.5 text-base font-semibold text-ink outline-none transition placeholder:text-ink/30 hover:border-ink/20 focus:border-teal/60 focus:bg-white focus:ring-4 focus:ring-teal/15";

const GROSS_PRESETS = [100, 500, 1000, 5000, 10000, 50000];
const NET_PRESETS = [70, 350, 700, 3500, 7000, 30000];

export default function RobuxTaxCalculator({ id = "tax-calculator" }: { id?: string }) {
  const [mode, setMode] = useState<Mode>("gross-to-net");
  const [input, setInput] = useState("1000");

  const value = Math.max(0, Math.floor(Number(input.replace(/,/g, "")) || 0));

  const result = useMemo(() => {
    const gross = mode === "gross-to-net" ? value : grossFromNet(value);
    const net = mode === "gross-to-net" ? netFromGross(value) : value;
    return {
      gross,
      net,
      fee: gross - net,
      devexStandard: net * DEVEX_STANDARD,
      devexUs18: net * DEVEX_US_18_PLUS,
      buyCost: gross * WEB_RATE_PER_ROBUX,
    };
  }, [mode, value]);

  const presets = mode === "gross-to-net" ? GROSS_PRESETS : NET_PRESETS;

  return (
    <section
      id={id}
      className="relative overflow-hidden rounded-[1.75rem] border border-ink/10 bg-white p-1 shadow-[0_28px_70px_-40px_rgba(13,148,136,0.35)]"
    >
      <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-teal/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-10 h-52 w-52 rounded-full bg-orange/10 blur-3xl" />
      <div className="relative rounded-[1.4rem] bg-white p-4 sm:p-6 md:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-deep">
          Live calculator
        </p>
        <h2 className="mt-1 font-display text-xl font-bold text-ink sm:text-2xl">
          Robux tax calculator (30% fee)
        </h2>
        <p className="mt-1 text-sm text-ink/55">
          Informational estimate · net = floor(gross × 0.7) · gross = ceil(net ÷ 0.7)
        </p>

        <div className="mb-4 mt-5 grid grid-cols-2 gap-2 rounded-2xl bg-ink/[0.03] p-1.5">
          {(
            [
              ["gross-to-net", "Sale price → You receive"],
              ["net-to-gross", "Want to receive → Set price"],
            ] as const
          ).map(([m, label]) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                mode === m ? "bg-white text-teal-deep shadow-sm" : "text-ink/55 hover:text-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <label htmlFor={`${id}-input`} className="mb-2 block text-sm font-semibold text-ink/70">
          {mode === "gross-to-net"
            ? "Item sale price (gross Robux)"
            : "Robux you want to receive (net)"}
        </label>
        <input
          id={`${id}-input`}
          inputMode="numeric"
          autoComplete="off"
          value={input}
          onChange={(e) => setInput(e.target.value.replace(/[^\d,]/g, ""))}
          className={fieldClass}
          placeholder="1000"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setInput(String(p))}
              className="rounded-full bg-ink/[0.05] px-3 py-1.5 text-xs font-semibold text-ink/65 transition hover:bg-ink/10"
            >
              {formatRobux(p)}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3" aria-live="polite">
          <div className="rounded-2xl bg-teal/[0.07] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-deep">
              {mode === "gross-to-net" ? "You receive (net)" : "Set price (gross)"}
            </p>
            <p className="mt-1 font-display text-3xl font-bold text-ink">
              {formatRobux(mode === "gross-to-net" ? result.net : result.gross)}
            </p>
            <p className="text-xs text-ink/55">Robux</p>
          </div>
          <div className="rounded-2xl bg-orange/[0.08] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-deep">
              Roblox fee (30%)
            </p>
            <p className="mt-1 font-display text-3xl font-bold text-ink">
              {formatRobux(result.fee)}
            </p>
            <p className="text-xs text-ink/55">Robux</p>
          </div>
          <div className="rounded-2xl bg-ink/[0.04] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/60">
              {mode === "gross-to-net" ? "Buyer pays (gross)" : "You receive (net)"}
            </p>
            <p className="mt-1 font-display text-3xl font-bold text-ink">
              {formatRobux(mode === "gross-to-net" ? result.gross : result.net)}
            </p>
            <p className="text-xs text-ink/55">Robux</p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-ink/10 p-4">
          <p className="mb-2 text-sm font-semibold text-ink">USD equivalents for the net Robux</p>
          <dl className="grid gap-2 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-ink/55">DevEx standard ($0.0038)</dt>
              <dd className="font-semibold text-ink">{formatUsd(result.devexStandard)}</dd>
            </div>
            <div>
              <dt className="text-ink/55">DevEx U.S. 18+ ($0.0054)</dt>
              <dd className="font-semibold text-ink">{formatUsd(result.devexUs18)}</dd>
            </div>
            <div>
              <dt className="text-ink/55">Buy cost of the gross (web)</dt>
              <dd className="font-semibold text-ink">{formatUsd(result.buyCost)}</dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-ink/50">
            DevEx needs at least 30,000 earned Robux and eligibility. Results are estimates, not
            payout guarantees.
          </p>
        </div>
      </div>
    </section>
  );
}
