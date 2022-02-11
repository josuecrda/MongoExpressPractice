const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema ({

    nombre: {
        type: String,
        Required: true
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    categoria: {
        type: String,
        lowercase: true,
        enum: ["fruta", "vegetal", "lacteos" ]
    }
})

const Producto= mongoose.model("Producto", productoSchema);

module.exports= Producto;