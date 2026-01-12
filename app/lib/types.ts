export interface RawCsvRow {
  BRUKSDØGN: string;
  PRISOMRÅDE: string;
  VOLUM_KWH: string;
  ANTALL_ORGANISASJONER: string;
  ANTALL_MÅLEPUNKT: string;
}

export interface DataRow {
  date: string; // ISO string
  priceArea: string; // e.g. "NO1"
  volumeKwh: number;
  orgCount: number;
  meterPointCount: number;
}

export interface DailyAreaData {
  date: string; // ISO string
  NO1?: number;
  NO2?: number;
  NO3?: number;
  NO4?: number;
  NO5?: number;
}

