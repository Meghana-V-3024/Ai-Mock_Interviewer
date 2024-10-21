import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  dbCredentials: {
    url: 'postgresql://neondb_owner:2g3HwtPXRnLE@ep-nameless-frog-a5wrxanz.us-east-2.aws.neon.tech/neondb?sslmode=require'
  }
});