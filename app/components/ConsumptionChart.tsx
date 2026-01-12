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

  // Custom Y-axis label component
  const YAxisLabel = ({ viewBox }: any) => {
    if (!viewBox) return null;
    return (
      <text
        x={viewBox.x - 45}
        y={viewBox.y + viewBox.height / 2}
        fill="#6b7280"
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

  return (
    <div className="h-[400px] w-full rounded-xl border border-red-100 bg-white px-2 py-4 shadow-sm sm:h-[480px] sm:px-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 16, right: 16, left: 80, bottom: 8 }}
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
            fontSize={14}
          />
          <YAxis
            tickMargin={8}
            tickLine={false}
            axisLine={{ stroke: "#d1d5db" }}
            tickFormatter={(v) => v.toLocaleString("nb-NO")}
            width={60}
            fontSize={14}
            label={<YAxisLabel />}
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
            contentStyle={{ fontSize: "14px" }}
          />
          <Legend
            wrapperStyle={{ fontSize: "14px", paddingTop: "8px" }}
            iconSize={14}
          />
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
