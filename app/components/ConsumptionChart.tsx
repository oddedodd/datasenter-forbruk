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
  NO1: "#4F7CFF",
  NO2: "#4CB8A0",
  NO3: "#A78BFA",
  NO4: "#F5B971",
  NO5: "#5AC8FA",
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

  // Custom Y-axis label component
  const YAxisLabel = ({ viewBox }: any) => {
    if (!viewBox) return null;
    return (
      <text
        x={viewBox.x - 45}
        y={viewBox.y + viewBox.height / 2}
        fill="#9AA3AD"
        fontSize={14}
        textAnchor="middle"
        transform={`rotate(-90 ${viewBox.x - 45} ${
          viewBox.y + viewBox.height / 2
        })`}
      >
        Forbruk (MWh)
      </text>
    );
  };

  // Format date in Norwegian
  const formatNorwegianDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("nb-NO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className="h-[400px] w-full rounded-xl border px-2 py-4 shadow-sm sm:h-[480px] sm:px-4"
      style={{ backgroundColor: "#1A1D22", borderColor: "#2A2F36" }}
    >
      <div style={{ width: "100%", height: "100%", minWidth: 0, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 16, right: 16, left: 80, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2F36" />
            <XAxis
              dataKey="date"
              tickMargin={8}
              tickLine={false}
              axisLine={{ stroke: "#2A2F36" }}
              ticks={yearTickDates}
              tickFormatter={(value: string) => {
                return new Date(value).getFullYear().toString();
              }}
              fontSize={14}
              tick={{ fill: "#9AA3AD" }}
            />
            <YAxis
              tickMargin={8}
              tickLine={false}
              axisLine={{ stroke: "#2A2F36" }}
              tickFormatter={(v) =>
                (v / 1000).toLocaleString("nb-NO", { maximumFractionDigits: 0 })
              }
              width={60}
              fontSize={14}
              tick={{ fill: "#9AA3AD" }}
              label={<YAxisLabel />}
            />
            <Tooltip
              formatter={(value: any) =>
                typeof value === "number"
                  ? (value / 1000).toLocaleString("nb-NO", {
                      maximumFractionDigits: 0,
                    }) + " MWh"
                  : value
              }
              labelFormatter={(label) => `Dato: ${formatNorwegianDate(label)}`}
              contentStyle={{
                fontSize: "14px",
                backgroundColor: "#0F172A",
                border: "1px solid #2A3340",
                borderRadius: "8px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
              }}
              labelStyle={{ color: "#E5E7EB" }}
            />
            <Legend
              wrapperStyle={{
                fontSize: "14px",
                paddingTop: "8px",
                color: "#E5E7EB",
              }}
              iconSize={14}
            />
            {activeAreas.map((area) => (
              <Line
                key={area}
                type="monotone"
                dataKey={area}
                stroke={AREA_COLORS[area]}
                dot={false}
                strokeWidth={2.5}
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
