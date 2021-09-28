module.exports = mongoose => {
    const Product = mongoose.model(
      "producto",
      mongoose.Schema(
        {
          nombre: String,
          descripcion: String,
          familia: String,
          precioVenta: Float32Array,
          precioCompra: Float32Array,
          IVA: Float32Array,
          EAN: String,
          alta: Boolean,
          tag: [String]
        },
        { timestamps: true }
      )
    );
  
    return Tutorial;
  };