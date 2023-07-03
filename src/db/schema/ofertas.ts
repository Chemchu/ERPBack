import { pgTable, uuid, text, integer, numeric, date, timestamp } from "drizzle-orm/pg-core";
import { productosEnTiendas } from "./productos";

export const ofertas = pgTable('ofertas', {
    id: uuid('id').primaryKey(),
    nombre: text('nombre').notNull(),
    descripcion: text('descripcion'),
    cantidadParaOferta: integer('cantidad_para_oferta').notNull(),
    precioOferta: numeric('precio_oferta', { precision: 10, scale: 2 }).notNull(),
    fechaInicio: date('fecha_inicio').notNull(),
    fechaFin: date('fecha_fin'),
    productoTiendaId: uuid('producto_tienda_id').notNull().references(() => productosEnTiendas.id),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
});