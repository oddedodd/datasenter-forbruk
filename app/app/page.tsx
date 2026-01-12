import { loadConsumptionData } from "../lib/loadData";
import { buildDailyAreaSeries } from "../lib/transformData";
import { Dashboard } from "../components/Dashboard";

export default async function Home() {
  const rows = await loadConsumptionData();
  const dailySeries = buildDailyAreaSeries(rows);

  return <Dashboard dailySeries={dailySeries} />;
}
