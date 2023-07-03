import { pgTable, uuid, text, numeric, timestamp } from "drizzle-orm/pg-core";
import { empleados } from "./empleados";
import { clientes } from "./clientes";
import { cierres } from "./cierres";

export const ventas = pgTable('ventas', {
    id: uuid('id').primaryKey(),
    numeroFactura: text('numero_factura').notNull(), // TODO: unique
    empleadoId: uuid('empleado_id').notNull().references(() => empleados.id),
    clienteId: uuid('cliente_id').notNull().references(() => clientes.id),
    pagadoEfectivo: numeric('pagado_efectivo', { precision: 10, scale: 2 }).notNull(),
    pagadoTarjeta: numeric('pagado_tarjeta', { precision: 10, scale: 2 }).notNull(),
    cierreId: uuid('cierre_id').notNull().references(() => cierres.id),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
});