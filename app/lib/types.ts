
export interface Event {
	id: string;
	organiser_name: string;
	event_title: string;
	description: string;
	date: string;
	time_start: string;
	time_end: string;
	location: string;
	image: string;
}

export type User = {
	id: string;
	name: string;
	email: string;
	password: string;
	role: string;
	emailVerified: boolean;
}