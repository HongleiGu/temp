import React, { useState, useEffect } from 'react';
import { DatePicker, TimePicker } from 'react-datepicker';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

const MAX_TITLE_LENGTH = 255;

export default function CreateEventPage() {
	const { register, handleSubmit, formState: { errors, isValid }, setValue } = useForm({
		mode: 'onChange', // Re-evaluate form validity as the user types
	});
	const [title, setTitle] = useState('');
	const [organiser, setOrganiser] = useState('');
	const [selectedImage, setSelectedImage] = useState('');
	const [date, setDate] = useState({ day: '', month: '', year: '' });
	const [time, setTime] = useState({ start: '', end: '' });

	// Example of an image list in the /public/placeholders/ directory
	const imageList = [
		'football.png',
		'conference.png',
		'workshop.png',
	];

	// Submit Handler
	const onSubmit = (data: any) => {
		console.log('Form Data:', data);
	};

	// Components for each form field
	const TitleField = () => (
		<div className="flex flex-col mb-4">
			<label htmlFor="title" className="text-sm font-semibold">Title</label>
			<input
				type="text"
				id="title"
				{...register('title', { required: true, maxLength: MAX_TITLE_LENGTH })}
				className="border p-2 text-sm w-full truncate"
				maxLength={MAX_TITLE_LENGTH}
				onChange={(e) => setTitle(e.target.value)}
				value={title}
			/>
			<p className="text-right text-xs">{MAX_TITLE_LENGTH - title.length} chars left</p>
			{errors.title && <p className="text-red-600">Title is required (max 255 characters)</p>}
		</div>
	);

	const OrganiserField = () => {
		const organisers = ['Company A', 'Company B']; // Example list, replace with dynamic data
		return (
			<div className="flex flex-col mb-4">
				<label htmlFor="organiser" className="text-sm font-semibold">Organiser</label>
				<select
					id="organiser"
					{...register('organiser', { required: true })}
					className="border p-2 text-sm w-full"
					value={organiser}
					onChange={(e) => setOrganiser(e.target.value)}
				>
					<option value="" disabled>Select an organiser</option>
					{organisers.map((org) => (
						<option key={org} value={org}>{org}</option>
					))}
				</select>
				{errors.organiser && <p className="text-red-600">Organiser is required</p>}
			</div>
		);
	};

	const DateField = () => (
		<div className="flex space-x-2 mb-4">
			<div className="flex flex-col">
				<label className="text-sm font-semibold">Day</label>
				<input
					type="number"
					className="border p-2 text-sm w-full"
					value={date.day}
					onChange={(e) => setDate({ ...date, day: e.target.value })}
				/>
			</div>
			<div className="flex flex-col">
				<label className="text-sm font-semibold">Month</label>
				<input
					type="number"
					className="border p-2 text-sm w-full"
					value={date.month}
					onChange={(e) => setDate({ ...date, month: e.target.value })}
				/>
			</div>
			<div className="flex flex-col">
				<label className="text-sm font-semibold">Year</label>
				<input
					type="number"
					className="border p-2 text-sm w-full"
					value={date.year}
					onChange={(e) => setDate({ ...date, year: e.target.value })}
				/>
			</div>
		</div>
	);

	const TimeField = () => (
		<div className="flex space-x-2 mb-4">
			<div className="flex flex-col">
				<label className="text-sm font-semibold">Start Time</label>
				<input
					type="time"
					className="border p-2 text-sm w-full"
					value={time.start}
					onChange={(e) => setTime({ ...time, start: e.target.value })}
				/>
			</div>
			<div className="flex flex-col">
				<label className="text-sm font-semibold">End Time</label>
				<input
					type="time"
					className="border p-2 text-sm w-full"
					value={time.end}
					onChange={(e) => setTime({ ...time, end: e.target.value })}
				/>
			</div>
		</div>
	);

	const ImagePickerField = () => (
		<div className="flex flex-col mb-4">
			<label className="text-sm font-semibold">Choose an Image</label>
			<select
				className="border p-2 text-sm w-full"
				value={selectedImage}
				onChange={(e) => setSelectedImage(e.target.value)}
			>
				<option value="" disabled>Select an image</option>
				{imageList.map((image) => (
					<option key={image} value={image}>{image}</option>
				))}
			</select>
			<p className="text-sm mt-2">Selected: {selectedImage || 'None'}</p>
		</div>
	);

	const SignupLinkField = () => (
		<div className="flex flex-col mb-4">
			<label className="text-sm font-semibold">Sign-up Link (Optional)</label>
			<input
				type="url"
				className="border p-2 text-sm w-full"
				{...register('signupLink')}
			/>
		</div>
	);

	return (
		<div className="fixed inset-0 bg-white z-50 p-4 overflow-auto">
			<header className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
				<h1 className="text-xl font-semibold">Let’s create an event!</h1>
				<div className="space-x-4">
					<button className="px-4 py-2 bg-gray-300 text-sm rounded" disabled={!isValid}>Preview</button>
					<button
						className="px-4 py-2 bg-purple-500 text-white text-sm rounded disabled:bg-gray-300"
						disabled={!isValid}
						onClick={handleSubmit(onSubmit)}
					>
						Submit
					</button>
				</div>
			</header>

			<form className="space-y-4">
				<p className="text-sm text-gray-600">Tell us a little about your event</p>

				<TitleField />
				<OrganiserField />
				<DateField />
				<TimeField />
				<SignupLinkField />
				<ImagePickerField />
			</form>
		</div>
	);
}
