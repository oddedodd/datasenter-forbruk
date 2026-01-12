import fs from "fs";
import path from "path";
import Papa from "papaparse";
import type { DataRow, RawCsvRow } from "./types";

function parseNumber(value: string): number {
  if (!value) return 0;
  // Replace comma decimal separators and remove spaces
  const normalized = value.replace(/\./g, "").replace(",", ".").replace(/\s/g, "");
  const num = Number(normalized);
  return Number.isNaN(num) ? 0 : num;
}

export async function loadConsumptionData(): Promise<DataRow[]> {
  const csvPath = path.join(
    process.cwd(),
    "public",
    "data",
    "datasenter_forbruk.csv",
  );

  const fileContents = fs.readFileSync(csvPath, "utf8");

  const parsed = Papa.parse<RawCsvRow>(fileContents, {
    header: true,
    skipEmptyLines: true,
  });

  if (parsed.errors.length) {
    // In a real app you might log these
    // console.error(parsed.errors);
  }

  const rows: DataRow[] = (parsed.data || []).map((row) => {
    const date = row.BRUKSDØGN;
    const priceArea = row.PRISOMRÅDE;

    return {
      date: new Date(date).toISOString(),
      priceArea,
      volumeKwh: parseNumber(row.VOLUM_KWH),
      orgCount: parseNumber(row.ANTALL_ORGANISASJONER),
      meterPointCount: parseNumber(row.ANTALL_MÅLEPUNKT),
    };
  });

  return rows;
}

