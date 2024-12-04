'use client'

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function EditDetailsPage() {
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();

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
        if (!session) {
            if (status !== 'loading') {
                router.push('/login');
            }
        } else {
            fetchDescription(session?.user?.id);
        }
    }, [session, status, router]);

    const handleSave = async () => {
        if (!session) return;

        setLoading(true);
        const toastId = toast.loading('Updating description...');
        try {
            const res = await fetch('/api/user/update-description', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: session.user.id, newDescription: description }),
            });

            if (res.ok) {
                toast.success('Description succesfully updated!');
                toast.dismiss(toastId);
                router.push('/account');
            } else {
                toast.dismiss(toastId);
                toast.error(`Error updating description`);
            }
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(`Error updating description: ${error.message}`);
            console.error('Error updating description:', error);
            
        } finally {
            setLoading(false);
        }
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (!session) {
        router.push('/login');
    }

    const { user } = session;

    return (
        <div className="min-h-screen flex flex-col justify-start p-10 bg-gradient-to-b from-[#041A2E] via-[#064580] to-[#083157]">
            <h1 className="text-3xl font-semibold mb-6">Edit Details</h1>
            <div className="space-y-4">
                <div>
                    <label className="block text-white font-bold mb-1">Name</label>
                    <input
                        type="text"
                        value={user.name}
                        disabled
                        className="w-full text-gray-400 p-2 border border-gray-300 rounded bg-gray-200/25 cursor-not-allowed"
                    />
                </div>
                <div>
                    <label className="block text-white font-bold mb-1">Email</label>
                    <input
                        type="email"
                        value={user.email}
                        disabled
                        className="w-full text-gray-400 p-2 border border-gray-300 rounded bg-gray-200/25 cursor-not-allowed"
                    />
                </div>
                <div>
                    <label className="block text-white font-bold mb-1">Role</label>
                    <input
                        type="text"
                        value={user.role}
                        disabled
                        className="w-full text-gray-400 p-2 border border-gray-300 rounded bg-gray-200/25 cursor-not-allowed"
                    />
                </div>
                <div>
                    <label className="block text-white font-bold mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full text-black p-2 border border-gray-300 rounded"
                    />
                </div>
            </div>
            <div className="mt-6 flex space-x-4">
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={handleSave}
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                    className="bg-gray-400 text-white px-4 py-2 rounded"
                    onClick={() => router.push('/account')}
                >
                    Cancel
                </button>
            </div>
            <div className="my-5">
                If you would like to change any field other than Description, please get in touch at londonstudentnetwork@gmail.com, and one of the team will be in touch.
            </div>
        </div>
    );
}