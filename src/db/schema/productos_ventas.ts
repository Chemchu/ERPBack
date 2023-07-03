import { pgTable, uuid, numeric } from "drizzle-orm/pg-core";
import { productosEnTiendas } from "./productos";
import { ventas } from "./ventas";

export const productosVentas = pgTable('productos_ventas', {
    id: uuid('id').primaryKey(),
    producto_tienda_id: uuid('producto_tienda_id').notNull().references(() => productosEnTiendas.id),
    venta_id: uuid('venta_id').notNull().references(() => ventas.id),
    cantidad_vendida: numeric('cantidad_vendida', { precision: 10, scale: 2 }).notNull(),
    iva: numeric('iva', { precision: 5, scale: 2 }).notNull(),
    precio_compra: numeric('precio_compra', { precision: 10, scale: 2 }).notNull(),
    precio_venta: numeric('precio_venta', { precision: 10, scale: 2 }).notNull(),
    descuento: numeric('descuento', { precision: 10, scale: 2 }).notNull().default('0'),
});
