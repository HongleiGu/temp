'use client';

import { useState, FormEvent } from 'react';
import { KeyIcon, ExclamationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '../button';
import { authenticate } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';
import { Input } from '../input';

export default function LoginForm() {
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [isPending, setIsPending] = useState<boolean>(false)
	const [showForgottenPasswordModal, setShowForgottenPasswordModal] = useState(false);

	const router = useRouter()

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setErrorMessage(null)
		setIsPending(true)

		const formData = new FormData(e.currentTarget)
		const result = await authenticate(undefined, formData)

		if (!result.response) {
			setErrorMessage(result.error || 'Login failed');
		} else {
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
					<Button variant="filled" size="md" className="mt-4 w-full" aria-disabled={isPending}>
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
					<div
						className="flex h-8 items-end space-x-1"
						aria-live="polite"
						aria-atomic="true"
					>
						{errorMessage && (
							<>
								<ExclamationCircleIcon className="h-5 w-5 text-red-500" />
								<p className="text-sm text-red-500">{errorMessage}</p>
							</>
						)}
					</div>
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


function ForgottenPasswordModal({ onClose }: { onClose: () => void }) {
	const [inputEmail, setInputEmail] = useState('');
	const [status, setStatus] = useState<string | null>(null);
	const [inputDisabled, setInputDisabled] = useState(false)

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setInputDisabled(true)
		setStatus('Sending...');
		try {
			const data = {
				name: 'Forgotten Password',
				email: inputEmail,
				message: `Forgotten Password request for email: ${inputEmail}`,
			};

			const response = await fetch('/api/send-email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (response.ok) {
				setStatus('Password reset email sent!');
			} else {
				setStatus('Failed to send the email.');
			}
		} catch (error) {
			console.error('Error sending the email:', error);
			setStatus('An error occurred. Please try again.');
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
				<div className="flex justify-between items-center">
					<h2 className="text-lg font-bold text-black">Forgotten Password</h2>
					<Button variant='ghost' onClick={onClose}>
						<XMarkIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
					</Button>
				</div>
				<p className="mt-4 text-sm text-gray-600">
					Please enter your email address to reset your password. We will notify the team of your issue and have it resolved as soon as possible
				</p>
				<form onSubmit={handleSubmit} className="mt-10 space-y-4">
					<Input
						id="forgottenEmail"
						type="email"
						name="forgottenEmail"
						placeholder="Enter your email"
						value={inputEmail}
						onChange={(e) => setInputEmail(e.target.value)}
						required
						className='bg-transparet text-black'
						disabled={inputDisabled}
					/>
					<Button variant="filled" size="md" className="w-full" disabled={inputDisabled}>
						Submit
					</Button>
					{status && <p className="mt-2 text-sm text-center text-gray-600">{status}</p>}
				</form>
			</div>
		</div>
	);
}