import { createClient } from '@libsql/client';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.VITE_TURSO_DB_URL;
const authToken = process.env.VITE_TURSO_DB_TOKEN;

if (!url || !authToken) {
    console.error('Missing VITE_TURSO_DB_URL or VITE_TURSO_DB_TOKEN');
    process.exit(1);
}

const db = createClient({ url, authToken });

async function migrate() {
    try {
        console.log('Starting migration...');

        // Add columns one by one (SQLite doesn't support multiple ADD COLUMN in one statement usually)
        try {
            await db.execute("ALTER TABLE users ADD COLUMN nid_number TEXT");
            console.log('Added nid_number');
        } catch (e) { console.log('nid_number might already exist', e.message); }

        try {
            await db.execute("ALTER TABLE users ADD COLUMN date_of_birth TEXT");
            console.log('Added date_of_birth');
        } catch (e) { console.log('date_of_birth might already exist', e.message); }

        try {
            await db.execute("ALTER TABLE users ADD COLUMN voter_area TEXT");
            console.log('Added voter_area');
        } catch (e) { console.log('voter_area might already exist', e.message); }

        try {
            await db.execute("ALTER TABLE users ADD COLUMN verification_status TEXT DEFAULT 'unverified'");
            console.log('Added verification_status');
        } catch (e) { console.log('verification_status might already exist', e.message); }

        console.log('Migration completed successfully.');
    } catch (error) {
        console.error('Migration failed:', error);
    }
}

migrate();
