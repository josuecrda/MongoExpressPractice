const express = require("express");
const app = express();
const path = require("path");
const Producto = require("./modelos/producto");

const methodOverride = require("method-override");

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


//SetUp ejs
app.set("views", path.join(__dirname, "vistas"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}))

app.use(methodOverride("_method"))

//Obtener datos de Mongo en render 
app.get("/productos", async (req, res) => {
    const productos = await Producto.find({})
    // console.log(productos)
    res.render("./index", { productos })
})


app.get("/productos/crear", (req, res) => {

    res.render("./crear")
})

app.post("/productos",  async (req, res ) => {
    const crearProducto = new Producto(req.body);
    await crearProducto.save();
    console.log(crearProducto)
    res.redirect(`/productos/${crearProducto.id}`)
    console.log(crearProducto.id)
})

app.get("/productos/:id", async (req, res) => {
    const { id } = req.params;
    const producto = await Producto.findById(id)
    console.log(producto);
    res.render("./busqueda", { producto })
})
//Hey


app.get("/productos/:id/editar", async (req, res) => {
    const { id } = req.params;
    const producto = await Producto.findById(id);
    res.render("./editar", { producto })
})

app.put("/productos/:id", async (req, res) => {
    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(id, req.body, {runValidators: true, new:true});

    console.log(req.body);
    console.log(id)
    res.redirect(`/productos/${producto._id}`);
})

app.delete("/productos/:id", async (req, res) => {
    const { id } = req.params;
    const eliminarProducto = await Producto.findByIdAndDelete(id);
    res.redirect("/productos");
})

// Catch URL invalida e inicialización del server express
app.use(function (req, res, next) {

    response = {
        error: true,
        codigo: 404,
        mensaje: "URL not found"
    };

    res.status(404).send(response);
});

//Respuesta Inicial Servidor Express
app.listen(3000, () => {
    console.log("El servidor se está inicializado en el puerto 3000");
});

