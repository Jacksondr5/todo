import { sql } from "drizzle-orm";
import { date, integer, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createTable } from "../utils";

export const bossConversations = createTable("boss_conversation", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  accomplishments: text("accomplishments"),
  challenges: text("challenges"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  createdById: varchar("created_by", { length: 255 }).notNull(),
  date: date("date").notNull(),
  notes: text("notes"),
  priorities: text("priorities"),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date()),
});
