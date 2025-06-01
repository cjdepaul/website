import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

interface DataPoint {
  time: string;
  value: number;
}

export default function SpaceAreaChart({ data, timeRange }: { data: DataPoint[]; timeRange?: string }) {
    const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange || '1h');
    
    const filteredData = data.filter(item => {
        const itemTime = new Date(item.time);
        const now = new Date();
        if (selectedTimeRange === '1h') {
        return itemTime >= new Date(now.getTime() - 60 * 60 * 1000);
        } else if (selectedTimeRange === '6h') {
        return itemTime >= new Date(now.getTime() - 6 * 60 * 60 * 1000);
        } else if (selectedTimeRange === '12h') {
        return itemTime >= new Date(now.getTime() - 12 * 60 * 60 * 1000);
        } else if (selectedTimeRange === '24h') {
        return itemTime >= new Date(now.getTime() - 24 * 60 * 60 * 1000);
        } else if (selectedTimeRange === '1w') {
        return itemTime >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        }
        return true;
    });
    
    return (
        <div className="space-area-chart w-full h-full">
            <div className="pb-">
                <DropdownMenu>
                    <DropdownMenuTrigger className="btn btn-secondary mb-2">
                    {selectedTimeRange}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                    <DropdownMenuLabel>Time Range</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setSelectedTimeRange('1h')}>Last Hour</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedTimeRange('6h')}>Last 6 Hours</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedTimeRange('12h')}>Last 12 Hours</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedTimeRange('24h')}>Last 24 Hours</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedTimeRange('1w')}>Last Week</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <ResponsiveContainer width="100%" height="85%">
                <AreaChart data={filteredData}>
                <CartesianGrid />
                <XAxis dataKey="time" />
                <YAxis 
                    domain={[(dataMin: number) => dataMin * 0.9, (dataMax: number) => dataMax * 1.1]} 
                    tickFormatter={(value) => `${Number(value).toFixed(2)} km/s`}
                    tickCount={4}
                />
                <Tooltip 
                    content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                            return (
                                <div className="rounded-lg border bg-background p-2 shadow-md">
                                    <p className="text-sm">
                                        {`${Number(payload[0].value).toFixed(2)} km/s`}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {new Date(payload[0].payload.time).toLocaleString()}
                                    </p>
                                </div>
                            );
                        }
                        return null;
                    }}
                />
                <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}