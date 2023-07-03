import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { empresas } from "./empresas";
import { direcciones } from "./direcciones";

export const tiendas = pgTable('tiendas', {
    id: uuid('id').primaryKey(),
    nombre: text('nombre').notNull(), // TODO: unique
    empresaId: uuid('empresa_id').notNull().references(() => empresas.id),
    direccionId: uuid('direccion_id').notNull().references(() => direcciones.id),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
});