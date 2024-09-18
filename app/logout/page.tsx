"use client";

import LogoutForm from "../components/logout/logout-form";
import { isLoggedIn } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

export default async function LogoutPage() {

	const router = useRouter()
	const response = isLoggedIn();
	if (!response.response) {
		router.push('/login')
	}

	return (
		<main className="flex items-center justify-center h-screen bg-gradient-to-b from-[#083157]  to-[#064580]">
			<LogoutForm />
		</main>
	)

}
