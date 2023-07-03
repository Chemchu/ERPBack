import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { empleados } from "./empleados";

export const empresas = pgTable('empresas', {
    id: uuid('id').primaryKey(),
    nombre: text('nombre').notNull(), // TODO: unique
    nif: text('nif').notNull(), // TODO: unique
    ceoId: uuid('ceo_id').notNull().references(() => empleados.id),
    fechaCreacion: timestamp('fecha_creacion', { precision: 6, withTimezone: true }).notNull(),
    razonSocial: text('razon_social').notNull(),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
});