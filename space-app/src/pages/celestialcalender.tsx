import { PageTitle, PageDescription, PageDivider} from "@/components/ui/page";
import CelestialCalendar from "@/components/ui/calendar/calendar";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@mui/material";

type celestialEventType = {
    title: string;
    startDate: string;
    endDate: string;
    description: string;
    allDay: boolean;
}

export default function CelestialCalendarPage() {
    const { data: events = [], isLoading } = useQuery<celestialEventType[]>({
        queryKey: ['celestial-events'],
        queryFn: async () => {
            const response = await api.get('/api/v1/celestial-events');
            return response.data.events;
        }
    });
    const formattedEvents = events.map(event => ({
        title: event.title,
        start: event.startDate,
        end: event.endDate,
        allDay: event.allDay,
        description: event.description.trim(),
    }));

    if (isLoading) {
        return (
        <div className="pb-5">
            <PageTitle>Celestial Events Calendar</PageTitle>
            <PageDescription>Stay updated with celestial events and phenomena.</PageDescription>
            <PageDivider />
            <div className="text-center">Loading celestial events into calendar<span className="dots"></span></div>
            <div className="flex mt-5 w-full">
                <div className="w-full">
                    <div className="flex justify-between w-full items-center">
                        <div>
                            <Skeleton sx={{ 
                                bgcolor: 'var(--sidebar)',
                           }} variant="text" width={200} height={70} 
                           />
                        </div>
                        <div className="flex items-center gap-4">
                            <Skeleton sx={{
                                bgcolor: 'var(--sidebar)',
                            }} variant="text" width={200} height={70} />

                            <Skeleton sx={{
                                bgcolor: 'var(--sidebar)',
                            }} variant="text" width={100} height={70} />
                        </div>
                    </div>
                    <div className="grid grid-cols-7 gap-2 mt-4">
                        {Array.from({ length: 7 }).map((_, i) => (
                            <Skeleton
                                key={`weekday-${i}`}
                                sx={{ bgcolor: 'var(--sidebar)' }}
                                variant="rectangular"
                                height={30}
                            />
                        ))}
                        {Array.from({ length: 42 }).map((_, i) => (
                            <Skeleton
                                key={`day-${i}`}
                                sx={{ 
                                    bgcolor: 'var(--sidebar)',
                                    height: {
                                        sm: '80px',
                                        md: '100px',
                                        lg: '100px',
                                        xl: '200px'
                                    }
                                }}
                                variant="rectangular"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
        );
    }

    return (
        <div className="pb-5">
            <PageTitle>Celestial Events Calendar</PageTitle>
            <PageDescription>Stay updated with celestial events and phenomena.</PageDescription>
            <PageDivider />

            <CelestialCalendar events={formattedEvents} />
        </div>
    );
}