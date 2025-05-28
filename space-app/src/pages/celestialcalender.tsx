import { PageTitle, PageDescription, PageDivider} from "@/components/ui/page";
import CelestialCalendar from "@/components/ui/calendar/calendar";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

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
            <div className="text-center animate-pulse">Loading celestial events into calendar<span className="animate-[dots_1s_ease-in-out_infinite]">...</span></div>
            <CelestialCalendar events={formattedEvents} />
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