import { PageTitle, PageDescription, PageDivider} from "@/components/ui/page";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type SpaceWeatherData = {
    scales: {
        current_scales: {
            G: string;
            S: string;
            R: string;
        };
        "24h_scales": {
            G: string;
            S: string;
            R: string;
        };
    };
    speed: number[];
    density: number[];
    bt: number[];
    bz: number[];
    CME_detection: [];
    flares: Array<{
        begin_time: string;
        begin: string;
        max_time: string;
        max: string;
        end_time: string;
        end: string;
    }>;
    aurora_chance: number;
};

export default function SpaceWeather() {
    const [timeRange, setTimeRange] = useState('24h');

    const { data, isLoading, error } = useQuery<SpaceWeatherData>({
        queryKey: ['spaceWeather'],
        queryFn: async () => {
            const response = await api.get('/api/v1/space-weather');
            return response.data;
        },
        refetchInterval: 60000, // Refetch every minute
    });

    const getFilteredSpeedData = () => {
        if (!data?.speed) return [];
        
        let dataPoints = data.speed.length;
        
        switch (timeRange) {
            case '30min':
                dataPoints = Math.min(30, data.speed.length);
                break;
            case '6h':
                dataPoints = Math.min(360, data.speed.length); 
                break;
            case '24h':
                dataPoints = Math.min(1440, data.speed.length); 
                break;
            case '1w':
                dataPoints = data.speed.length; 
                break;
        }

        const speedData = data.speed.slice(-dataPoints);
        const dataLength = speedData.length;

        return speedData.map((speed, index) => ({
            time: dataLength - index,
            speed: speed
        }));
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading space weather data</div>;
    if (!data) return <div>No data available</div>;

    return (
        <div>
            <PageTitle>Space Weather</PageTitle>
            <PageDescription>This page will display information about space weather.</PageDescription>
            <PageDivider />
            
            {/* 3x3 Grid for Charts and Graphs */}
            <div className="grid grid-cols-3 gap-4 p-4">
                {/* Row 1 */}
                <div className="border rounded p-4 h-64 flex flex-col">
                    <div className="mb-2 flex justify-end">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="text-xs px-2 py-1 border rounded">
                                {timeRange === '30min' && '30m'}
                                {timeRange === '6h' && '6h'}
                                {timeRange === '24h' && '24h'}
                                {timeRange === '1w' && '1w'}
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => setTimeRange('30min')}>
                                    Last 30 minutes
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTimeRange('6h')}>
                                    Last 6 hours
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTimeRange('24h')}>
                                    Last 24 hours
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTimeRange('1w')}>
                                    Last week
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={getFilteredSpeedData()}
                                margin={{
                                    top: 5,
                                    right: 5,
                                    left: 5,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="time" tick={false} />
                                <YAxis 
                                    domain={[
                                        (dataMin: number) => Math.floor(dataMin * 0.95),
                                        (dataMax: number) => Math.ceil(dataMax * 1.05)
                                    ]}
                                />
                                <Tooltip 
                                    labelFormatter={(value) => {
                                        if (value < 60) {
                                            return `${value} Minutes ago`;
                                        }
                                        const hours = value / 60;
                                        return hours >= 24 
                                            ? `${(hours / 24).toFixed(1)} Days ago`
                                            : `${hours.toFixed(2)} Hours ago`;
                                    }}
                                    formatter={(value) => [value, 'Speed (km/s)']}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="speed" 
                                    stroke="#8884d8" 
                                    fill="#8884d8" 
                                    fillOpacity={0.6}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="text-center mt-2">
                        <p className="font-semibold">Solar Wind Speed</p>
                        <p className="text-lg font-bold text-chart-4">
                            {data.speed[data.speed.length - 1]} km/s
                        </p>
                    </div>
                </div>

                <div className="border rounded p-4 h-64">
                    {/* Chart 2 - Solar Wind Density */}
                </div>
                <div className="border rounded p-4 h-64">
                    {/* Chart 3 - Magnetic Field Bt */}
                </div>

                {/* Row 2 */}
                <div className="border rounded p-4 h-64">
                    {/* Chart 4 - Magnetic Field Bz */}
                </div>
                <div className="border rounded p-4 h-64">
                    {/* Chart 5 - Solar Flares Timeline */}
                </div>
                <div className="border rounded p-4 h-64">
                    {/* Chart 6 - CME Detection */}
                </div>

                {/* Row 3 */}
                <div className="border rounded p-4 h-64">
                    {/* Chart 7 - Current Scales Status */}
                </div>
                <div className="border rounded p-4 h-64">
                    {/* Chart 8 - 24h Scales Forecast */}
                </div>
                <div className="border rounded p-4 h-64">
                    {/* Chart 9 - Aurora Chance */}
                </div>
            </div>
        </div>
    );
}