import { boolean, integer, numeric, pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { tiendas } from "./tiendas";

export const productos = pgTable('productos', {
    id: uuid('id').primaryKey(),
    nombre: text('nombre').notNull(), // TODO: unique
    familia: text('familia').notNull(),
    iva: numeric('iva', { precision: 5, scale: 2 }).notNull(),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
});

export const productosEnTiendas = pgTable('productos_en_tiendas', {
    id: uuid('id').primaryKey(),
    precioCompra: numeric('precio_compra', { precision: 10, scale: 2 }).notNull(),
    precioVenta: numeric('precio_venta', { precision: 10, scale: 2 }).notNull(),
    cantidad: integer('cantidad').notNull().default(0),
    alta: boolean('alta').notNull().default(true),
    productoId: uuid('producto_id').notNull().references(() => productos.id),
    tiendaId: uuid('tienda_id').notNull().references(() => tiendas.id),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
});

export const codigosDeBarras = pgTable('codigos_de_barras', {
    codigo: text('codigo').notNull(), // TODO: unique
    productoId: uuid('producto_id').notNull().references(() => productos.id),
    cantidad: integer('cantidad').notNull().default(1),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
}, (table) => {
    return {
        pk: primaryKey(table.codigo, table.productoId)
    };
});

export const ofertas = pgTable('ofertas', {
    id: uuid('id').primaryKey(),
    nombre: text('nombre').notNull(), // TODO: unique
    descripcion: text('descripcion'),
    cantidadParaOferta: integer('cantidad_para_oferta').notNull(),
    precioOferta: numeric('precio_oferta', { precision: 10, scale: 2 }).notNull(),
    fechaInicio: timestamp('fecha_inicio', { precision: 6, withTimezone: true }).notNull(),
    fechaFin: timestamp('fecha_fin', { precision: 6, withTimezone: true }),
    productoTiendaId: uuid('producto_tienda_id').notNull().references(() => productosEnTiendas.id),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
});