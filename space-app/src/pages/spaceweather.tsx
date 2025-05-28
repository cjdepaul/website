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
            <div className="bg-white">
            <Gauge
                value={data?.speed[data.speed.length - 1]}
                startAngle={-90}
                endAngle={90}
                innerRadius="80%"
                outerRadius="100%"
            />
            </div>
        </div>
    );
}