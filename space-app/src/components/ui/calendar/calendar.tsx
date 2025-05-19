import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

type eventType = {
    title: string;
    start: string;
    end: string;
    allDay: boolean;
}

export default function CelestialCalendar({ events }: { events: eventType[] }) {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      headerToolbar={false}
      editable={false}
      selectable={false}
    />
  );
}