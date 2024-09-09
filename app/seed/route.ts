// import bcrypt from 'bcrypt';
// import { db } from '@vercel/postgres';
// import { invoices, customers, revenue, users } from '../lib/placeholder-data';

// const client = await db.connect();

const users = [
	{
		name: 'Admin User',
		email: '-@-.co.uk',
		password: 'super-secret-password',
		role: 'admin',
		emailVerified: true,
	},
	{
		name: 'Test User',
		email: 'test@lsn.co.uk',
		password: 'gottabeshine',
		role: 'user',
		emailVerified: true,
	}
]

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


// export async function GET() {
// 	try {
// 		await client.sql`BEGIN`;
// 		await seedUsers();

// 		await client.sql`COMMIT`;

// 		return Response.json({ message: 'Database seeded successfully' });
// 	} catch (error) {
// 		await client.sql`ROLLBACK`;
// 		return Response.json({ error }, { status: 500 });
// 	}
// }