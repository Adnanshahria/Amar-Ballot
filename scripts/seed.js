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

        console.log("✅ Database seeded successfully!");
    } catch (e) {
        console.error("❌ Seeding failed:", e);
        process.exit(1);
    } finally {
        db.close();
    }
}

main();
