'use client';

import { useState, FormEvent } from 'react';
import { KeyIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '../button';
import { authenticate } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';
import { Input } from '../input';
import ForgottenPasswordModal from './reset-password-modal';
import toast from 'react-hot-toast';

export default function LoginForm() {
	const [isPending, setIsPending] = useState<boolean>(false)
	const [showForgottenPasswordModal, setShowForgottenPasswordModal] = useState(false);

	const router = useRouter()

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const toastId = toast.loading('Logging you in...')
		setIsPending(true)

		const formData = new FormData(e.currentTarget)
		const result = await authenticate(undefined, formData)

		if (!result.response) {
			toast.error('Login failed.', { id: toastId });
		} else {
			toast.success('Successfully logged in!', { id: toastId })
			router.push('/account')
		}
		setIsPending(false)
	};

	const handleForgottenPasswordPress = () => {
		setShowForgottenPasswordModal(true);
	}

	return (
		<>

			<form onSubmit={handleSubmit} className="space-y-3">
				<div className="flex-1 flex-col items-center rounded-lg bg-gray-50 px-6 pb-4 pt-8 text-black">
					<h1 className='mb-3 text-xl '>
						Please enter your details to log in
					</h1>
					<div className="w-full">
						<div>
							<label
								className="mb-3 mt-5 block text-xs font-medium text-gray-900"
								htmlFor="email"
							>
								Email
							</label>
							<div className="relative">
								<Input
									className='bg-transparent text-black text-center '
									id="email"
									type="email"
									name="email"
									placeholder="Email Address"
									required
								/>
							</div>
						</div>
						<div className="mt-4">
							<label
								className="mb-3 mt-5 block text-xs font-medium text-gray-900"
								htmlFor="password"
							>
								Password
							</label>
							<div className="relative">
								<Input
									className='bg-transparent text-black text-center peer'
									id="password"
									type="password"
									name="password"
									placeholder="Enter your password"
									required
									minLength={6}
								/>
								<KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
							</div>
						</div>
					</div>
					<Button variant="filled" size="md" type='submit' className="mt-4 w-full" aria-disabled={isPending}>
						Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
					</Button>
					<Button
						variant="ghost"
						size="md"
						className="self-end hover:text-gray-400"
						onClick={handleForgottenPasswordPress}
					>
						Forgotten password?
					</Button>
				</div>
			</form>
			{showForgottenPasswordModal && (
				<ForgottenPasswordModal
					onClose={() => setShowForgottenPasswordModal(false)}
				/>
			)}
		</>
	);
}

