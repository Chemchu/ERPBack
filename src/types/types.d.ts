export interface ProductoFind {
    find: {
        _id?: string
        nombre?: string
        ean?: string
    }
}

export interface ProductosFind {
    find?: {
        _ids?: string[]
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
        _ids?: string[]
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
        _ids?: string[]
        nombre?: string
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
        _ids?: string[]
        nombre?: string
    }
    limit?: number
}

export interface Credentials {
    loginValues: {
        email: string
        password: string
    }
}

export interface TPVFind {
    find: {
        _id?: ID!
        nombre?: string
    }
}
export interface TPVsFind {
    find?: {
        libre: boolean
    }
}


