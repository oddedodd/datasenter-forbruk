"use client";

import { useMemo, useState } from "react";
import type { DailyAreaData } from "../lib/types";
import { filterByDateRange } from "../lib/transformData";
import { ConsumptionChart } from "./ConsumptionChart";
import { Controls, type PriceArea } from "./Controls";

const ALL_AREAS: PriceArea[] = ["NO1", "NO2", "NO3", "NO4", "NO5"];

interface Props {
  dailySeries: DailyAreaData[];
}

export function Dashboard({ dailySeries }: Props) {
  const [selectedAreas, setSelectedAreas] = useState<PriceArea[]>([...ALL_AREAS]);
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);

  const filteredData = useMemo(
    () => filterByDateRange(dailySeries, startDate, endDate),
    [dailySeries, startDate, endDate],
  );

  return (
    <div className="flex min-h-screen bg-emerald-50 text-slate-900">
      <Controls
        selectedAreas={selectedAreas}
        onChangeAreas={setSelectedAreas}
        startDate={startDate}
        endDate={endDate}
        onChangeStartDate={setStartDate}
        onChangeEndDate={setEndDate}
      />

      <main className="flex flex-1 flex-col gap-6 px-8 py-8">
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Strømforbruk i datasentre
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Daglig forbruk per prisområde (kWh).
            </p>
          </div>

          <div className="inline-flex gap-2 rounded-full bg-emerald-100 p-1 text-xs font-medium text-emerald-900">
            <button className="rounded-full bg-emerald-900 px-3 py-1 text-emerald-50">
              Forbruk pr. døgn og prisområde
            </button>
            <button className="rounded-full px-3 py-1 text-emerald-900/60">
              Forbruk pr. år
            </button>
            <button className="rounded-full px-3 py-1 text-emerald-900/60">
              Forbruk pr. døgn
            </button>
          </div>
        </header>

        <section className="flex-1">
          <ConsumptionChart data={filteredData} activeAreas={selectedAreas} />
        </section>
      </main>
    </div>
  );
}

