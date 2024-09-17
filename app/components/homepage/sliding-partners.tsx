import Image from "next/image";

const logos = [
	{
		src: '/partners/LSEULaw.png',
		alt: 'LSEU Law Society'
	},
	{
		src: '/partners/GlobalChina.png',
		alt: 'Global China & Asia Study'
	},
	{
		src: '/partners/RSA_logo.png',
		alt: 'RSA'
	},
	{
		src: '/partners/ROAR.png',
		alt: 'ROAR'
	},
	{
		src: '/partners/KnownImpact.png',
		alt: 'Known Impact'
	},
	{
		src: '/partners/KCLPolitics.png',
		alt: 'KCL Politics'
	},
	{
		src: '/partners/ICLEnt.jpeg',
		alt: 'ICL Entrepreneurs'
	},
	{
		src: '/partners/AmericanPol.png',
		alt: 'American Politics Society'
	},
	{
		src: '/partners/GreenFinance.png',
		alt: 'Green Finance'
	},
	{
		src: '/partners/KCLBackpackers.webp',
		alt: 'KCL Backpackers'
	},
	{
		src: '/partners/KCLUN.png',
		alt: 'KCL UN Women'
	},
	{
		src: '/partners/KCLArmy.png',
		alt: 'KCL Army'
	},
	{
		src: '/partners/LSEAmicus.png',
		alt: 'LSE Amicus'
	}
]

export default function SlidingPartners() {

	return(
		<div className="relative overflow-hidden py-4 mx-0">
			<div className="flex space-x-8 animate-scroll items-center">
				{logos.map((logo, index) => (
					<div key={index} className="flex-shrink-0">
						<Image src={logo.src} alt={logo.alt} width={75} height={75} className="h-auto w-auto object-contain" />
					</div>
				))}
			</div>
		</div>
	)
}