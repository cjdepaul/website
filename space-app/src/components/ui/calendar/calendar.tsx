import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Button } from '@/components/ui/button';
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from '@/components/ui/tooltip';

type eventType = {
    title: string;
    start: string;
    end: string;
    description: string;
    allDay: boolean;
}

export default function CelestialCalendar({ events }: { events: eventType[] }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<eventType | null>(null);
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
        eventContent={(eventInfo) => {
          return (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="w-full overflow-hidden cursor-pointer hover:bg-foreground/20 rounded-xs hover:text-accent-foreground w-full h-full"> 
                    <p className="truncate text-sm">
                      {eventInfo.event.title}
                    </p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{eventInfo.event.title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        }}
        eventClick={(info) => {
          setSelectedEvent({
            title: info.event.title,
            start: info.event.startStr,
            end: info.event.endStr,
            description: info.event.extendedProps.description,
            allDay: info.event.allDay
          });
          setShowModal(true);
        }}
        editable={false}
        selectable={false}
      />
      {showModal && selectedEvent && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-1"
          onClick={() => setShowModal(false)}
        >
          <Card 
            className="w-[30rem] max-h-[20rem] overflow-auto"
            onClick={e => e.stopPropagation()}
          >
            <CardHeader>
              <CardTitle className="pb-4">{selectedEvent.title}</CardTitle>
              <div className="bg-sidebar-accent rounded-md p-4">
                <CardDescription className="overflow-auto">
                  {selectedEvent.description}
                </CardDescription>
              </div>
            </CardHeader>
              <div className="p-2 flex justify-end">
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Close
                </Button>
              </div>
          </Card>
        </div>
      )}
    </div>
  );
}