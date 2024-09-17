import Link from "next/link";

export default function HomePageTopSection() {
	return (

		<div className="flex flex-col snap-y snap-mandatory bg-black bg-opacity-50">

			<Title />
			<ForStudents />
			<ForSocieties />
			<ForSponsors />

		</div>

	)
}

function Title() {
	return (
		<section className="flex flex-col items-center justify-center min-h-screen snap-start">
			<h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-bold uppercase tracking-widest">
				London Student Network
			</h1>
			<div className="w-auto flex flex-row p-10 space-x-20">
				<p className="font-bold text-lg md:text-xl text-white">Connecting 500,000 students</p>
				<Link href="/signin" className="flex items-center space-x-2 group">
					<div>
						<span className="relative text-lg font-medium flex items-center space-x-2 text-white">
							Join Us
							<img
								src="/icons/arrow-right.svg"
								alt="next"
								className="h-4 ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-2"
							/>
						</span>
						<span className="block w-full h-px bg-white mt-1"></span>
					</div>
				</Link>
			</div>
		</section>
	)
}

function ForStudents() {
	return (
		<section className="flex flex-col items-start justify-center p-10 snap-start min-h-screen">
			<h2 className="text-3xl md:text-8xl font-bold text-purple-400">For Students</h2>
			<p className="text-white text-lg md:text-xl mt-4">
				Every event, opportunity, group and skill all in one place.
				Become unbound by your university and become a student of the City.
			</p>
		</section>
	)
}

function ForSocieties() {
	return (
		<section className="flex flex-col items-start justify-center p-10 snap-start min-h-screen">
			<h2 className="text-3xl md:text-4xl font-bold text-purple-400">For Societies</h2>
			<p className="text-white text-lg md:text-xl mt-4">
				Every event, opportunity, group and skill all in one place.
				Become unbound by your university and become a student of the City.
			</p>
		</section>
	)
}

function ForSponsors() {
	return (
		<section className="flex flex-col items-start justify-center min-h-screen p-10 snap-start">
			<h2 className="text-3xl md:text-4xl font-bold text-purple-400">For Sponsors</h2>
			<p className="text-white text-lg md:text-xl mt-4">
				Every event, opportunity, group and skill all in one place.
				Become unbound by your university and become a student of the City.
			</p>
		</section>
	)
}