export interface ProductoFind {
    find: {
        _id?: string
        nombre?: string
        ean?: string
    }
}

export interface ProductosFind {
    find: {
        _id?: string
        nombre?: string
        familia?: string
        proveedor?: string
    }
    limit?: number
}

export interface VentaFind {
    _id?: string
}

export interface VentasFind {
    find: {
        _id?: string
        clienteId?: string
        tipo?: string
        vendedorId?: string
        createdAt?: string
    }
    limit?: number
    order?: string
    offset?: number
}