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
            area: row.area as string,
            alliance: row.alliance as string
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

export async function getDashboardStats() {
    try {
        const users = await db.execute('SELECT COUNT(*) as count FROM users');
        const candidates = await db.execute('SELECT COUNT(*) as count FROM candidates');
        const centers = await db.execute('SELECT COUNT(*) as count FROM vote_centers');

        return {
            success: true,
            stats: {
                users: users.rows[0].count as number,
                candidates: candidates.rows[0].count as number,
                centers: centers.rows[0].count as number
            }
        };
    } catch (error) {
        console.error("Stats error:", error);
        return {
            success: false,
            stats: { users: 0, candidates: 0, centers: 0 }
        };
    }
}

export async function addCandidate(candidateData: any) {
    const { name, name_bn, party, party_bn, symbol, image_url, manifesto, manifesto_bn, education, experience, age, status, division, district, area, alliance } = candidateData;
    try {
        await db.execute({
            sql: `INSERT INTO candidates (name, name_bn, party, party_bn, symbol, image_url, manifesto, manifesto_bn, education, experience, age, status, division, district, area, alliance) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            args: [name, name_bn, party, party_bn, symbol, image_url, manifesto, manifesto_bn, education, experience, age, status, division, district, area, alliance]
        });
        return { success: true };
    } catch (error) {
        console.error("Add candidate error:", error);
        return { success: false, error };
    }
}

export async function updateCandidate(_id: number, _candidateData: any) {
    // Basic update logic placeholder
    return { success: false, message: "Update not implemented yet" };
}

export async function deleteCandidate(id: number) {
    try {
        await db.execute({
            sql: 'DELETE FROM candidates WHERE id = ?',
            args: [id]
        });
        return { success: true };
    } catch (error) {
        console.error("Delete candidate error:", error);
        return { success: false, error };
    }
}

// --- USERS MANAGEMENT ---

export async function getUsers() {
    try {
        const result = await db.execute('SELECT * FROM users ORDER BY created_at DESC');
        return result.rows.map(row => ({
            id: row.id,
            name: row.full_name,
            email: row.email,
            phone: row.phone_number,
            role: row.role,
            verification_status: row.verification_status,
            nid_number: row.nid_number,
            voter_area: row.voter_area,
            date_of_birth: row.date_of_birth
        }));
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}

export async function deleteUser(id: number) {
    try {
        await db.execute({
            sql: 'DELETE FROM users WHERE id = ?',
            args: [id]
        });
        return { success: true };
    } catch (error) {
        console.error("Delete user error:", error);
        return { success: false, error };
    }
}

// --- VOTE CENTERS MANAGEMENT ---

export async function addVoteCenter(centerData: any) {
    const { name, name_bn, address, address_bn, division, district, area, latitude, longitude, capacity } = centerData;
    try {
        await db.execute({
            sql: `INSERT INTO vote_centers (name, name_bn, address, address_bn, division, district, area, latitude, longitude, capacity) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            args: [name, name_bn, address, address_bn, division, district, area, latitude, longitude, capacity]
        });
        return { success: true };
    } catch (error) {
        console.error("Add center error:", error);
        return { success: false, error };
    }
}

export async function updateVoteCenter(_id: number, _centerData: any) {
    return { success: false, message: "Update not implemented yet" };
}

export async function deleteVoteCenter(id: number) {
    try {
        await db.execute({
            sql: 'DELETE FROM vote_centers WHERE id = ?',
            args: [id]
        });
        return { success: true };
    } catch (error) {
        console.error("Delete center error:", error);
        return { success: false, error };
    }
}

// --- ELECTION UPDATES MANAGEMENT ---

export async function getUpdates() {
    try {
        const result = await db.execute('SELECT * FROM election_updates ORDER BY published_at DESC');
        return result.rows.map(row => ({
            id: row.id,
            title: row.title,
            content: row.content,
            image_url: row.image_url,
            published_at: row.published_at
        }));
    } catch (error) {
        console.error("Error fetching updates:", error);
        return [];
    }
}

export async function addUpdate(updateData: any) {
    const { title, content, image_url } = updateData;
    try {
        await db.execute({
            sql: `INSERT INTO election_updates (title, content, image_url) VALUES (?, ?, ?)`,
            args: [title, content, image_url || null]
        });
        return { success: true };
    } catch (error) {
        console.error("Add update error:", error);
        return { success: false, error };
    }
}

export async function deleteUpdate(id: number) {
    try {
        await db.execute({
            sql: 'DELETE FROM election_updates WHERE id = ?',
            args: [id]
        });
        return { success: true };
    } catch (error) {
        console.error("Delete update error:", error);
        return { success: false, error };
    }
}

// --- RUMORS MANAGEMENT ---

export async function getRumors() {
    try {
        const result = await db.execute('SELECT * FROM rumors ORDER BY published_at DESC');
        return result.rows.map(row => ({
            id: row.id,
            title: row.title,
            description: row.description,
            status: row.status,
            source: row.source,
            published_at: row.published_at
        }));
    } catch (error) {
        console.error("Error fetching rumors:", error);
        return [];
    }
}

export async function addRumor(rumorData: any) {
    const { title, description, status, source } = rumorData;
    try {
        await db.execute({
            sql: `INSERT INTO rumors (title, description, status, source) VALUES (?, ?, ?, ?)`,
            args: [title, description, status, source]
        });
        return { success: true };
    } catch (error) {
        console.error("Add rumor error:", error);
        return { success: false, error };
    }
}

export async function deleteRumor(id: number) {
    try {
        await db.execute({
            sql: 'DELETE FROM rumors WHERE id = ?',
            args: [id]
        });
        return { success: true };
    } catch (error) {
        console.error("Delete rumor error:", error);
        return { success: false, error };
    }
}
