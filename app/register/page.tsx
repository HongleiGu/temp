'use client';

import { UserGroupIcon, UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Register() {
	return (
		<main className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#041A2E] via-[#064580] to-[#083157] p-10">
			<h1 className='text-3xl p-10 text-center y-8 sm:my-12 tracking-wide'>WOULD YOU LIKE TO REGISTER A <i>USER</i> ACCOUNT OR A <i>SOCIETY</i> ACCOUNT?</h1>
			<div className='flex flex-col sm:flex-row items-center justify-center w-[80%] h-fit'>
				<OptionButton name='student' />
				<OptionButton name='society' />
			</div>
		</main>
	)
}


function OptionButton({ name }: { name: 'student' | 'society' }) {
	return (
		<Link href={`/register/${name}`} className='flex flex-col border border-white/50 p-10 m-4 max-h-[400px] h-fit rounded-xl shadow-xl items-center justify-center transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-opacity-90 bg-white/20'>
			<h2></h2>
			{name === 'society' && (
				<div>
					<UserGroupIcon width={150} height={150} className='[&>path]:stroke-[0.4] sm:w-[200px] sm:h-[200px]' />
					<h1 className='text-2xl w-full text-center p-10'>Society</h1>
				</div>
			)}
			{name === 'student' && (
				<div>
					{/* <UserIcon width={200} height={200} className='[&>path]:stroke-[0.4]' /> */}
					<UserIcon width={150} height={150} className='[&>path]:stroke-[0.4] sm:w-[200px] sm:h-[200px]' />
					<h1 className='text-2xl w-full text-center p-10'>Student</h1>
				</div>
			)}

		</Link>
	)
}