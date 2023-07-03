import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const direcciones = pgTable('direcciones', {
    id: uuid('id').primaryKey(),
    calle: text('calle').notNull(),
    numero: text('numero').notNull(),
    piso: text('piso'),
    puerta: text('puerta'),
    codigoPostal: text('codigo_postal').notNull(),
    ciudad: text('ciudad').notNull(),
    provincia: text('provincia').notNull(),
    pais: text('pais').notNull(),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
});