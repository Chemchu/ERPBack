import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { direcciones } from "./direcciones";
import { emails, telefonos } from "./contactos";

export const empleados = pgTable('empleados', {
    id: uuid('id').primaryKey(),
    username: text('username').notNull(), // TODO: unique
    nombre: text('nombre').notNull(),
    apellidos: text('apellidos').notNull(),
    nif: text('nif').notNull(), // TODO: unique
    rol: text('rol').notNull(),
    descripcion: text('descripcion'),
    fechaNacimiento: timestamp('fecha_nacimiento', { precision: 6, withTimezone: true }).notNull(),
    fechaContratacion: timestamp('fecha_contratacion', { precision: 6, withTimezone: true }).notNull(),
    fechaBaja: timestamp('fecha_baja', { precision: 6, withTimezone: true }),
    emailId: uuid('email_id').notNull().references(() => emails.id), // TODO: unique
    telefonoId: uuid('telefono_id').references(() => telefonos.id), // TODO: unique
    direccionId: uuid('direccion_id').references(() => direcciones.id),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
});