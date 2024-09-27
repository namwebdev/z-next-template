import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  notification_json: text("notification_json").notNull(),
});
