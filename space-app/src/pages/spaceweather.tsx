import { PageTitle, PageDescription, PageDivider} from "@/components/ui/page";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import SpaceAreaChart  from "@/components/ui/charts/spaceArea";

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

    const { data, isLoading, error } = useQuery<SpaceWeatherData>({
        queryKey: ['spaceWeather'],
        queryFn: async () => {
            const response = await api.get('/api/v1/space-weather');
            return response.data;
        },
        refetchInterval: 60000, // Refetch every minute
    });

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
                <div className="border rounded p-4 h-64">
                         {/* Chart 1 - Solar Wind Speed */}
                    <SpaceAreaChart
                        data={data.speed.map((value, index) => ({
                            time: new Date(Date.now() - (data.speed.length - index - 1) * 60000).toISOString(),
                            value: value
                        }))}
                        timeRange="24h"
                    />
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