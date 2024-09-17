"use client";

import { animate, useMotionValue, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";

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

	const FAST_DURATION = 35;
	const SLOW_DURATION = 80;

	const [duration, setDuration] = useState(FAST_DURATION)
	const [mustFinish, setMustFinish] = useState(false)
	const [rerender, setRerender] = useState(false)

	let [ref, { width }] = useMeasure();
	const xTranslation = useMotionValue(0);

	useEffect(() => {
		let controls
		let finalPosition = (-width / 2) - 8

		if (mustFinish) {
			controls = animate(xTranslation, [xTranslation.get(), finalPosition], {
				ease: 'linear',
				duration: duration * (1 - xTranslation.get() / finalPosition),
				onComplete: () => {
					setMustFinish(false)
					setRerender(!rerender)
				}
			})
		} else {
			controls = animate(xTranslation, [0, finalPosition], {
				ease: "linear",
				duration: duration,
				repeat: Infinity,
				repeatType: "loop",
				repeatDelay: 0
			})
		}


		return controls?.stop
	}, [xTranslation, width, duration, rerender]);

	return (
		<motion.div className="relative left-0 flex gap-4"
			ref={ref}
			style={{ x: xTranslation }}
			onHoverStart={() => { setMustFinish(true); setDuration(SLOW_DURATION) }}
			onHoverEnd={() => { setMustFinish(true); setDuration(FAST_DURATION) } }
		>
			{[...logos, ...logos].map((logo, index) => (
				<LogoCard image={logo.src} alt={logo.alt} key={index} />
			))}
		</motion.div>
	)
}



function LogoCard({ image, alt }: { image: string, alt: string }) {
	return (
		<div className="relative overflow-hidden h-[100px] min-w-[200px] flex justify-center items-center">
			{/* TODO: AnimatePresence item to display logo society name above (https://www.youtube.com/watch?v=Ot4nZ6UjJLE&ab_channel=BuiltWithCode) */}
			<Image src={image} alt={alt} fill style={{ objectFit: 'contain' }} />
		</div>
	)
}