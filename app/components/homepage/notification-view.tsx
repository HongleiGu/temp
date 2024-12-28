"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

// Notifications of website updates for new visitors

export default function NotificationView() {
	useEffect(() => {
		// Remove Previous Notifications
		localStorage.removeItem("registrationFeatures")

		setTimeout(() => {
			const hasSeenToast = localStorage.getItem("passwordReset");
			if (!hasSeenToast) {
				toast(
					<span className="text-center">
						You can now <b>reset your password</b> if you have forgotten it!
					</span>,
					{
						icon: '🚨',
						duration: 8000,
						position: "top-center",
						ariaProps: {
							role: 'status',
							'aria-live': 'polite',
						},
					}
				);
				// Set a flag in localStorage
				localStorage.setItem("passwordReset", "true");
			}
		}, 500);
	}, []);

	return (<div></div>);
}