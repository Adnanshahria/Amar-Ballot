import { db } from './db';
import type { Candidate, VoteCenter } from './types';

export async function getCandidates(): Promise<Candidate[]> {
    try {
        const result = await db.execute('SELECT * FROM candidates');
        return result.rows.map(row => ({
            id: row.id as number,
            name: row.name as string,
            name_bn: row.name_bn as string,
            party: row.party as string,
            party_bn: row.party_bn as string,
            symbol: row.symbol as string,
            image_url: row.image_url as string,
            manifesto: row.manifesto as string,
            manifesto_bn: row.manifesto_bn as string,
            education: row.education as string,
            experience: row.experience as string,
            age: row.age as number,
            status: row.status as 'clean' | 'pending',
            division: row.division as string,
            district: row.district as string,
            area: row.area as string
        }));
    } catch (error) {
        console.error('Error fetching candidates:', error);
        return [];
    }
}

export async function getVoteCenters(): Promise<VoteCenter[]> {
    try {
        const result = await db.execute('SELECT * FROM vote_centers');
        return result.rows.map(row => ({
            id: row.id as number,
            name: row.name as string,
            name_bn: row.name_bn as string,
            address: row.address as string,
            address_bn: row.address_bn as string,
            division: row.division as string,
            district: row.district as string,
            area: row.area as string,
            latitude: row.latitude as number,
            longitude: row.longitude as number,
            capacity: row.capacity as number
        }));
    } catch (error) {
        console.error('Error fetching vote centers:', error);
        return [];
    }
}

// Authentication Functions
// NOTE: in a production app, these should be handled by a secure backend to protect the database token.
// Authentication Functions
// NOTE: Storing passwords in plain text as requested by user.

export async function registerUser(userData: any) {
    const { name, email, password, phone } = userData;
    try {
        // Plain text password storage
        await db.execute({
            sql: `INSERT INTO users (full_name, email, password_hash, phone_number, created_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`,
            args: [name, email, password, phone]
        });
        return { success: true };
    } catch (error) {
        console.error("Registration error:", error);
        return { success: false, error };
    }
}

export async function loginUser(credentials: any) {
    const { email, password } = credentials;
    try {
        const result = await db.execute({
            sql: `SELECT * FROM users WHERE email = ?`,
            args: [email]
        });

        if (result.rows.length === 0) return { success: false, message: "User not found" };

        const user = result.rows[0];
        // Plain text password comparison
        const isValid = password === user.password_hash;

        if (!isValid) return { success: false, message: "Invalid password" };

        return {
            success: true,
            user: {
                id: user.id,
                name: user.full_name,
                email: user.email,
                role: user.role,
                verification_status: user.verification_status,
                nid_number: user.nid_number,
                voter_area: user.voter_area
            }
        };
    } catch (error) {
        console.error("Login error:", error);
        return { success: false, error };
    }
}

export async function verifyUser(userId: number, nidData: any) {
    const { nidNumber, dateOfBirth, voterArea } = nidData;
    try {
        await db.execute({
            sql: `UPDATE users SET nid_number = ?, date_of_birth = ?, voter_area = ?, verification_status = 'verified' WHERE id = ?`,
            args: [nidNumber, dateOfBirth, voterArea, userId]
        });
        return { success: true };
    } catch (error) {
        console.error("Verification error:", error);
        return { success: false, error };
    }
}
