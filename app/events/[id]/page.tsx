
import EventInfo from "./event-info"
import EventInfoPageSkeleton from "@/app/components/skeletons/event-info-page"


export default function Page() {


	return (
		<main className='relative flex flex-col min-h-screen mx-auto p-8 pt-16 bg-gradient-to-b from-[#ffffff] via-[#d1d2d2] to-[#76d7cc] '>
			<EventInfo />
		</main>
	)
}

function LoadingScreen() {
	return (
		<div className="flex flex-col items-center justify-center">
			<h1 className="text-3xl">Loading...</h1>
		</div>
	)
}