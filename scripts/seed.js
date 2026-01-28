import { createClient } from "@libsql/client";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = process.env.VITE_TURSO_DB_URL;
const authToken = process.env.VITE_TURSO_DB_TOKEN;

if (!url || !authToken) {
    console.error("❌ Error: VITE_TURSO_DB_URL or VITE_TURSO_DB_TOKEN not found in .env");
    process.exit(1);
}

const db = createClient({
    url,
    authToken,
});

async function main() {
    console.log("🌱 Seeding database...");

    try {
        // Read all schema files from src/lib/schema
        const schemaDir = path.join(__dirname, "../src/lib/schema");
        const files = fs.readdirSync(schemaDir).filter(file => file.endsWith('.sql')).sort();

        for (const file of files) {
            console.log(`📄 Executing ${file}...`);
            const filePath = path.join(schemaDir, file);
            const sql = fs.readFileSync(filePath, "utf8");
            await db.executeMultiple(sql);
        }

        // Insert initial users
        await db.execute({
            sql: `INSERT OR IGNORE INTO users (full_name, email, password_hash, role, phone_number, verification_status) VALUES
                ('Admin User', 'admin@amarballot.com', 'admin123', 'admin', '01700000000', 'verified'),
                ('John Doe', 'john@example.com', 'password123', 'voter', '01711111111', 'pending')`,
            args: [],
        });

        // Insert initial election updates
        await db.execute({
            sql: `INSERT OR IGNORE INTO election_updates (title, content, image_url, published_at) VALUES
                ('Election Schedule Announced', 'The 13th National Parliamentary Election will be held on January 7, 2026. The Chief Election Commissioner announced the schedule today.', 'https://placehold.co/600x400', CURRENT_TIMESTAMP),
                ('Voter List Update', 'The final voter list has been published. Please check your details at your local election office or online.', 'https://placehold.co/600x400', CURRENT_TIMESTAMP)`,
            args: [],
        });

        // Insert initial rumors
        await db.execute({
            sql: `INSERT OR IGNORE INTO rumors (title, description, status, source) VALUES
                ('Election Postponed?', 'Social media posts claiming the election has been postponed are FALSE. The election will proceed as scheduled.', 'fake', 'https://factcheck.org/example'),
                ('New Vote Centers Added', 'The EC has added 500 new vote centers in remote areas. This is TRUE.', 'verified', 'https://ec.gov.bd')`,
            args: [],
        });

        console.log("✅ Database seeded successfully!");
    } catch (e) {
        console.error("❌ Seeding failed:", e);
        process.exit(1);
    } finally {
        db.close();
    }
}

main();
