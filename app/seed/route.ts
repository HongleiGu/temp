// import bcrypt from 'bcrypt';
// import { invoices, customers, revenue, users } from '../lib/placeholder-data';

// import { db } from '@vercel/postgres';
// const client = await db.connect();


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
// 		event_type INT NOT NULL,
// 		sign_up_link VARCHAR(255)
// 	  );
// 	`;

// 	const insertedEvents = await Promise.all(
// 		events.map(async (event) => {
// 			return client.sql`
// 				INSERT INTO events (title, description, organiser, organiser_uid, start_time, end_time, day, month, year, location_building, location_area, location_address, image_url, event_type, sign_up_link)
// 				VALUES (${event.title}, ${event.description}, ${event.organiser}, ${event.organiser_uid}, ${event.start_time}, ${event.end_time}, ${event.day}, ${event.month}, ${event.year}, ${event.location_building}, ${event.location_area}, ${event.location_address}, ${event.image}, ${event.event_type}, ${event.sign_up_link})
// 			`
// 		})
// 	)

// 	return insertedEvents
// }

// async function addColumnToTable() {
// 	await client.sql`
// 	ALTER TABLE events
// 	ADD COLUMN sign_up_link VARCHAR(255)
// 	`
// }

// async function seedContactFormTable() {

// 	await client.sql`
// 	  CREATE TABLE IF NOT EXISTS contact_forms (
// 		id SERIAL PRIMARY KEY,
// 		name VARCHAR(255),
// 		email VARCHAR(255) NOT NULL,
// 		message TEXT,
// 		created_at TIMESTAMP DEFAULT NOW()
// 	  );
// 	`;

// }

// export async function GET() {
// 	try {
// 		await client.sql`BEGIN`;
// 		// await addColumnToTable();
// 		await seedContactFormTable()

// 		await client.sql`COMMIT`;

// 		return Response.json({ message: 'Database updated successfully' });
// 	} catch (error) {
// 		await client.sql`ROLLBACK`;
// 		return Response.json({ error }, { status: 500 });
// 	}
// }