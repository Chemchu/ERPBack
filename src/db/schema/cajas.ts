import { pgTable, uuid, timestamp, text } from "drizzle-orm/pg-core";
import { tiendas } from "./tiendas";

export const cajas = pgTable('cajas', {
    id: uuid('id').primaryKey(),
    nombre: text('nombre').notNull(), // TODO: unique
    tiendaId: uuid('tienda_id').notNull().references(() => tiendas.id),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
});