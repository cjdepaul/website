import { PageTitle, PageDescription, PageDivider} from "@/components/ui/page";
import { Gauge } from '@mui/x-charts/Gauge';
import axios from 'axios';
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";



type SpaceWeatherData = {
    scales: {
        current_scales: JSON;
        "24h_scales": JSON;
    }
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

    return (
        <div>
            <PageTitle>Space Weather</PageTitle>
            <PageDescription>This page will display information about space weather.</PageDescription>
            <PageDivider />
            
            {/* 3x3 Grid for Charts and Graphs */}
            <div className="grid grid-cols-3 gap-4 p-4">
                {/* Row 1 */}
                <div className="border rounded p-4 h-64">
                    {/* Chart 1 - Aurora Chance Gauge */}
                </div>
                <div className="border rounded p-4 h-64">
                    {/* Chart 2 - Solar Wind Speed */}
                </div>
                <div className="border rounded p-4 h-64">
                    {/* Chart 3 - Solar Wind Density */}
                </div>

                {/* Row 2 */}
                <div className="border rounded p-4 h-64">
                    {/* Chart 4 - Magnetic Field Bt */}
                </div>
                <div className="border rounded p-4 h-64">
                    {/* Chart 5 - Magnetic Field Bz */}
                </div>
                <div className="border rounded p-4 h-64">
                    {/* Chart 6 - Solar Flares Timeline */}
                </div>

                {/* Row 3 */}
                <div className="border rounded p-4 h-64">
                    {/* Chart 7 - CME Detection */}
                </div>
                <div className="border rounded p-4 h-64">
                    {/* Chart 8 - Current Scales Status */}
                </div>
                <div className="border rounded p-4 h-64">
                    {/* Chart 9 - 24h Scales Forecast */}
                </div>
            </div>
        </div>
    );
}