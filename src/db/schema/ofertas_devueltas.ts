import { pgTable, uuid, integer, text } from "drizzle-orm/pg-core";
import { devoluciones } from "./devoluciones";
import { ofertas } from "./productos";

export const ofertasDevueltas = pgTable('ofertas_devueltas', {
    id: uuid('id').primaryKey(),
    oferta_venta_id: uuid('oferta_venta_id').notNull().references(() => ofertas.id),
    devolucion_id: uuid('devolucion_id').notNull().references(() => devoluciones.id),
    cantidad_ofertas_devueltas: integer('cantidad_ofertas_devueltas').notNull(),
    motivo: text('motivo').notNull().default('No especificado'),
});