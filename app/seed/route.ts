// import bcrypt from 'bcrypt';
// import { invoices, customers, revenue, users } from '../lib/placeholder-data';

// import { db } from '@vercel/postgres';
// const client = await db.connect();

// const users = [
// 	{
// 		name: 'Admin User',
// 		email: '-@-.co.uk',
// 		password: 'super-secret-password',
// 		role: 'admin',
// 		emailVerified: true,
// 	},
// 	{
// 		name: 'Test User',
// 		email: 'test@lsn.co.uk',
// 		password: 'gottabeshine',
// 		role: 'user',
// 		emailVerified: true,
// 	}
// ]

// const events = [
// 	{
// 		title: 'Andreas Schafer - From X-Rays to Brain Computer Interfaces',
// 		description: 'We are joined by Professor Andreas Schaefer, a Group Leader at the Francis Crick Institute in Kings Cross, London, where his research focuses on dissecting the cellular mechanisms of sensory processing in the brain. Techniques employed include electron microscopy, in vivo electrophysiology and imaging, genetic and optogenetic interference as well as behavioural tasks and computational modelling. Andreas also co-founded Paradromics in 2015, developing next generation brain-computer interface technology for effective therapies for brain-related disorders. It harnesses discoveries from Professor Schaefer’s laboratory of an accurate and scalable method to record and stimulate brain activity across large areas, including on the surface and in deeper regions simultaneously.\nWe are also joined by 🧠 Sam Hosovsky, the CEO of uCat, a company focusing on integrating brain computer interfaces with VR. He will be giving an insight to what his company does. ',
// 		organiser: 'Imperial Neurotech Society',
// 		organiser_uid: '45ef371c-0cbc-4f2a-b9f1-f6078aa6638c',
// 		start_time: '18:30',
// 		end_time: '19:30',
// 		day: 18,
// 		month: 9,
// 		year: 2024,
// 		location_building: 'Room 1.31, RSM Building',
// 		location_area: 'Imperial South Kensington Campus',
// 		location_address: 'SW7 2AZ',
// 		image: '/images/placeholders/lecture-hall-1.jpg',
// 		event_type: 2
// 	},
// 	{
// 		title: 'Stop Light Social',
// 		description: 'We\'re kicking off the term with more than just a pub quiz! Join us along with 12 societies from 5 universities as we mix up the ordinary with a night of assisted socialising. Upon arrival, you\'ll get a name tag and a stoplight wristband to signal your vibe for the night!\n\nForm your quiz groups, meet new faces, and dive into our 3 crucial quiz categories for students. This is your perfect chance to explore the intercollegiate scene during Freshers - and the only night like it!',
// 		organiser: 'London Students Network',
// 		organiser_uid: '45ef371c-0cbc-4f2a-b9f1-f6078aa6638c',
// 		start_time: '19:30',
// 		end_time: '23:00',
// 		day: 20,
// 		month: 9,
// 		year: 2024,
// 		location_building: 'The Thirsty Bear',
// 		location_area: 'South Bank / Waterloo',
// 		location_address: '62 Stamford Street, SE1 9LX',
// 		image: '/images/placeholders/pub.jpg',
// 		event_type: 1
// 	},
// 	{
// 		title: 'LSN inter-collegiate football tournament',
// 		description: 'A super exciting sporting spectacle. Join us to watch rivals battle to the death in under a somewhat friendly guise.',
// 		organiser: 'London Students Networks',
// 		organiser_uid: '45ef371c-0cbc-4f2a-b9f1-f6078aa6638c',
// 		start_time: '16:30',
// 		end_time: '18:30',
// 		day: 13,
// 		month: 9,
// 		year: 2024,
// 		location_building: 'Pitches 11 and 12, Westway',
// 		location_area: 'Westway Sports and Fitness, Latimer Road',
// 		location_address: '1 Crowthorne Road, W10 6RP',
// 		image: '/images/placeholders/football.jpg',
// 		event_type: 4
// 	},
// 	{
//         title: 'AI in Healthcare Panel Discussion',
//         description: 'Join experts from Imperial, King\'s College London, and UCL to discuss the future of AI in healthcare. Topics will include the role of machine learning in diagnostics, AI ethics in medical research, and career opportunities in health tech. This panel discussion will be followed by a networking social with refreshments.',
//         organiser: 'London Healthcare Society',
//         organiser_uid: '45ef371c-0cbc-4f2a-b9f1-f6078aa6638c',
//         start_time: '18:00',
//         end_time: '20:00',
//         day: 25,
//         month: 9,
//         year: 2024,
//         location_building: 'Lecture Theatre G34, Sir Alexander Fleming Building',
//         location_area: 'Imperial South Kensington Campus',
//         location_address: 'SW7 2AZ',
//         image: '/images/placeholders/brainstorm.jpg',
//         event_type: 3 // ACADEMIC + SOCIAL
//     },
//     {
//         title: 'Freshers Welcome BBQ',
//         description: 'Kick off the year with a relaxing BBQ hosted by the Student Union! Enjoy free food, games, and music while meeting new friends from across different courses and societies. Vegetarian and vegan options available.',
//         organiser: 'Student Union',
//         organiser_uid: '45ef371c-0cbc-4f2a-b9f1-f6078aa6638c',
//         start_time: '14:00',
//         end_time: '18:00',
//         day: 28,
//         month: 9,
//         year: 2024,
//         location_building: 'Union Lawn, Main Quad',
//         location_area: 'University College London',
//         location_address: 'Gower Street, WC1E 6BT',
//         image: '/images/placeholders/social.jpg',
//         event_type: 1 // SOCIAL
//     },
//     {
//         title: 'University of London Volleyball Tournament',
//         description: 'Represent your university and compete in the University of London Volleyball Tournament. Teams from universities across London will face off in a day-long event. Whether you\'re playing or just spectating, come out to support your team and enjoy the competition.',
//         organiser: 'London University Sports Federation',
//         organiser_uid: '45ef371c-0cbc-4f2a-b9f1-f6078aa6638c',
//         start_time: '10:00',
//         end_time: '17:00',
//         day: 30,
//         month: 9,
//         year: 2024,
//         location_building: 'Lee Valley Athletics Centre',
//         location_area: 'Edmonton, London',
//         location_address: 'N9 0AR',
//         image: '/images/placeholders/running.jpg',
//         event_type: 4 // SPORTING
//     },
//     {
//         title: 'Coding Bootcamp: Learn React.js in One Day',
//         description: 'A fast-paced, hands-on workshop designed to teach you the fundamentals of React.js. Perfect for beginners looking to build their first web app or those with some experience in JavaScript. By the end of the day, you\'ll have built a small project to showcase your skills.',
//         organiser: 'Tech Society - King\'s College London',
//         organiser_uid: '45ef371c-0cbc-4f2a-b9f1-f6078aa6638c',
//         start_time: '09:00',
//         end_time: '17:00',
//         day: 3,
//         month: 10,
//         year: 2024,
//         location_building: 'Bush House, North East Wing',
//         location_area: 'King\'s College London',
//         location_address: 'Strand, London, WC2R 1AE',
//         image: '/images/placeholders/teaching.jpg',
//         event_type: 2 // ACADEMIC
//     },
//     {
//         title: 'End of Term Charity Run & After-Party',
//         description: 'Run for a good cause! Join us for a 5km charity run through Hyde Park, raising funds for Great Ormond Street Hospital. After the run, celebrate with a post-run party at the Student Union Bar, complete with live music and prize giveaways.',
//         organiser: 'London University Running Club',
//         organiser_uid: '45ef371c-0cbc-4f2a-b9f1-f6078aa6638c',
//         start_time: '11:00',
//         end_time: '15:00',
//         day: 10,
//         month: 12,
//         year: 2024,
//         location_building: 'Hyde Park',
//         location_area: 'Central London',
//         location_address: 'W2 2UH',
//         image: '/images/placeholders/running.jpg',
//         event_type: 5 // SPORTING + SOCIAL
//     }
// ]

