import { pgTable, uuid, timestamp, text } from "drizzle-orm/pg-core";
import { emails, telefonos } from "./contactos";
import { direcciones } from "./direcciones";

export const proveedores = pgTable('proveedores', {
    id: uuid('id').primaryKey(),
    nombre: text('nombre').notNull(),
    nif: text('nif').notNull(), // TODO: unique
    emailId: uuid('email_id').references(() => emails.id), // TODO: unique
    telefonoId: uuid('telefono_id').references(() => telefonos.id), // TODO: unique
    direccionId: uuid('direccion_id').references(() => direcciones.id),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
});