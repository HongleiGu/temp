import Link from "next/link";
import { Button } from "../button";
import clsx from "clsx";

export default function HomePageTopSection() {
	return (

		<div className="flex flex-col bg-black bg-opacity-50">

			<Title />
			<ForStudents />
			<ForSocieties />
			<ForSponsors />

		</div>

	)
}

function JoinButton({ text, className, href }: { text: string, className?: string, href: string }) {
	return (
		<Link href={href} className={clsx("flex items-center space-x-2 group", className)}>
			<div>
				<span className="relative text-lg font-medium flex items-center space-x-2 text-white">
					{text}
					<img
						src="/icons/arrow-right.svg"
						alt="next"
						className="h-4 ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-2"
					/>
				</span>
				<span className="block w-full h-px bg-white mt-1"></span>
			</div>
		</Link>
	)
}

function Title() {
	return (
		<section className="flex flex-col items-center justify-center min-h-screen snap-start">
			<h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-bold uppercase tracking-widest ml-2 text-center">
				London Student Network
			</h1>
			<div className="w-auto flex flex-row p-10 space-x-20">
				<p className="font-bold text-lg md:text-xl text-white">Connecting 500,000 students</p>
				<JoinButton href="/sign" text="Join us" />
			</div>
		</section>
	)
}

function ForStudents() {
	return (
		<section className="flex flex-col items-start justify-center p-10 snap-start min-h-screen">
			<h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#feae14] to-[#a96601] ml-20 flex flex-row items-center">
				<span className="text-white mr-4">1. </span>For Students
			</h2>
			<p className="text-white text-xl md:text-3xl mt-20 mr-12 self-end">
				Every event, opportunity, group and skill all in one place. <br /> <br />
				Become unbound by your university and become a student of the City.
			</p>
			<JoinButton href="/sign" className="self-end mr-12 mt-12" text="Create your account with us today" />
		</section>
	)
}

function ForSocieties() {
	return (
		<section className="flex flex-col items-start justify-center p-10 snap-start min-h-screen">
			<h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-bl from-[#079fbf] to-[#007289] mr-20 flex flex-row items-center self-end">
				<span className="text-white mr-4">2. </span>For Clubs and Societies
			</h2>
			<p className="text-white text-xl md:text-3xl mt-20 ml-12">
				Export your society to the city. Student leaders work
				tirelessly to put on great events. Through LSN every student
				in London can interface with you.  <br /> <br />
				Connect and Collaborate with ease!
			</p>
			<JoinButton href="/sign" className="ml-20 mt-12" text="Share your events through us today" />
		</section>
	)
}

function ForSponsors() {
	return (
		<section className="flex flex-col items-start justify-center min-h-screen p-10 snap-start">
			<h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#7F5E24] bg-clip-text bg-gradient-to-br from-[#aa936b] to-[#7F5E24] ml-20 flex flex-row items-center">
				<span className="text-white mr-4">3. </span>For Sponsors
			</h2>
			<p className="text-white text-xl md:text-3xl mt-20 mr-12 self-end">
				We help put on events that reach the entire
				London university student population. <br /> <br />
				If you are interested in sponsoring any of
				our activities, get in contact today!
			</p>
			<JoinButton href="/contact" className="self-end mr-12 mt-12" text="Contact our team today" />
		</section>
	)
}