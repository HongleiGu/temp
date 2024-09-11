"use client";

import { useState } from "react";
import ResizableColumn from "./resizeable-column";
import { Event } from "@/app/lib/types";
import TableRow from "./table-row";

interface TableProps {
	events: Event[]
}

export default function EventTable({ events }: TableProps) {
	
	const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  
	const toggleEventSelection = (id: string) => {
	  setSelectedEvents((prev) =>
		prev.includes(id) ? prev.filter((eventId) => eventId !== id) : [...prev, id]
	  );
	};
  
	return (
	  <div className="overflow-auto">
		<table className="min-w-full table-auto">
		  <thead>
			<tr>
			  {/* Use ResizableColumn for each column header */}
			  <ResizableColumn title="Date" initialWidth={100} />
			  <ResizableColumn title="Organizer" initialWidth={150} />
			  <ResizableColumn title="Event Title" initialWidth={200} />
			  <ResizableColumn title="Time" initialWidth={150} />
			  <ResizableColumn title="Location" initialWidth={200} />
			  <ResizableColumn title="Image" initialWidth={120} />
			  <ResizableColumn title="Description" initialWidth={300} />
			  <ResizableColumn title="Tags" initialWidth={150} />
			</tr>
		  </thead>
		  <tbody>
			{events.map((event) => (
			  <TableRow
				key={event.id}
				event={event}
				isSelected={selectedEvents.includes(event.id)}
				toggleSelection={() => toggleEventSelection(event.id)}
			  />
			))}
		  </tbody>
		</table>
	  </div>
	);
  };
  