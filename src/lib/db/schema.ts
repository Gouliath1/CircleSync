import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email"),
  location: text("location"),
  familyType: text("family_type", { enum: ["solo", "couple", "family"] })
    .notNull()
    .default("solo"),
  notes: text("notes"),
  isAdmin: integer("is_admin", { mode: "boolean" }).notNull().default(false),
  inviteToken: text("invite_token").unique(),
  createdAt: text("created_at").default(sql`(current_timestamp)`),
});

export const groups = sqliteTable("groups", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: text("created_at").default(sql`(current_timestamp)`),
});

export const groupMembers = sqliteTable("group_members", {
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  groupId: integer("group_id")
    .notNull()
    .references(() => groups.id, { onDelete: "cascade" }),
});

export const availability = sqliteTable("availability", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  date: text("date").notNull(), // YYYY-MM-DD
  timeBlock: text("time_block", {
    enum: ["morning", "afternoon", "evening", "full_day"],
  }).notNull(),
  familyContext: text("family_context", {
    enum: ["solo", "couple", "family"],
  }).notNull().default("solo"),
  status: text("status", {
    enum: ["available", "unavailable", "partial"],
  }).notNull(),
  comment: text("comment"),
  updatedAt: text("updated_at").default(sql`(current_timestamp)`),
});

export const events = sqliteTable("events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  date: text("date"), // YYYY-MM-DD, optional for open requests
  createdBy: integer("created_by").references(() => users.id),
  createdAt: text("created_at").default(sql`(current_timestamp)`),
});

export const eventParticipants = sqliteTable("event_participants", {
  eventId: integer("event_id")
    .notNull()
    .references(() => events.id, { onDelete: "cascade" }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  response: text("response", {
    enum: ["yes", "no", "maybe", "partial", "pending"],
  }).notNull().default("pending"),
});
