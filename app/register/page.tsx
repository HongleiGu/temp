'use client';

import { UserGroupIcon, UserIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Register() {
	return (
		<main className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#041A2E] via-[#064580] to-[#083157] p-10">
			<h1 className='text-2xl p-10 text-center y-8 sm:my-12 tracking-wide capitalize'>Would you like to register a <i>Student</i>, <i>Society</i>, or <i>Organisation</i> account?</h1>
			<div className='flex flex-col sm:flex-row items-center justify-center w-[80%] h-fit'>
				<OptionButton name='student' />
				<OptionButton name='society' />
				<OptionButton name='organisation' />
			</div>
		</main>
	)
}


function OptionButton({ name }: { name: 'student' | 'society' | 'organisation' }) {
	return (
		<Link href={`/register/${name}`} className='flex flex-col border border-white/50 p-10 m-4 max-h-[400px] h-fit rounded-md shadow-xl items-center justify-center transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-opacity-90 bg-white/20'>
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
			{name === 'organisation' && (
				<div>
					<BriefcaseIcon width={150} height={150} className='[&>path]:stroke-[0.4] sm:w-[200px] sm:h-[200px]' />
					<h1 className='text-2xl w-full text-center p-10'>Sponsor</h1>
				</div>
			)}

		</Link>
	)
}

