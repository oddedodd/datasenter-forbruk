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
    <div className="flex flex-col gap-8 border-r border-emerald-900/40 bg-emerald-950 px-6 py-8 text-sm text-emerald-50 md:min-w-[220px]">
      <div className="space-y-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-emerald-200/80">
          Prisområde
        </div>
        <div className="space-y-2">
          <label className="flex cursor-pointer items-center gap-2 text-emerald-50">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-emerald-400 bg-emerald-900"
              checked={allSelected}
              onChange={toggleAll}
            />
            <span>Velg alt</span>
          </label>
          {PRICE_AREAS.map((area) => (
            <label
              key={area}
              className="flex cursor-pointer items-center gap-2 text-emerald-50"
            >
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-emerald-400 bg-emerald-900"
                checked={selectedAreas.includes(area)}
                onChange={() => toggleArea(area)}
              />
              <span>{area}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wide text-emerald-200/80">
          Bruksdøgn
        </div>
        <div className="space-y-2">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-emerald-200/80">Fra</span>
            <input
              type="date"
              value={startDate ?? ""}
              onChange={(e) => onChangeStartDate(e.target.value || undefined)}
              className="w-full rounded border border-emerald-700 bg-emerald-900 px-2 py-1 text-xs text-emerald-50 outline-none ring-emerald-400 focus:ring-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-emerald-200/80">Til</span>
            <input
              type="date"
              value={endDate ?? ""}
              onChange={(e) => onChangeEndDate(e.target.value || undefined)}
              className="w-full rounded border border-emerald-700 bg-emerald-900 px-2 py-1 text-xs text-emerald-50 outline-none ring-emerald-400 focus:ring-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
