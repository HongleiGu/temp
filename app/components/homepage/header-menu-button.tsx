"use client";

import { useState, useEffect } from 'react';
import { MotionConfig, motion } from 'framer-motion';

export default function AnimatedMenuButton({ onClick, isActive, className }: { onClick: () => void, isActive: boolean, className: string }) {
	const [active, setActive] = useState(false)

	useEffect(() => {
		setActive(isActive);
	}, [isActive]);


	const handleClick = () => {
		setActive((prev) => !prev)
		onClick()
	}

	return (
		<MotionConfig
			transition={{
				duration: 0.5,
				ease: "easeInOut",
			}}
		>
			<motion.button
				initial={false}
				animate={active ? "open" : "closed"}
				onClick={handleClick}
				className={`relative h-12 w-12 p-1 rounded-full transition-colors hover:bg-white/20 ${className}`}
			>
				<motion.span
					variants={VARIANTS.top}
					className="absolute h-1 w-8 bg-white"
					style={{ y: "-50%", left: "50%", x: "-50%", top: "25%" }}
				/>
				<motion.span
					variants={VARIANTS.middle}
					className="absolute h-1 w-8 bg-white"
					style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
				/>
				<motion.span
					variants={VARIANTS.bottom}
					className="absolute h-1 w-8 bg-white"
					style={{
						x: "-50%",
						y: "50%",
						bottom: "25%",
						left: "50%",
					}}
				/>
			</motion.button>
		</MotionConfig>
	)
}

const VARIANTS = {
	top: {
		open: {
			rotate: ["0deg", "0deg", "45deg"],
			top: ["25%", "50%", "50%"],
		},
		closed: {
			rotate: ["45deg", "0deg", "0deg"],
			top: ["50%", "50%", "25%"],
		},
	},
	middle: {
		open: {
			opacity: 0,
		},
		closed: {
			opacity: 1,
		},
	},
	bottom: {
		open: {
			rotate: ["0deg", "0deg", "-45deg"],
			bottom: ["25%", "50%", "50%"],
			left: "50%",
		},
		closed: {
			rotate: ["-45deg", "0deg", "0deg"],
			bottom: ["50%", "50%", "25%"],
			left: "50%",
		},
	},
}
