const Producto = require("./modelos/producto");

//Mongo Conexión
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/super')

    .then(() => {
        console.log("Conexión con Mongo Realizada!")
    })

    .catch(err => {
        console.log("Algo salió mal con respecto a Mongo")
        console.log(err)
    })

const generarProductos = [


    {
        nombre: "Naranjas",
        precio: 13.50,
        categoria: "fruta"
    },

    {
        nombre: "Tomates",
        precio: 18.20,
        categoria: "vegetal"
    },

    {
        nombre: "Cebolla",
        precio: 7.30,
        categoria: "vegetal"
    },

    {
        nombre: "queso",
        precio: 25.50,
        categoria: "lacteos"
    },
    {
        nombre: "Yogurt",
        precio: 30.50,
        categoria: "lacteos"
    },

]

Producto.insertMany(generarProductos)
.then(res => {
    console.log(res)
})
.catch(e => {
    console.log(e)
})

/*
    const item = new Producto ({

        nombre: "Uvas moradas",
        precio: 20,
        categoria: "fruta"
        
    })

    item.save().then(p => { 
        console.log(item)
    })
        .catch(e => {
            console.log(err)
        })

        */