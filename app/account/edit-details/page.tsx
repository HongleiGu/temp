'use client'

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import Select from 'react-select'; // For tag selection
import ImageUpload from '@/app/components/account/logo-edit';
import { OrganiserAccountEditFormData } from '@/app/lib/types';
import { upload } from '@vercel/blob/client';
import { Input } from '../../components/input';

const predefinedTags = [
    { value: 'tag1', label: 'Tag 1' },
    { value: 'tag2', label: 'Tag 2' },
    { value: 'tag3', label: 'Tag 3' },
];

export default function EditDetailsPage() {
    const [initialLogo, setInitialLogo] = useState('');
    const [initialDescription, setInitialDescription] = useState('');
    const [initialWebsite, setInitialWebsite] = useState('');
    const [initialTags, setInitialTags] = useState([]);
    const [loading, setLoading] = useState(false);

    const { data: session, status } = useSession();
    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, getValues, setValue } = useForm<OrganiserAccountEditFormData>({
		mode: 'onSubmit'
	});

    const onSubmit = async (data: OrganiserAccountEditFormData) => {
        const toastId = toast.loading('Editing your society\'s account...');

        if(typeof data.uploadedImage !== 'string') {
            try {
				const newBlob = await upload(data.uploadedImage.name, data.uploadedImage, {
					access: 'public',
					handleUploadUrl: '/api/upload-image',
				})

				data.imageUrl = newBlob.url
			} catch (error) {
				toast.error(`Error uploading image: ${error.message}`, { id: toastId })
				return
			}
        }

		try {
			const res = await fetch('/api/society/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			const result = await res.json()
			if (result.success) {
				toast.success('Society edited succesfully!', { id: toastId })
			} else {
				toast.error(`Error editing account: ${result.error}`, { id: toastId })
				console.error('Error editing account:', result.error)
			}
		} catch (error) {
			toast.error(`Error during account updating: ${error.message}`, { id: toastId })
			console.error('Error during account updating:', error)
		}

    }

    const fetchAccountInfo = async (id: string) => {
        try {
            const res = await fetch('/api/user/get-account-fields', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(id),
            });
            const { description, website, tags } = await res.json();
            setInitialDescription(description);
            setInitialWebsite(website);
            setInitialTags(tags);
            setValue('description', description);
            setValue('website', website);
            setValue('tags', tags.map((tag: string) => ({ value: tag, label: tag })));
        } catch (error) {
            console.error('Error loading account details:', error);
        }
    };

    const fetchAccountLogo = async (id: string) => {
        try {
            const res = await fetch('/api/user/get-account-logo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(id),
            });
            const { logo_url } = await res.json();
            setInitialLogo(logo_url);
            setValue('imageUrl', logo_url);
        } catch (error) {
            console.error('Error loading logo:', error);
        }
    }; 

    useEffect(() => {
        if (!session) {
            if (status !== 'loading') {
                router.push('/login');
            }
        } else {
            fetchAccountInfo(session?.user?.id);
            fetchAccountLogo(session?.user?.id);
        }
    }, [session, status, router]);

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
            <div>
                <label className="block text-white font-bold mb-1">Society Logo</label>
                <ImageUpload register={register} setValue={setValue} initialLogo={initialLogo} />
            </div>
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
                <Input 
                    type="text"
                    placeholder="Society Description"
                    className="w-full text-black p-2 border border-gray-300 rounded"
                    {...register('description')}
                />
            </div>
            <div>
                <label className="block text-white font-bold mb-1">Website</label>
                <Input 
                    type="text"
                    placeholder="Official Website Link"
                    className="w-full text-black p-2 border border-gray-300 rounded"
                    {...register('website')}
                />
            </div>
            <div>
                <label className="block text-white font-bold mb-1">Tags</label>
                <Input 
                    type="text"
                    placeholder="Tags help students find your society"
                    className="w-full text-black p-2 border border-gray-300 rounded"
                    {...register('tags')}
                />
            </div>
            <div className="my-5">
                If you would like to change any of the greyed-out fields, please get in touch at londonstudentnetwork@gmail.com, and one of the team will be in touch.
            </div>
        </div>
    );
}
