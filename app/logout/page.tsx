"use client";

import { useState } from "react";
import { logout } from "@/app/lib/actions";

export default function LogoutPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const handleLogout = async () => {
		setIsLoading(true);
		setErrorMessage(null);

		const result = await logout(); 

		if (result.success) {
			// window.location.href = result.url; // Redirect to homepage on successful logout
		} else {
			setErrorMessage("Failed to log out. Please try again");
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-black rounded-lg shadow-md p-10">
				<h2 className="text-2xl font-bold mb-4">Confirm Logout</h2>
				<p className="mb-6">Are you sure you want to log out?</p>

				{errorMessage && (
					<p className="text-red-500 text-sm mb-4">{errorMessage}</p>
				)}

				<div className="flex space-x-4">
					<button
						className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
						onClick={handleLogout}
						disabled={isLoading}
					>
						{isLoading ? (
							<span className="flex items-center space-x-2">
								<svg
									className="animate-spin h-5 w-5 text-white"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8V12H4z"
									></path>
								</svg>
								<span>Logging Out...</span>
							</span>
						) : (
							"Log Out"
						)}
					</button>
					<button
						className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
						onClick={() => window.location.href = "/"} // Redirect to homepage if cancel
						disabled={isLoading}
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}
