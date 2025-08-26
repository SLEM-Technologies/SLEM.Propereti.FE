import React, { useState } from "react";
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// --- Demo datasets ---
const dataByMonth = {
  October: [
    { name: "5k", value: 20 },
    { name: "10k", value: 45 },
    { name: "15k", value: 38 },
    { name: "20k", value: 88 },
    { name: "25k", value: 50 },
    { name: "30k", value: 60 },
    { name: "35k", value: 22 },
    { name: "40k", value: 55 },
    { name: "45k", value: 70 },
    { name: "50k", value: 58 },
    { name: "55k", value: 49 },
    { name: "60k", value: 53 },
  ],
  November: [
    { name: "5k", value: 25 },
    { name: "10k", value: 40 },
    { name: "15k", value: 55 },
    { name: "20k", value: 72 },
    { name: "25k", value: 68 },
    { name: "30k", value: 60 },
    { name: "35k", value: 42 },
    { name: "40k", value: 30 },
    { name: "45k", value: 48 },
    { name: "50k", value: 63 },
    { name: "55k", value: 70 },
    { name: "60k", value: 65 },
  ],
  December: [
    { name: "5k", value: 35 },
    { name: "10k", value: 50 },
    { name: "15k", value: 30 },
    { name: "20k", value: 60 },
    { name: "25k", value: 75 },
    { name: "30k", value: 80 },
    { name: "35k", value: 50 },
    { name: "40k", value: 65 },
    { name: "45k", value: 70 },
    { name: "50k", value: 55 },
    { name: "55k", value: 40 },
    { name: "60k", value: 52 },
  ],
};

const SalesChart = () => {
  const [month, setMonth] = useState("October");
  const data = dataByMonth[month];

  return (
    <div
      style={{
        background: "#1E1F29",
        borderRadius: 12,
        padding: 24,
        color: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        marginTop:"40px",
        fontFamily:
          '"Nunito Sans", system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <h3 style={{ fontSize: 25, margin: 0 }}>Sales Details</h3>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          style={{
            background: "#2B2C3B",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: 14,
            cursor: "pointer",
            outline: "none",
            maxWidth:"112px",
          }}
        >
          {Object.keys(dataByMonth).map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div style={{ width: "100%", height: 380 }}>
        <ResponsiveContainer>
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            {/* gradient fill UNDER the line */}
            <defs>
              <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            {/* horizontal grid lines only */}
            <CartesianGrid stroke="#2B2C3B" vertical={false} />

            <XAxis
              dataKey="name"
              stroke="#B8B8C2"
              tickMargin={8}
              axisLine={{ stroke: "#2B2C3B" }}
              tickLine={{ stroke: "#2B2C3B" }}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[20, 40, 60, 80, 100]}
              stroke="#B8B8C2"
              tickFormatter={(v) => `${v}%`}
              axisLine={{ stroke: "#2B2C3B" }}
              tickLine={{ stroke: "#2B2C3B" }}
            />

            <Tooltip
              cursor={{
                stroke: "#3B82F6",
                strokeDasharray: "3 3",
                opacity: 0.4,
              }}
              contentStyle={{
                background: "#2B2C3B",
                border: "none",
                borderRadius: 8,
                color: "#fff",
                boxShadow: "0 4px 12px rgba(0,0,0,0.35)",
              }}
              labelStyle={{ color: "#D1D5DB", marginBottom: 4 }}
              formatter={(value) => [`${value}%`, "Value"]}
            />

            {/* Faded area under the line */}
            <Area
              type="monotone"
              dataKey="value"
              fill="url(#areaFill)"
              stroke="none"
              isAnimationActive
              animationDuration={900}
            />

            {/* Crisp line drawn on top */}
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ r: 3, fill: "#3B82F6" }}
              activeDot={{ r: 6 }}
              isAnimationActive
              animationDuration={900}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;
