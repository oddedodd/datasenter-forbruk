"use client";

import { useMemo } from "react";

const PRICE_AREAS = ["NO1", "NO2", "NO3", "NO4", "NO5"] as const;

export type PriceArea = (typeof PRICE_AREAS)[number];

interface ControlsProps {
  selectedAreas: PriceArea[];
  onChangeAreas: (areas: PriceArea[]) => void;
  startDate?: string;
  endDate?: string;
  onChangeStartDate: (value?: string) => void;
  onChangeEndDate: (value?: string) => void;
}

export function Controls({
  selectedAreas,
  onChangeAreas,
  startDate,
  endDate,
  onChangeStartDate,
  onChangeEndDate,
}: ControlsProps) {
  const allSelected = useMemo(
    () => PRICE_AREAS.every((a) => selectedAreas.includes(a)),
    [selectedAreas]
  );

  const toggleAll = () => {
    if (allSelected) {
      onChangeAreas([]);
    } else {
      onChangeAreas([...PRICE_AREAS]);
    }
  };

  const toggleArea = (area: PriceArea) => {
    if (selectedAreas.includes(area)) {
      onChangeAreas(selectedAreas.filter((a) => a !== area));
    } else {
      onChangeAreas([...selectedAreas, area]);
    }
  };

  return (
    <div className="w-full border-b border-red-900/40 bg-red-950 px-4 py-6 text-base text-red-50 lg:w-auto lg:min-w-[220px] lg:border-b-0 lg:border-r lg:px-6 lg:py-8 lg:h-full">
      <div className="space-y-2 lg:space-y-4">
        <div className="text-sm font-semibold uppercase tracking-wide text-red-200/80">
          Prisområde
        </div>
        <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-2">
          <label className="flex cursor-pointer items-center gap-2 text-red-50">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-red-400 bg-red-900 accent-red-600 lg:h-5 lg:w-5"
              checked={allSelected}
              onChange={toggleAll}
            />
            <span className="text-sm lg:text-base">Velg alt</span>
          </label>
          {PRICE_AREAS.map((area) => (
            <label
              key={area}
              className="flex cursor-pointer items-center gap-2 text-red-50"
            >
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-red-400 bg-red-900 accent-red-600 lg:h-5 lg:w-5"
                checked={selectedAreas.includes(area)}
                onChange={() => toggleArea(area)}
              />
              <span className="text-sm lg:text-base">{area}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-3 lg:mt-12">
        <div className="text-sm font-semibold uppercase tracking-wide text-red-200/80">
          Bruksdøgn
        </div>
        <div className="space-y-2">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-red-200/80">Fra</span>
            <input
              type="date"
              value={startDate ?? ""}
              onChange={(e) => onChangeStartDate(e.target.value || undefined)}
              className="w-full rounded border border-red-700 bg-red-900 px-2 py-1.5 text-sm text-red-50 outline-none ring-red-400 focus:ring-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-red-200/80">Til</span>
            <input
              type="date"
              value={endDate ?? ""}
              onChange={(e) => onChangeEndDate(e.target.value || undefined)}
              className="w-full rounded border border-red-700 bg-red-900 px-2 py-1.5 text-sm text-red-50 outline-none ring-red-400 focus:ring-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
