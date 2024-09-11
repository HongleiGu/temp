
export interface Event {
	id: string;
	title: string,
	description: string;
	organiser: string;
	time: string,
	date: string,
	location: string,
	image_url: string,
	event_type: number
}

export interface SQLEvent {
	id: string;
	title: string,
	description: string;
	organiser: string;
	start_time: string,
	end_time: string,
	day: number,
	month: number,
	year: number,
	location_building: string,
	location_area: string,
	location_address: string,
	image_url: string,
	event_type: number
}

export type User = {
	id: string;
	name: string;
	email: string;
	password: string;
	role: string;
	emailVerified: boolean;
}