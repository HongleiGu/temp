"use client";

// import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Input } from '../input';
import { Button } from '../button';
import { generateDays, generateMonths, generateYears, generateHours, generateMinutes } from '@/app/lib/utils';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import EventModal from "./event-modal";
import { validateEvent, createEventObject } from '@/app/lib/utils';
import { DefaultEvent, FormData } from '@/app/lib/types';
import TagsField from './create-event-tags';


const MAX_POSTGRES_STRING_LENGTH = 255;

interface CreateEventPageProps {
	imageList: string[]
	organiserList: string[]
}

export default function CreateEventPage({ imageList, organiserList }: CreateEventPageProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [eventData, setEventData] = useState(DefaultEvent); // Event data for preview
	const [errorMessage, setErrorMessage] = useState("");

	const { register, handleSubmit, formState: { errors, isValid }, setValue, watch } = useForm<FormData>({
		mode: 'onChange',
	});

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);
	const router = useRouter()


	const onSubmit = async (data: FormData) => {
		const error = validateEvent(data);

		if (error) {
			console.log(error);
			setErrorMessage(error)
			return;
		}


		try {
			const res = await fetch('/api/events/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			const result = await res.json();
			if (result.success) {
				console.log('Event successfully created:', data);
				router.push('/events');
			} else {
				console.error('Error creating event:', result.error);
			}
		} catch (error) {
			console.error('Error during event submission:', error);
		}
	};

	const onPreview = (data: FormData) => {
		const error = validateEvent(data);

		if (error) {
			console.log(error);
			setErrorMessage(error)
			return
		}

		const event = createEventObject(data);

		setEventData(event);
		openModal();
	};


	// Components for each form field
	const TitleField = () => (
		<div className="flex flex-col mb-4">
			<label htmlFor="title" className="text-2xl p-6 font-semibold">Title</label>
			{errors.title && <p className="text-red-600 text-sm self-end mb-1">Title is required (max 255 characters)</p>}
			<Input
				placeholder="e.g. Andreas Schaefer: From X-Rays to BCIs..."
				{...register('title', { required: true, maxLength: MAX_POSTGRES_STRING_LENGTH })}
				className="bg-transparent border border-gray-300 self-end truncate w-[90%] p-2"
				maxLength={MAX_POSTGRES_STRING_LENGTH}
			/>
		</div>
	);

	const DescriptionField = () => (

		<div className="flex flex-col mb-4">
			<label htmlFor="description" className="text-2xl p-6 font-semibold">Description</label>
			{errors.description && <p className="text-red-600 text-sm self-end mb-1">Description is required</p>}
			<textarea
				id="description"
				rows={4}
				{...register('description', { required: true })}
				className="w-[90%] self-end block p-3 text-sm  text-gray-900 bg-transparent rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
				placeholder="Please provide information about your event..."
			/>

		</div>
	)


	const OrganiserField = () => (
		<div className="flex flex-col mb-4">
			<label htmlFor="organiser" className="text-2xl p-6 font-semibold">Organiser</label>
			<select
				id="organiser"
				{...register('organiser', { required: true })}
				className="border border-gray-300 p-4 text-sm w-[90%] self-end bg-transparent rounded-lg"
			>
				<option value="" disabled>Select an organiser</option>
				{organiserList.map((org) => (
					<option key={org} value={org}>{org}</option>
				))}
			</select>
			{errors.organiser && <p className="text-red-600">Organiser is required</p>}
		</div>
	);

	const DateField = () => {
		const days = generateDays();
		const months = generateMonths();
		const years = generateYears(2024, 10); // Start from 2024 and allow 10 years

		return (
			<div className="flex flex-col space-x-2 mb-4">
				<label htmlFor="date" className="text-2xl p-6 font-semibold">Date</label>
				<div className="flex flex-row justify-end self-end w-auto p-2 space-x-2 ">

					<div className="flex flex-col p-2">
						<label className="text-sm font-semibold">Day</label>
						<select {...register('date.day', { required: true })} className="w-full bg-transparent">
							<option value="" disabled>Select Day</option>
							{days.map(day => (
								<option key={day} value={day}>{day}</option>
							))}
						</select>
					</div>


					<div className="flex flex-col p-2">
						<label className="text-sm font-semibold">Month</label>
						<select {...register('date.month', { required: true })} className="w-full bg-transparent">
							<option value="" disabled>Select Month</option>
							{months.map((month, index) => (
								<option key={index} value={index + 1}>{month}</option>
							))}
						</select>
					</div>


					<div className="flex flex-col p-2">
						<label className="text-sm font-semibold">Year</label>
						<select {...register('date.year', { required: true })} className="w-full bg-transparent">
							<option value="" disabled>Select Year</option>
							{years.map(year => (
								<option key={year} value={year}>{year}</option>
							))}
						</select>
					</div>
				</div>
			</div>
		)
	}

	const TimeField = () => {
		const hours = generateHours();
		const minutes = generateMinutes();

		return (
			<div className="flex flex-col mb-4">
				<label htmlFor="time" className="text-2xl p-6 font-semibold">Time</label>
				<div className="flex flex-col sm:flex-row justify-end w-auto self-end p-2 space-x-2">

					<div className="flex flex-col items-center p-2">
						<label className="text-sm font-semibold mb-1 text-center w-full">Start Time</label>
						<div className="flex space-x-2">
							<select {...register('time.startHour', { required: true })} className="bg-transparent text-center">
								<option value="" disabled>Select Hour</option>
								{hours.map(hour => (
									<option key={hour} value={hour}>{hour}</option>
								))}
							</select>
							<select {...register('time.startMinute', { required: true })} className="bg-transparent text-center">
								<option value="" disabled>Select Minute</option>
								{minutes.map(minute => (
									<option key={minute} value={minute}>{minute}</option>
								))}
							</select>
						</div>
					</div>


					<div className="flex flex-col items-center sm:border-l-2 border-gray-300 p-2">
						<label className="text-sm font-semibold mb-1 text-center w-full">End Time</label>
						<div className="flex space-x-2">
							<select {...register('time.endHour', { required: true })} className="bg-transparent text-center">
								<option value="" disabled>Select Hour</option>
								{hours.map(hour => (
									<option key={hour} value={hour}>{hour}</option>
								))}
							</select>
							<select {...register('time.endMinute', { required: true })} className="bg-transparent text-center">
								<option value="" disabled>Select Minute</option>
								{minutes.map(minute => (
									<option key={minute} value={minute}>{minute}</option>
								))}
							</select>
						</div>
					</div>
				</div>
			</div>
		)
	}

	const TagsFieldWrapper = () => {
		const eventTagValue = watch('event_tag', 0); // Default value is 0

		return (
			<TagsField
				value={eventTagValue}
				onChange={(newTagValue: number) => setValue('event_tag', newTagValue)}
			/>
		);
	};


	const ImagePickerField = () => (
		<div className="flex flex-col mb-4">
			<label className="text-2xl p-6 font-semibold">Image</label>
			<div className='flex flex-col w-[50%] self-end'>
				<p className='text-sm self-end text-gray-500 mb-2'>Please choose from one of our placeholders</p>
				<select
					className="p-4 text-sm w-full bg-transparent border border-gray-300"
					{...register('selectedImage', { required: true })}
				>
					<option value="" disabled>Select an image</option>
					{imageList.map((image) => (
						<option key={image} value={`/images/placeholders/${image}`} >{image.split('.')[0].replaceAll('-', ' ').toUpperCase()}</option>
					))}
				</select>
				<p className='text-sm self-end text-gray-500 mt-2'>...or upload your own</p>
				<Link href="" className='flex flex-row items-center self-end text-gray-700 aria-disabled:cursor-not-allowed cursor-not-allowed opacity-50'>
					<LockClosedIcon width={10} height={10} className='mr-1' />
					Coming Soon
				</Link>
			</div>
		</div>
	);

	const LocationField = () => (
		<div className="flex flex-col mb-4">
			<label className="text-2xl p-6 font-semibold mb-2">Location</label>

			<div className="flex flex-col mb-4 w-full">
				<label htmlFor="building" className="text-md font-semibold mb-2 ml-10">Building</label>
				<Input
					placeholder="e.g. Lecture Room G40, Sir Alexander Fleming Building"
					{...register('location.building', { maxLength: MAX_POSTGRES_STRING_LENGTH, required: true })}
					className="bg-transparent self-end truncate w-[80%] p-2 border border-gray-300"
				/>
			</div>

			<div className="flex flex-col mb-4 w-full">
				<label htmlFor="area" className="text-md font-semibold mb-2 ml-10">Area of London</label>
				<Input
					placeholder="e.g. Imperial College Campus, South Kensington"
					{...register('location.area', { maxLength: MAX_POSTGRES_STRING_LENGTH, required: true })}
					className="bg-transparent self-end truncate w-[80%] p-2 border border-gray-300"
				/>
			</div>

			<div className="flex flex-col mb-4 w-full">
				<label htmlFor="address" className="text-md font-semibold mb-2 ml-10">Address</label>
				<Input
					placeholder="e.g. 12 Prince Consort Road, SW7 2BP"
					{...register('location.address', { maxLength: MAX_POSTGRES_STRING_LENGTH, required: true })}
					className="bg-transparent self-end truncate w-[80%] p-2 border border-gray-300"
				/>
			</div>
		</div>
	)

	const SignupLinkField = () => (
		<div className="flex flex-col mb-4">
			<label className='flex flex-row items-center'><p className='text-2xl p-6 font-semibold'>Sign-up link</p> <p className='text-lg p-2'>(optional)</p></label>
			<Input
				type="url"
				{...register('signupLink')}
				className="w-[90%] self-end bg-transparent p-2 border border-gray-300"
				placeholder='e.g. https://www.tickettailor.com/events/londonstudentnetwork/1386868'
			/>
		</div>
	);


	return (
		<div className="relative bg-white p-10 overflow-auto text-black">
			<div className="sticky top-0 bg-gray-300 p-4 border-b flex justify-between items-center rounded-lg">
				<Button variant='ghost' size='sm' className='text-lg hover:text-gray-500' onClick={() => router.back()}>
					<ArrowLeftIcon width={30} height={30} />Back
				</Button>
				{errorMessage && (
					<p className='text-red-600 p-2 truncate'>{`Error: ${errorMessage}`}</p>
				)}
				<div className="space-x-0 space-y-2 md:space-y-0 md:space-x-4 flex flex-col md:flex-row items-center">
					<Button
						variant="outline"
						size="sm"
						disabled={!isValid}
						className='px-10 bg-purple-400 text-gray-950 md:text-xl'
						onClick={handleSubmit(onPreview)}
					>
						Preview
					</Button>
					<Button
						className='px-10 md:text-xl border-black'
						variant="outline"
						size="sm"
						disabled={!isValid}
						onClick={handleSubmit(onSubmit)}
					>
						Submit
					</Button>
				</div>
			</div>

			<form className="space-y-4">
				<h1 className="text-4xl font-semibold p-6">Let&#39;s create an event!</h1>
				<p className="text-sm text-gray-600 pl-6">Tell us a little about your event</p>

				<TitleField />
				<DescriptionField />
				<OrganiserField />
				<DateField />
				<TimeField />
				<TagsFieldWrapper />
				<LocationField />
				<ImagePickerField />
				<SignupLinkField />
			</form>

			{isModalOpen && <EventModal event={eventData} onClose={closeModal} />}
		</div>
	);
}
