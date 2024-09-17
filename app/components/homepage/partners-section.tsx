import SlidingPartners from "./sliding-partners";

export default function PartnersSection() {
	return (
		<section className="h-2/3 bg-[#041A2E] flex flex-col items-center justify-center overflow-hidden snap-start">
			<h2 className="text-4xl md:text-6xl ml-28 w-full mb-12 md:mb-28">Our Partners</h2>
			<SlidingPartners />
		</section>
	)
}