import { pgTable, uuid, numeric, timestamp, boolean } from "drizzle-orm/pg-core";
import { cajas } from "./cajas";

export const cierres = pgTable('cierres', {
    id: uuid('id').primaryKey(),
    dineroIncial: numeric('dinero_inicial', { precision: 10, scale: 2 }).notNull(),
    dineroReal: numeric('dinero_real', { precision: 10, scale: 2 }).notNull(),
    dineroRetirado: numeric('dinero_retirado', { precision: 10, scale: 2 }).notNull(),
    dineroDejadoEnCaja: numeric('dinero_dejado_en_caja', { precision: 10, scale: 2 }).notNull(),
    fechaApertura: timestamp('fecha_apertura', { precision: 6, withTimezone: true }).notNull(),
    fechaCierre: timestamp('fecha_cierre', { precision: 6, withTimezone: true }).notNull(),
    enUso: boolean('en_uso').notNull().default(true),
    cajaId: uuid('caja_id').notNull().references(() => cajas.id),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
});