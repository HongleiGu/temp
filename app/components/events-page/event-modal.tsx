import { useEffect, useRef } from 'react';
import { Event } from "@/app/lib/types";
import Image from 'next/image';
import { formatDateString, EVENT_TAG_TYPES } from '@/app/lib/utils';

interface EventModalProps {
	event: Event;
	onClose: () => void;
}

export default function EventModal({ event, onClose }: EventModalProps) {
	const modalRef = useRef<HTMLDivElement>(null);

	// Disable background scroll and handle outside click detection
	useEffect(() => {
		// Prevent background scrolling
		document.body.style.overflow = 'hidden';

		const handleClickOutside = (event: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.body.style.overflow = '';
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [onClose]);

	const getTags = (eventType: number) => {
		const tags = [];
		for (const [key, value] of Object.entries(EVENT_TAG_TYPES)) {
			if (eventType & Number(key)) {
				tags.push(value);
			}
		}
		return tags;
	};


	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div
				ref={modalRef}
				className="relative bg-white w-[90%] h-[80%] p-8 border-2 border-black overflow-hidden"
			>
				<button onClick={onClose} className="absolute top-4 right-4 transition" >
					<Image
						src="/icons/close.svg"
						alt="Close"
						width={12}
						height={12}
						className="hover:brightness-75"
					/>
				</button>

				<div className="flex flex-col md:flex-row h-full overflow-y-auto">
					{/* Event Image  */}
					<div className="h-full md:w-1/2 mb-6 md:mb-0 md:mr-6 flex flex-col justify-between">
						<Image
							src={event.image_url}
							alt={event.title}
							width={200}
							height={200}
							className="w-[90%] h-64 object-cover border-2  border-black/70"
						/>
						<p className="text-sm text-gray-500 mt-2"><strong>Hosted by</strong> {event.organiser}</p>
					</div>

					{/* Event Details */}
					<div className="md:w-1/2">
						<div className="mb-4">
							{getTags(event.event_type).map((tag, index) => (
								<span key={index} className={`inline-block px-3 py-1 text-xs text-white ${tag.color} rounded-full mr-2 lowercase`}>
									{tag.label}
								</span>
							))}
						</div>

						<h2 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h2>
						<p className="text-gray-700 capitalize italic">{formatDateString(event.date, false)} | {event.time}</p>
						<p className="text-sm :text-lg text-gray-700 mt-2">{event.location_building}</p>
						<p className="text-sm :text-lg text-gray-600">{event.location_area}</p>
						<p className="text-sm :text-lg text-gray-500">{event.location_address}</p>

						<div className="mt-6">
							<h3 className="text-lg font-semibold mb-2 text-gray-500">About the Event</h3>
							<hr className="border-t-1 border-gray-300 m-2" />
							<p className="text-gray-600">{event.description}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
