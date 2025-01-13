export default function EventInfoPageSkeleton() {
	return (
		<div className="bg-transparent p-6 rounded-lg flex flex-row items-center justify-between border-2 border-blue-100">
			{/* Left Side: Partner Info */}
			<div className="flex flex-col space-y-4 w-2/3 pr-4">
				<h2 className="h-6 w-3/4 bg-glowing-spot bg-no-repeat bg-[length:200%_100%] animate-glow rounded bg-gray-500"></h2>
				<p className="h-4 w-full bg-glowing-spot bg-no-repeat bg-[length:200%_100%] animate-glow rounded bg-gray-500"></p>
				<p className="h-4 w-5/6 bg-glowing-spot bg-no-repeat bg-[length:200%_100%] animate-glow rounded bg-gray-500"></p>
			</div>

			{/* Vertical Line Divider */}
			<div className="border-l-2 border-gray-300 h-full mx-4"></div>

			{/* Right Side: Logo and Links */}
			<div className="flex flex-col items-center space-y-4 w-1/3">
				<div className="w-24 h-24 bg-glowing-spot bg-no-repeat bg-[length:200%_100%] animate-glow rounded-full bg-gray-500"></div>
				<div className="h-4 w-20 bg-glowing-spot bg-no-repeat bg-[length:200%_100%] animate-glow rounded bg-gray-500"></div>
				<div className="h-4 w-32 bg-glowing-spot bg-no-repeat bg-[length:200%_100%] animate-glow rounded bg-gray-500"></div>
			</div>
		</div>
	);
}
