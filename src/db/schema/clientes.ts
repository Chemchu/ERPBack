import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { direcciones } from "./direcciones";
import { emails } from "./contactos";

export const clientes = pgTable('clientes', {
    id: uuid('id').primaryKey(),
    nombre: text('nombre').notNull(),
    apellidos: text('apellidos').notNull(),
    nif: text('nif').notNull(), // TODO: unique
    direccionId: uuid('direccion_id').notNull().references(() => direcciones.id),
    emailId: uuid('email_id').notNull().references(() => emails.id), // TODO: unique
    telefonoId: uuid('telefono_id').notNull().references(() => emails.id), // TODO: unique
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
});
