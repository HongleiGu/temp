"use client"; // This line indicates client-side rendering

import { useParams, useRouter } from "next/navigation";
import { fetchEventsById } from "@/app/lib/data-client"; // Replace with your actual import path
import { Event } from "@/app/lib/types";
import { useEffect, useState } from "react";
import EventModal from "@/app/components/events-page/event-modal";
import { base62ToBase16 } from "@/app/lib/uuid-utils";

export default function Modal() {
  const { id } = useParams() as { id: string };
  const event_id = base62ToBase16(id);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      console.log(event_id)
      try {
        setLoading(true);
        const fetchedEvent = await fetchEventsById(event_id);
        setEvent(fetchedEvent);
      } catch (err) {
        console.log("Error:", err)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;
  // if (!event) return <p>No event found.</p>;

  // Render the event details
  return (
    <EventModal event={event} onClose={() => router.push("/events")}></EventModal>
  );
}