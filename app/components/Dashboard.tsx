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
    <div className="flex min-h-screen flex-col lg:flex-row" style={{ backgroundColor: '#121417', color: '#E5E7EB' }}>
      <main className="order-1 flex flex-1 flex-col gap-4 px-4 py-4 sm:gap-6 sm:px-6 md:px-8 md:py-8 lg:order-2">
        <header className="flex flex-col gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl" style={{ color: '#E5E7EB' }}>
              Strømforbruk i datasentre pr. døgn og prisområde
            </h1>
            <p className="mt-1 text-sm sm:text-base" style={{ color: '#E5E7EB' }}>
              Daglig forbruk per prisområde (kWh).
            </p>
          </div>
        </header>

        <section className="flex-1 overflow-x-auto">
          <ConsumptionChart data={filteredData} activeAreas={selectedAreas} />
        </section>
      </main>

      <div className="order-2 lg:order-1 lg:h-screen">
        <Controls
          selectedAreas={selectedAreas}
          onChangeAreas={setSelectedAreas}
          startDate={startDate}
          endDate={endDate}
          onChangeStartDate={setStartDate}
          onChangeEndDate={setEndDate}
        />
      </div>
    </div>
  );
}

