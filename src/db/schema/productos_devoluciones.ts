import { pgTable, uuid, text, integer } from "drizzle-orm/pg-core";
import { productosVentas } from "./productos_ventas";
import { devoluciones } from "./devoluciones";

export const productosDevoluciones = pgTable('productos_devoluciones', {
    id: uuid('id').primaryKey(),
    producto_venta_id: uuid('producto_venta_id').notNull().references(() => productosVentas.id),
    devolucion_id: uuid('devolucion_id').notNull().references(() => devoluciones.id),
    cantidad_producto_devuelto: integer('cantidad_producto_devuelto').notNull(),
    motivo: text('motivo').notNull().default('No especificado'),
});
