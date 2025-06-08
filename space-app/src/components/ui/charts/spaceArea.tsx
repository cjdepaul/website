import { useState, useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface DataPoint {
  time: string;
  value: number;
}

interface Props {
  data: DataPoint[];
  timeRange?: string;
  unit?: string;
  name?: string;
  color?: string;
}

export default function SpaceAreaChart({
  data,
  timeRange = "1h",
  unit = "km/s",
  name = "Space Data",
  color = "#a78bfa",
}: Props) {
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const itemTime = new Date(item.time);
      const now = new Date();
      const timeMap: Record<string, number> = {
        "1h": 1,
        "6h": 6,
        "12h": 12,
        "24h": 24,
        "1w": 168,
      };
      return (
        itemTime >=
        new Date(
          now.getTime() - (timeMap[selectedTimeRange] || 1) * 60 * 60 * 1000
        )
      );
    });
  }, [data, selectedTimeRange]);

  const yAxisDomain = useMemo(() => {
    if (filteredData.length === 0) return [0, 100];

    const values = filteredData.map((item) => item.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    // Add 10% padding above and below
    const padding = (maxValue - minValue) * 0.1;
    const domainMin = Math.max(minValue - padding);
    const domainMax = maxValue + padding;

    return [domainMin, domainMax];
  }, [filteredData]);

  return (
    <div className="w-full h-full p-2">
      <div className="flex items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger className="text-xs px-3 py-1 bg-violet-700 hover:bg-violet-600 text-white rounded mb-2">
        {selectedTimeRange}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
        <DropdownMenuLabel>Time Range</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {["1h", "6h", "12h", "24h", "1w"].map((range) => (
          <DropdownMenuItem
            key={range}
            onClick={() => setSelectedTimeRange(range)}
          >
            {range === "1h"
          ? "Last Hour"
          : range === "1w"
          ? "Last Week"
          : `Last ${range.replace("h", " Hours")}`}
          </DropdownMenuItem>
        ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <span className="flex-1 text-center">
          <strong>{name}</strong> :{" "}
          {(typeof filteredData[filteredData.length - 1]?.value === "number"
        ? filteredData[filteredData.length - 1].value
        : parseFloat(
            String(filteredData[filteredData.length - 1]?.value)
          ) || 0
          ).toFixed(2)}{" "}
          {unit}
        </span>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart
          data={filteredData}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.6} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#3f3f46" />
          <XAxis
            dataKey="time"
            tick={{ fill: "#c4b5fd", fontSize: 8 }}
            tickFormatter={(value) =>
              new Date(value).toLocaleDateString() +
              " " +
              new Date(value).toLocaleTimeString()
            }
          />
          <YAxis
            tick={{ fill: "#c4b5fd", fontSize: 8 }}
            tickCount={4}
            type="number"
            domain={yAxisDomain}
            tickFormatter={(value) => {
              const numValue =
                typeof value === "number" ? value : parseFloat(value) || 0;
              return `${numValue.toFixed(0)}`;
            }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;

                return (
                  <div className="rounded-lg border bg-zinc-900 text-white p-2 shadow-md text-xs">
                    <p className="text-sm font-medium">{`${(typeof data.value ===
                    "number"
                      ? data.value
                      : parseFloat(data.value) || 0
                    ).toFixed(2)} ${unit}`}</p>
                    <p className="text-muted-foreground">
                      {new Date(data.time).toLocaleString()}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            fillOpacity={1}
            fill="url(#colorFill)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
