interface EventCardTagsProps {
	eventType: number;
}

const TAGS: { [key: number]: { label: string; color: string } } = {
	1: { label: 'SOCIAL', color: 'bg-[#f3a51a] opacity-95' },
	2: { label: 'ACADEMIC', color: 'bg-[#079fbf] opacity-95' },
	4: { label: 'SPORTING', color: 'bg-[#041A2E] opacity-95' },
};

export default function EventCardTags({ eventType }: EventCardTagsProps) {
	const tags = Object.keys(TAGS)
		.map(Number)
		.filter((key) => eventType & key)
		.map((key) => TAGS[key]);

	return (
		<div className="absolute top-1 right-2 flex space-x-1">
			{tags.map((tag, index) => (
				<span
					key={index}
					className={`w-5 h-5 rounded-full ${tag.color}`}
					title={tag.label}
				></span>
			))}
		</div>
	);
};

