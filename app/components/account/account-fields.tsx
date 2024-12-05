import { Button } from "../button";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function AccountFields({id, role}: {id: string, role: string}) {

	const [ description, setDescription ] = useState('')
	const [ website, setWebsite ] = useState('')
	const [ tags, setTags ] = useState([])

    const fetchAccountInfo = async (id: string) => {
		try {
			const res = await fetch('/api/user/get-account-fields', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(id),
			});

			const { description, website, tags } = await res.json()
			setDescription(description)
			setWebsite(website)
			setTags(tags)
			console.log(description, website, tags)
		} catch (error) {
			console.error('Error loading description:', error)
		}
	}

    useEffect(() => {
		if (role === "organiser") {
			fetchAccountInfo(id);
		}
	}, [role]);

    const router = useRouter()

    return (
        <div className="pb-4 mb-10 space-y-6">
			<p className="text-sm capitalize">
            	<span className="mr-12 font-semibold">Description:</span> {description || 'no description found'}
            </p>
			<p className="text-sm capitalize">
            	<span className="mr-12 font-semibold">Website:</span> {website || 'no website found'}
            </p>
			<p className="text-sm capitalize">
            	<span className="mr-12 font-semibold">Tags:</span> {tags || 'no description found'}
            </p>
            <Button
                variant="filled"
                className="bg-blue-600 text-white my-4 py-2 px-4 rounded-full"
                onClick={() => router.push('account/edit-details')}
                >
                    Edit Details
            </Button>
        </div>
    )
}