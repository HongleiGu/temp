import { sql } from '@vercel/postgres';
import { SQLEvent, ContactFormInput, SocietyRegisterFormData, UserRegisterFormData } from './types';
import { convertSQLEventToEvent, formatDOB, selectUniversity, capitalize } from './utils';
import bcrypt from 'bcrypt';

export async function fetchEvents() {
	try {
		const data = await sql<SQLEvent>`SELECT * FROM events`
		return data.rows.map(convertSQLEventToEvent)
	} catch (error) {
		console.error('Database error:', error)
		throw new Error('Failed to fetch events data')
	}
}

export async function fetchUpcomingEvents() {
	try {
		const data = await sql<SQLEvent>`
			SELECT * FROM events
			WHERE (year, month, day) >= (EXTRACT(YEAR FROM CURRENT_DATE), EXTRACT(MONTH FROM CURRENT_DATE), EXTRACT(DAY FROM CURRENT_DATE))
			ORDER BY year, month, day
			LIMIT 5
		`;
		return data.rows.map(convertSQLEventToEvent);
	} catch (error) {
		console.error('Database error:', error);
		throw new Error('Failed to fetch upcoming events');
	}
}

export async function insertEvent(event: SQLEvent) {
	try {
		await sql`
		INSERT INTO events (title, description, organiser, organiser_uid, start_time, end_time, day, month, year, location_building, location_area, location_address, image_url, event_type, sign_up_link)
		VALUES (${event.title}, ${event.description}, ${event.organiser}, ${event.organiser_uid}, ${event.start_time}, ${event.end_time}, ${event.day}, ${event.month}, ${event.year}, ${event.location_building}, ${event.location_area}, ${event.location_address}, ${event.image_url}, ${event.event_type}, ${event.sign_up_link ?? null})
		`
		return { success: true };
	} catch (error) {
		console.error('Error creating event:', error);
		return { success: false, error };
	}
}


export async function deleteEvents(eventIds: string[]): Promise<void> {
	try {
		if (eventIds.length === 0) {
			throw new Error('No event IDs provided for deletion');
		}

		const jsonEventIds = eventIds.map(id => ({ id }));

		// Use json_populate_recordset to delete the events by ID
		await sql.query(
			`DELETE FROM events
             WHERE id IN (SELECT id FROM json_populate_recordset(NULL::events, $1))`,
			[JSON.stringify(jsonEventIds)]
		);


		console.log(`Deleted ${eventIds.length} events.`);
	} catch (error) {
		console.error('Database error during deletion:', error);
		throw new Error('Failed to delete events');
	}
}

export async function insertContactForm(form: ContactFormInput) {
	try {
		await sql`
		INSERT INTO contact_forms (name, email, message)
		VALUES (${form.name}, ${form.email}, ${form.message})
		`
		return { success: true };
	} catch (error) {
		console.error('Error adding contact form item:', error);
		return { success: false, error };
	}
}

export async function fetchAllContactForms() {
	try {
		const data = await sql<ContactFormInput>`SELECT * FROM contact_forms`
		return data.rows
	} catch (error) {
		console.error('Database error:', error)
		throw new Error('Failed to fetch contact form data')
	}
}

export async function insertOrganiser(formData: SocietyRegisterFormData) {
	try {
		const hashedPassword = await bcrypt.hash(formData.password, 10);
		const name = formData.name.split(' ').map(capitalize).join(' ')
		
		await sql`
			INSERT INTO users (name, email, password, role, logo_url)
			VALUES (${name}, ${formData.email}, ${hashedPassword}, ${'organiser'}, ${formData.imageUrl})
			ON CONFLICT (email) DO NOTHING
		`;

		return { success: true };
	} catch (error) {
		console.error('Error creating user:', error);
		return { success: false, error };
	}
}

export async function insertUser(formData: UserRegisterFormData) {
	try {
		const hashedPassword = await bcrypt.hash(formData.password, 10);
		const username = `${capitalize(formData.firstname)} ${capitalize(formData.surname)}`
		
		const result =  await sql`
			INSERT INTO users (name, email, password)
			VALUES (${username}, ${formData.email}, ${hashedPassword})
			ON CONFLICT (email) DO NOTHING
			RETURNING id
		`;

		console.log(`Created a user with id: ${result.rows[0].id}`)

		return { success: true, id: result.rows[0].id };
	} catch (error) {
		console.error('Error creating user:', error);
		return { success: false, error };
	}
}

export async function checkSocietyName(name: string) {
	try {
		const societyName = name.split(' ').map(capitalize).join(' ')
		const result = await sql`
			SELECT name FROM users
			WHERE name = ${societyName}
			LIMIT 1
		`
		if (result.rows.length > 0) {
			return { success: true, nameTaken: true }
		} else {
			return { success: true, nameTaken: false }
		}
	} catch (error) {
		console.error('Error checking name:', error)
		return { success: false, error }
	}
}

export async function checkEmail(email: string) {
	try {
		const result = await sql`
			SELECT id FROM users
			WHERE email = ${email}
			LIMIT 1
		`
		if (result.rows.length > 0) {
			return { success: true, emailTaken: true }
		} else {
			return { success: true, emailTaken: false }
		}
	} catch (error) {
		console.error('Error checking email:', error)
		return { success: false, error }
	}
}

export async function insertUserInformation(formData: UserRegisterFormData, userId: string) {
	const formattedDOB = formatDOB(formData.dob) // Currently just leaves in yyyy-mm-dd form
	const university = selectUniversity(formData.university, formData.otherUniversity) // if 'other' selected, uses text input entry
	try {
		await sql`
			INSERT INTO user_information (user_id, gender, birthdate, university_attended, graduation_year, course, level_of_study, newsletter_subscribe)
        	VALUES (${userId}, ${formData.gender}, ${formattedDOB}, ${university}, ${formData.graduationYear}, ${formData.degreeCourse}, ${formData.levelOfStudy}, ${formData.isNewsletterSubscribed})
		`
		return { success: true };
	} catch (error) {
		console.error('Error creating user_information:', error);
		return { success: false, error };
	}
}