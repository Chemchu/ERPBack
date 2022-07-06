"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCierreList = exports.CreateCierre = void 0;
const CreateCierre = (jsonData, empleado) => {
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
        };
    }
    const cierre = {
        tpv: jsonData.TPV,
        abiertoPor: empleado,
        cerradoPor: empleado,
        apertura: jsonData.APERTURA,
        cierre: jsonData.CIERRE,
        cajaInicial: jsonData.CAJA_INICIAL,
        numVentas: jsonData.NUMVENTAS,
        ventasEfectivo: jsonData.VENTAS_EFECTIVO,
        ventasTarjeta: jsonData.VENTAS_TARJETA,
        ventasTotales: jsonData.VENTAS_TOTALES,
        dineroEsperadoEnCaja: jsonData.DINERO_REAL_EN_CAJA,
        dineroRealEnCaja: jsonData.DINERO_REAL_EN_CAJA,
        dineroRetirado: jsonData.DINERO_RETIRADO,
        fondoDeCaja: jsonData.FONDO_DE_CAJA,
        beneficio: jsonData.BENEFICIO,
        nota: jsonData.NOTA || ""
    };
    return cierre;
};
exports.CreateCierre = CreateCierre;
const CreateCierreList = (jsonDataArray, empleado) => {
    let cierreList = [];
    for (var i = 0; i < jsonDataArray.length; i++) {
        const p = (0, exports.CreateCierre)(jsonDataArray[i], empleado);
        cierreList.push(p);
    }
    return cierreList;
};
exports.CreateCierreList = CreateCierreList;
