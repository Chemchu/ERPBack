import { pgTable, uuid, integer, numeric, timestamp } from "drizzle-orm/pg-core";
import { productosEnTiendas, ofertas } from "./productos";
import { ventas } from "./ventas";

export const ofertasVentas = pgTable('ofertas_ventas', {
    id: uuid('id').primaryKey(),
    producto_tienda_id: uuid('producto_tienda_id').notNull().references(() => productosEnTiendas.id),
    venta_id: uuid('venta_id').notNull().references(() => ventas.id),
    oferta_id: uuid('oferta_id').notNull().references(() => ofertas.id),
    cantidad_de_ofertas_aplicadas: integer('cantidad_de_ofertas_aplicadas').notNull(),
    cantidad_producto_por_oferta: integer('cantidad_producto_por_oferta').notNull(),
    precio_por_oferta: numeric('precio_por_oferta', { precision: 10, scale: 2 }).notNull(),
    iva: numeric('iva', { precision: 5, scale: 2 }).notNull(),
    precio_compra: numeric('precio_compra', { precision: 10, scale: 2 }).notNull(),
    precio_venta: numeric('precio_venta', { precision: 10, scale: 2 }).notNull(),
    fecha_inicio: timestamp('created_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
    fecha_fin: timestamp('updated_at', { precision: 6, withTimezone: true })
});