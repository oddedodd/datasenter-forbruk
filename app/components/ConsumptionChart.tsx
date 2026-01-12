"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DailyAreaData } from "../lib/types";
import type { PriceArea } from "./Controls";

const AREA_COLORS: Record<PriceArea, string> = {
  NO1: "#1d4ed8",
  NO2: "#16a34a",
  NO3: "#8b5cf6",
  NO4: "#a855f7",
  NO5: "#0ea5e9",
};

interface Props {
  data: DailyAreaData[];
  activeAreas: PriceArea[];
}

export function ConsumptionChart({ data, activeAreas }: Props) {
  // Create an array of dates where year changes occur - these will be our tick positions
  const yearTickDates: string[] = [];
  data.forEach((item, index) => {
    if (index === 0) {
      yearTickDates.push(item.date);
    } else {
      const currentYear = new Date(item.date).getFullYear();
      const previousYear = new Date(data[index - 1].date).getFullYear();
      if (currentYear !== previousYear) {
        yearTickDates.push(item.date);
      }
    }
  });

  // Create a set for quick lookup
  const yearChangeDates = new Set(yearTickDates);

  return (
    <div className="h-[480px] w-full rounded-xl border border-emerald-100 bg-white px-4 py-4 shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 16, right: 24, left: 48, bottom: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tickMargin={8}
            tickLine={false}
            axisLine={{ stroke: "#d1d5db" }}
            ticks={yearTickDates}
            tickFormatter={(value: string) => {
              return new Date(value).getFullYear().toString();
            }}
          />
          <YAxis
            tickMargin={8}
            tickLine={false}
            axisLine={{ stroke: "#d1d5db" }}
            tickFormatter={(v) => v.toLocaleString("nb-NO")}
            label={{
              value: "Forbruk (MWh)",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle", fill: "#6b7280" },
            }}
          />
          <Tooltip
            formatter={(value: any) =>
              typeof value === "number"
                ? value.toLocaleString("nb-NO", {
                    maximumFractionDigits: 0,
                  }) + " kWh"
                : value
            }
            labelFormatter={(label) => `Dato: ${label}`}
          />
          <Legend />
          {activeAreas.map((area) => (
            <Line
              key={area}
              type="monotone"
              dataKey={area}
              stroke={AREA_COLORS[area]}
              dot={false}
              strokeWidth={2}
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
