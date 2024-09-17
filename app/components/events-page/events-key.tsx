import { EVENT_TAG_TYPES } from "@/app/lib/utils";

export default function EventKeys() {
	return (
		<div className="fixed bottom-10 right-4 bg-gray-600/80 rounded-md p-4  shadow-lg border-dotted border border-white">
			{/* <h3 className="pb-4 text-center font-bold italic text-xl">KEY</h3> */}
			<ul>
				{Object.entries(EVENT_TAG_TYPES).map(([key, { label, color }]) => (
					<li key={key} className="flex items-center mb-2 pr-8">
						<div className={`w-4 h-4 mr-2 rounded-full border border-white ${color}`} />
						<span className="text-white text-sm">{label}</span>
					</li>
				))}
			</ul>
		</div>
	);
}