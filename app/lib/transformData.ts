import type { DataRow, DailyAreaData } from "./types";

export function buildDailyAreaSeries(rows: DataRow[]): DailyAreaData[] {
  const byDate = new Map<string, DailyAreaData>();

  for (const row of rows) {
    const key = row.date.slice(0, 10); // YYYY-MM-DD
    let entry = byDate.get(key);

    if (!entry) {
      entry = { date: key };
      byDate.set(key, entry);
    }

    if (row.priceArea in entry) {
      // @ts-expect-error dynamic index
      entry[row.priceArea] += row.volumeKwh;
    } else {
      // @ts-expect-error dynamic index
      entry[row.priceArea] = row.volumeKwh;
    }
  }

  return Array.from(byDate.values()).sort((a, b) =>
    a.date.localeCompare(b.date),
  );
}

export function filterByDateRange(
  series: DailyAreaData[],
  start?: string,
  end?: string,
): DailyAreaData[] {
  if (!start && !end) return series;
  return series.filter((d) => {
    if (start && d.date < start) return false;
    if (end && d.date > end) return false;
    return true;
  });
}

