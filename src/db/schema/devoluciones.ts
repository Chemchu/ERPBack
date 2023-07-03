import { pgTable, uuid, timestamp } from "drizzle-orm/pg-core";
import { clientes } from "./clientes";
import { empleados } from "./empleados";

export const devoluciones = pgTable('devoluciones', {
    id: uuid('id').primaryKey(),
    empleado_id: uuid('empleado_id').notNull().references(() => empleados.id),
    cliente_id: uuid('cliente_id').notNull().references(() => clientes.id),
    created_at: timestamp('created_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
    updated_at: timestamp('updated_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
});