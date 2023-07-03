import { pgTable, uuid, numeric, integer, primaryKey } from "drizzle-orm/pg-core";

export const productosPedidos = pgTable('productos_pedidos', {
    producto_id: uuid('producto_id').notNull(),
    pedido_id: uuid('pedido_id').notNull(),
    precio_compra: numeric('precio_compra', { precision: 10, scale: 2 }).notNull(),
    cantidad_pedida: integer('cantidad_pedida').notNull(),
    cantidad_recibida: integer('cantidad_recibida').notNull(),
}, (tables) => {
    return {
        pk: primaryKey(tables.producto_id, tables.pedido_id),
    }
});