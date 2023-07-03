import { pgTable, uuid, timestamp, text } from "drizzle-orm/pg-core";

export const emails = pgTable('emails', {
    id: uuid('id').primaryKey(),
    email: text('email').notNull(), // TODO: unique
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
});

export const telefonos = pgTable('telefonos', {
    id: uuid('id').primaryKey(),
    prefijo: text('prefijo').notNull(),
    telefono: text('telefono').notNull(), // TODO: unique
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
});