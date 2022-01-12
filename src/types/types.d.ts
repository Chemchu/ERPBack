export interface ProductoFind {
    find: {
        _id?: string
        nombre?: string
        ean?: string
    }
}

export interface ProductosFind {
    find?: {
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
    find?: {
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

export interface EmpleadoFind {
    find: {
        _id?: string
        nombre?: string
        dni?: string
    }
}

export interface EmpleadosFind {
    find?: {
        _id?: string
        nombre?: string
        dni?: string
        rol?: string
    }
    limit?: number
}

export interface ClienteFind {
    find: {
        _id?: string
        nombre?: string
        nif?: string
    }
}

export interface ClientesFind {
    find?: {
        _id?: string
        nombre?: string
        nif?: string
    }
    limit?: number
}