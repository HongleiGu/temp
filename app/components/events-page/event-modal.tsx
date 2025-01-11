"use client";

import { Event } from "@/app/lib/types";
import EventModalPage from "./event-modal-page";
import { createPortal } from "react-dom";

interface EventModalProps {
	event: Event;
	onClose: () => void;
}

export default function EventModal({ event, onClose }: EventModalProps) {
	

	return createPortal(
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<EventModalPage event={event} onClose={onClose}/>
		</div>,
		document.body
	);
}
