"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCierreList = exports.CreateCierre = void 0;
const CreateCierre = (jsonData, empleado, tpvID) => {
    const horaApertura = new Date(jsonData.APERTURA + ":00");
    const horaCierre = new Date(jsonData.CIERRE);
    if (jsonData.CERRADO_POR) {
        return {
            tpv: tpvID,
            abiertoPor: jsonData.ABIERTO_POR || jsonData.abiertoPor,
            cerradoPor: jsonData.CERRADO_POR || jsonData.cerradoPor,
            apertura: horaApertura || jsonData.apertura,
            cierre: horaCierre || jsonData.cierre,
            cajaInicial: Number(jsonData.CAJA_INICIAL) || jsonData.cajaInicial,
            ventasEfectivo: Number(jsonData.VENTAS_EFECTIVO) || jsonData.ventasEfectivo,
            ventasTarjeta: Number(jsonData.VENTAS_TARJETA) || jsonData.ventasTarjeta,
            ventasTotales: Number(jsonData.VENTAS_TOTALES) || jsonData.ventasTotales,
            dineroEsperadoEnCaja: Number(jsonData.DINERO_ESPERADO_EN_CAJA) || jsonData.dineroEsperadoEnCaja,
            dineroRealEnCaja: Number(jsonData.DINERO_REAL_EN_CAJA) || jsonData.dineroRealEnCaja,
            dineroRetirado: Number(jsonData.DINERO_RETIRADO) || jsonData.dineroRetirado,
            fondoDeCaja: Number(jsonData.FONDO_DE_CAJA) || jsonData.fondoDeCaja,
            beneficio: Number(jsonData.BENEFICIO) || jsonData.beneficio,
            nota: jsonData.NOTA || "" || jsonData.nota,
        };
    }
    const cierre = {
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
    };
    return cierre;
};
exports.CreateCierre = CreateCierre;
const CreateCierreList = (jsonDataArray, empleado, tpvID) => {
    let cierreList = [];
    for (var i = 0; i < jsonDataArray.length; i++) {
        const p = (0, exports.CreateCierre)(jsonDataArray[i], empleado, tpvID);
        cierreList.push(p);
    }
    return cierreList;
};
exports.CreateCierreList = CreateCierreList;