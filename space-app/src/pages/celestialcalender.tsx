import { PageTitle, PageDescription, PageDivider} from "@/components/ui/page";
import CelestialCalendar from "@/components/ui/calendar/calendar";

export default function CelestialCalendarPage() {
    return (
        <div>
            <PageTitle>Celestial Events Calendar</PageTitle>
            <PageDescription>Stay updated with celestial events and phenomena.</PageDescription>
            <PageDivider />
            <CelestialCalendar events={[
                { title: 'Lunar Eclipse', start: '2025-05-14', end: '2025-05-14', allDay: true },
                { title: 'Meteor Shower Peak', start: '2025-05-12', end: '2025-05-12', allDay: true },
            ]} />
        </div>
    );
}