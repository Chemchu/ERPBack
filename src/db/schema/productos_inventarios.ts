import { pgTable, uuid, timestamp, integer, primaryKey } from "drizzle-orm/pg-core";
import { productosEnTiendas } from "./productos";
import { inventarios } from "./inventarios";

// Agregar valores de precios para tener un valor de coste y un valor de venta para cada producto en cada tienda en el momento de hacer el inventario
export const productosInventarios = pgTable('productos_inventarios', {
    productoTiendaId: uuid('producto_tienda_id').notNull().references(() => productosEnTiendas.id),
    inventarioId: uuid('inventario_id').notNull().references(() => inventarios.id),
    cantidadTeorica: integer('cantidad_teorica').notNull(),
    cantidadReal: integer('cantidad_real').notNull(),
    empleadoId: uuid('empleado_id').notNull(),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
}, (table) => {
    return {
        pk: primaryKey(table.productoTiendaId, table.inventarioId)
    }
});
