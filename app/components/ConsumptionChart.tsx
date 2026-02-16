"use client";

import { useMemo } from "react";
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

interface ViewBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

// Custom Y-axis label component - moved outside to avoid recreation on each render
function YAxisLabel({ viewBox }: { viewBox?: ViewBox }) {
  if (!viewBox) return null;
  return (
    <text
      x={viewBox.x - 45}
      y={viewBox.y + viewBox.height / 2}
      fill="#9AA3AD"
      fontSize={14}
      textAnchor="middle"
      transform={`rotate(-90 ${viewBox.x - 45} ${viewBox.y + viewBox.height / 2})`}
    >
      Forbruk (MWh)
    </text>
  );
}

// Format date in Norwegian
function formatNorwegianDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("nb-NO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface Props {
  data: DailyAreaData[];
  activeAreas: PriceArea[];
}

export function ConsumptionChart({ data, activeAreas }: Props) {
  // Memoize year tick dates calculation to avoid recalculating on every render
  const yearTickDates = useMemo(() => {
    const dates: string[] = [];
    data.forEach((item, index) => {
      if (index === 0) {
        dates.push(item.date);
      } else {
        const currentYear = new Date(item.date).getFullYear();
        const previousYear = new Date(data[index - 1].date).getFullYear();
        if (currentYear !== previousYear) {
          dates.push(item.date);
        }
      }
    });
    return dates;
  }, [data]);

  return (
    <div
      className="h-[400px] w-full rounded-xl border border-border bg-background-secondary px-2 py-4 shadow-sm sm:h-[480px] sm:px-4"
      role="img"
      aria-label="Linjediagram som viser strømforbruk i datasentre over tid for valgte prisområder"
    >
      <div className="h-full w-full min-h-0 min-w-0">
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
              formatter={(value: number | string) =>
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
