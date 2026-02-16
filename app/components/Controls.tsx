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
    <nav
      className="w-full border-b border-border bg-background-secondary px-4 py-6 text-base text-foreground lg:h-full lg:w-auto lg:min-w-[220px] lg:border-b-0 lg:border-r lg:px-6 lg:py-8"
      aria-label="Datafiltrering"
    >
      <fieldset className="space-y-2 lg:space-y-4">
        <legend className="text-sm font-semibold uppercase tracking-wide text-foreground">
          Prisområde
        </legend>
        <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-2" role="group" aria-label="Velg prisområder">
          <label className="flex cursor-pointer items-center gap-2 text-foreground">
            <input
              type="checkbox"
              className="h-4 w-4 rounded accent-accent lg:h-5 lg:w-5"
              checked={allSelected}
              onChange={toggleAll}
              aria-label="Velg alle prisområder"
            />
            <span className="text-sm lg:text-base">Velg alt</span>
          </label>
          {PRICE_AREAS.map((area) => (
            <label
              key={area}
              className="flex cursor-pointer items-center gap-2 text-foreground"
            >
              <input
                type="checkbox"
                className="h-4 w-4 rounded accent-accent lg:h-5 lg:w-5"
                checked={selectedAreas.includes(area)}
                onChange={() => toggleArea(area)}
                aria-label={`Prisområde ${area}`}
              />
              <span className="text-sm lg:text-base">{area}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-8 space-y-3 lg:mt-12">
        <legend className="text-sm font-semibold uppercase tracking-wide text-foreground">
          Bruksdøgn
        </legend>
        <div className="space-y-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="start-date" className="text-sm text-foreground">
              Fra
            </label>
            <input
              id="start-date"
              type="date"
              value={startDate ?? ""}
              onChange={(e) => onChangeStartDate(e.target.value || undefined)}
              className="w-full rounded border border-border bg-background px-2 py-1.5 text-sm text-foreground outline-none focus:ring-2"
              aria-label="Startdato for filtrering"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="end-date" className="text-sm text-foreground">
              Til
            </label>
            <input
              id="end-date"
              type="date"
              value={endDate ?? ""}
              onChange={(e) => onChangeEndDate(e.target.value || undefined)}
              className="w-full rounded border border-border bg-background px-2 py-1.5 text-sm text-foreground outline-none focus:ring-2"
              aria-label="Sluttdato for filtrering"
            />
          </div>
        </div>
      </fieldset>
    </nav>
  );
}
