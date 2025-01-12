import {
  boolean,
  integer,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createTable } from "../utils";
import { users } from "./auth";
import { sql } from "drizzle-orm";

export const tasks = createTable("task", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  createdById: varchar("created_by", { length: 255 })
    .notNull()
    .references(() => users.id),
  description: text("description"),
  isBlocked: boolean("is_blocked").default(false).notNull(),
  isDone: boolean("is_done").default(false).notNull(),
  isImportant: boolean("is_important"),
  isUrgent: boolean("is_urgent"),
  title: varchar("title", { length: 256 }).notNull(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  }).$onUpdate(() => new Date()),
  fake: integer("fake").default(0).notNull(),
});
