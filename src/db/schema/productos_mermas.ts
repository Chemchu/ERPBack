import { pgTable, uuid, timestamp, numeric, primaryKey } from "drizzle-orm/pg-core";
import { mermas } from "./mermas";
import { productosEnTiendas } from "./productos";

export const productos_mermas = pgTable('productos_mermas', {
    mermaId: uuid('merma_id').notNull().references(() => mermas.id),
    productoTiendaId: uuid('producto_tienda_id').notNull().references(() => productosEnTiendas.id),
    iva: numeric('iva', { precision: 5, scale: 2 }).notNull(),
    precioCompra: numeric('precio_compra', { precision: 10, scale: 2 }).notNull(),
    precioVenta: numeric('precio_venta', { precision: 10, scale: 2 }).notNull(),
    cantidad: numeric('cantidad', { precision: 10, scale: 2 }).notNull(),
    motivo: timestamp('motivo').notNull(),
}, (table) => {
    return {
        pk: primaryKey(table.mermaId, table.productoTiendaId)
    }
});