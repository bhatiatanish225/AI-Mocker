/** @type { import("drizzle-kit").Config } */
import { defineConfig } from "drizzle-kit";


export default defineConfig ({
	schema: "utils/schema.js",
	dialect: 'postgresql',
	
	dbCredentials: {
		url: "postgresql://neondb_owner:F6sS7YZgEAoU@ep-wandering-mountain-a5y2uybi-pooler.us-east-2.aws.neon.tech/mock-interview?sslmode=require"
	}


})

  