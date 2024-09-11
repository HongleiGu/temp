import { fetchEvents } from "@/app/lib/data";
import EventTable from "./event-table";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function EventList() {
	const allEvents = await fetchEvents()

	return (
		<div className="container mx-auto px-4">
			{/* <EventTable events={allEvents} /> */}

			<DataTable columns={columns} data={allEvents} />
		</div>
	)
  };
  