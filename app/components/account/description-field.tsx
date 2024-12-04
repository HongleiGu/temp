import { Button } from "../button";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function DescriptionField({role, id}: {role: string, id: string}) {

    const [ description, setDescription ] = useState('')
    const fetchDescription = async (id: string) => {
		try {
			const res = await fetch('/api/user/get-description', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(id),
			});

			const { description } = await res.json()
			setDescription(description)
			console.log(description)
		} catch (error) {
			console.error('Error loading description:', error)
		}
	}

    useEffect(() => {
		if (role === "organiser") {
			fetchDescription(id);
		}
	}, [role]);

    const router = useRouter()

    return (
        <div>
            <p className="text-sm capitalize">
            <span className="mr-12 font-semibold">Description:</span> {description || 'no description found'}
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