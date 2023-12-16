const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const { json } = require("express");

let motos = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../database/motos.json"))
);

module.exports = {
  index: (req, res) => {
    res.render("admin/administrar", { motos });
  },

  create: (req, res) => {
    res.render("admin/create");
  },

  store: (req, res) => {
    let nuevoProducto = {
      id: uuidv4(),
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      descuento: req.body.descuento,
      imagen: req.body.filename,
    };
    motos.push(nuevoProducto);
    let nuevoProductoGuardar = JSON.stringify(motos, null, 2);
    fs.writeFileSync(
      path.resolve(__dirname, "../database/motos.json"),
      nuevoProductoGuardar
    );
    res.redirect("/administrar");
  },

  update: (req, res) => {
    res.render("admin/edit");
  },

  detail: (req, res) => {

    let miMoto = motos.find(moto => moto.id == req.params.id);

    res.render("admin/detail", { miMoto });

  },

};
