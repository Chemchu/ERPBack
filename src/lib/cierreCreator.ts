import { IEmployee } from "../types/Empleado";
import { ICierreTPV } from "../types/TPV";

export const CreateCierre = (jsonData: any, empleado: IEmployee & { _id: any; }): ICierreTPV => {
    if (jsonData.CERRADO_POR) {
        return {
            tpv: jsonData.TPV,
            abiertoPor: jsonData.ABIERTO_POR,
            cerradoPor: jsonData.CERRADO_POR,
            apertura: jsonData.APERTURA,
            cierre: jsonData.CIERRE,
            cajaInicial: jsonData.CAJA_INICIAL,
            numVentas: jsonData.NUMVENTAS,
            ventasEfectivo: jsonData.VENTAS_EFECTIVO,
            ventasTarjeta: jsonData.VENTAS_TARJETA,
            ventasTotales: jsonData.VENTAS_TOTALES,
            dineroEsperadoEnCaja: jsonData.DINERO_ESPERADO_EN_CAJA,
            dineroRealEnCaja: jsonData.DINERO_REAL_EN_CAJA,
            dineroRetirado: jsonData.DINERO_RETIRADO,
            fondoDeCaja: jsonData.FONDO_DE_CAJA,
            beneficio: jsonData.BENEFICIO,
            nota: jsonData.NOTA
        } as ICierreTPV;
    }

    const cierre: ICierreTPV = {
        tpv: jsonData.TPV,
        abiertoPor: empleado,
        cerradoPor: empleado,
        apertura: jsonData.APERTURA,
        cierre: jsonData.CIERRE,
        cajaInicial: jsonData.CAJA_INICIAL,
        numVentas: jsonData.NUMVENTAS, // ** Añadir al CSV
        ventasEfectivo: jsonData.VENTAS_EFECTIVO,
        ventasTarjeta: jsonData.VENTAS_TARJETA,
        ventasTotales: jsonData.VENTAS_TOTALES,
        dineroEsperadoEnCaja: jsonData.DINERO_REAL_EN_CAJA,
        dineroRealEnCaja: jsonData.DINERO_REAL_EN_CAJA,
        dineroRetirado: jsonData.DINERO_RETIRADO,
        fondoDeCaja: jsonData.FONDO_DE_CAJA,
        beneficio: jsonData.BENEFICIO,
        nota: jsonData.NOTA || ""
    } as ICierreTPV;

    return cierre;
}

export const CreateCierreList = (jsonDataArray: any, empleado: IEmployee & { _id: any; }): ICierreTPV[] => {
    let cierreList: ICierreTPV[] = [];
    for (var i = 0; i < jsonDataArray.length; i++) {
        const p = CreateCierre(jsonDataArray[i], empleado);

        cierreList.push(p);
    }

    return cierreList;
}