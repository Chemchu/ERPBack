import { ObjectId } from "mongoose";
import { IEmployee } from "../types/Empleado";
import { ICierreTPV } from "../types/TPV";

export const CreateCierre = (jsonData: any, empleado: IEmployee & { _id: any; }, tpvID: ObjectId): ICierreTPV => {
    const horaApertura = new Date(jsonData.APERTURA + ":00");
    const horaCierre = new Date(jsonData.CIERRE);

    if (jsonData.CERRADO_POR) {
        return {
            tpv: tpvID,
            abiertoPor: jsonData.ABIERTO_POR,
            cerradoPor: jsonData.CERRADO_POR,
            apertura: horaApertura,
            cierre: horaCierre,
            cajaInicial: Number(jsonData.CAJA_INICIAL),
            ventasEfectivo: Number(jsonData.VENTAS_EFECTIVO),
            ventasTarjeta: Number(jsonData.VENTAS_TARJETA),
            ventasTotales: Number(jsonData.VENTAS_TOTALES),
            dineroEsperadoEnCaja: Number(jsonData.DINERO_ESPERADO_EN_CAJA),
            dineroRealEnCaja: Number(jsonData.DINERO_REAL_EN_CAJA),
            dineroRetirado: Number(jsonData.DINERO_RETIRADO),
            fondoDeCaja: Number(jsonData.FONDO_DE_CAJA),
            beneficio: Number(jsonData.BENEFICIO),
            nota: jsonData.NOTA || ""
        } as ICierreTPV;
    }

    const cierre: ICierreTPV = {
        tpv: tpvID,
        abiertoPor: empleado,
        cerradoPor: empleado,
        apertura: horaApertura,
        cierre: horaCierre,
        cajaInicial: Number(jsonData.CAJA_INICIAL),
        ventasEfectivo: Number(jsonData.VENTAS_EFECTIVO),
        ventasTarjeta: Number(jsonData.VENTAS_TARJETA),
        ventasTotales: Number(jsonData.VENTAS_TOTALES),
        dineroEsperadoEnCaja: Number(jsonData.DINERO_REAL_EN_CAJA),
        dineroRealEnCaja: Number(jsonData.DINERO_REAL_EN_CAJA),
        dineroRetirado: Number(jsonData.DINERO_RETIRADO),
        fondoDeCaja: Number(jsonData.FONDO_DE_CAJA),
        beneficio: Number(jsonData.BENEFICIO),
        nota: jsonData.NOTA || ""
    } as ICierreTPV;

    return cierre;
}

export const CreateCierreList = (jsonDataArray: any, empleado: IEmployee & { _id: any; }, tpvID: ObjectId): ICierreTPV[] => {
    let cierreList: ICierreTPV[] = [];
    for (var i = 0; i < jsonDataArray.length; i++) {
        const p = CreateCierre(jsonDataArray[i], empleado, tpvID);

        cierreList.push(p);
    }

    return cierreList;
}