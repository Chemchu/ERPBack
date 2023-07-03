import { pgTable, uuid, timestamp, text } from "drizzle-orm/pg-core";
import { tiendas } from "./tiendas";
import { proveedores } from "./proveedores";

export const pedidos = pgTable('pedidos', {
    id: uuid('id').primaryKey(),
    numeroFactura: text('numero_factura').notNull(), // TODO: unique
    fechaPedido: timestamp('fecha_pedido', { precision: 6, withTimezone: true }).notNull(),
    fechaEntrega: timestamp('fecha_entrega', { precision: 6, withTimezone: true }).notNull(),
    estado: text('estado').notNull(),
    observaciones: text('observaciones'),
    proveedorId: uuid('proveedor_id').notNull().references(() => proveedores.id),
    tiendaId: uuid('tienda_id').notNull().references(() => tiendas.id),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
});