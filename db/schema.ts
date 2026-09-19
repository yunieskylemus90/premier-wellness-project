import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const contactRequests = sqliteTable("contact_requests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  preferredLanguage: text("preferred_language").notNull(),
  consent: integer("consent", { mode: "boolean" }).notNull(),
  source: text("source").notNull().default("website"),
  createdAt: text("created_at").notNull(),
});
