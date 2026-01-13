import { loadConsumptionData } from "../lib/loadData";
import { buildDailyAreaSeries } from "../lib/transformData";
import { Dashboard } from "../components/Dashboard";

// Force static generation with no revalidation since data never changes
export const revalidate = false;

export default async function Home() {
  const rows = await loadConsumptionData();
  const dailySeries = buildDailyAreaSeries(rows);

  return <Dashboard dailySeries={dailySeries} />;
}