// async function seedUsers() {
// 	await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
// 	await client.sql`
// 	  CREATE TABLE IF NOT EXISTS users (
// 		id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
// 		name VARCHAR(255),
// 		email VARCHAR(255) UNIQUE NOT NULL,
// 		password VARCHAR(255) NOT NULL,
// 		role VARCHAR(20) DEFAULT 'user',
// 		emailVerified BOOLEAN DEFAULT false
// 	  );
// 	`;

// 	const insertedUsers = await Promise.all(
// 		users.map(async (user) => {
// 			const hashedPassword = await bcrypt.hash(user.password, 10);
// 			return client.sql`
// 				INSERT INTO users (name, email, password, role, emailVerified)
// 				VALUES (${user.name}, ${user.email}, ${hashedPassword}, ${user.role}, ${user.emailVerified})
// 				ON CONFLICT (email) DO NOTHING;
// 			`;
// 		}),
// 	);

// 	return insertedUsers;
// }


// async function seedEvents() {
// 	await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
// 	await client.sql`
// 	  CREATE TABLE IF NOT EXISTS events (
// 		id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
// 		title VARCHAR(255) NOT NULL,
// 		description TEXT, 
// 		organiser VARCHAR(225) NOT NULL,
// 		organiser_uid UUID NOT NULL,
// 		start_time VARCHAR(255),
// 		end_time VARCHAR(255),
// 		day INT NOT NULL,
// 		month INT NOT NULL,
// 		year INT NOT NULL,
// 		location_building VARCHAR(255),
// 		location_area VARCHAR(255),
// 		location_address VARCHAR(255),
// 		image_url VARCHAR(255) NOT NULL,
// 		event_type INT NOT NULL
// 	  );
// 	`;

// 	const insertedEvents = await Promise.all(
// 		events.map(async (event) => {
// 			return client.sql`
// 					INSERT INTO events (title, description, organiser, organiser_uid, start_time, end_time, day, month, year, location_building, location_area, location_address, image_url, event_type)
// 					VALUES (${event.title}, ${event.description}, ${event.organiser}, ${event.organiser_uid}, ${event.start_time}, ${event.end_time}, ${event.day}, ${event.month}, ${event.year}, ${event.location_building}, ${event.location_area}, ${event.location_address}, ${event.image}, ${event.event_type})
// 			`
// 		})
// 	)

// 	return insertedEvents
// }

// export async function GET() {
// 	try {
// 		await client.sql`BEGIN`;
// 		await seedEvents();

// 		await client.sql`COMMIT`;

// 		return Response.json({ message: 'Database seeded successfully' });
// 	} catch (error) {
// 		await client.sql`ROLLBACK`;
// 		return Response.json({ error }, { status: 500 });
// 	}
// }