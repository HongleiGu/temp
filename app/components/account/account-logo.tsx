import { useEffect, useState } from "react";

export default function AccountLogo({id, role}: {id: string, role: string}) {

	const [ logo, setLogo ] = useState('')

    const fetchAccountLogo = async (id: string) => {
		try {
			const res = await fetch('/api/user/get-account-logo', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(id),
			});

			const { logo_url } = await res.json()
			setLogo(logo_url)
			console.log(logo)
		} catch (error) {
			console.error('Error loading description:', error)
		}
	}

    useEffect(() => {
		if (role === "organiser") {
			fetchAccountLogo(id);
		}
	}, [role, id]);

	return (
		<div className="pb-4 mb-10 space-y-6">
			<p className="text-sm capitalize flex">
				<span className="mr-12 font-semibold">Logo:</span>
				{logo ? (
					<img src={logo} alt="Account Logo" className="w-24 h-24 object-cover border-2 border-gray-300 rounded" />
				) : (
					<img src="/images/no-image-found.png" alt="No logo found" className="w-24 h-24 object-cover border-2 border-gray-300 rounded" />
				)}
			</p>
		</div>
	);
}