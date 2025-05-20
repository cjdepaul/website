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
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={{
            start: 'title',
            center: '',
            end: 'today prev,next' 
        }}
        editable={false}
        selectable={false}
      />
    </div>
  );
}