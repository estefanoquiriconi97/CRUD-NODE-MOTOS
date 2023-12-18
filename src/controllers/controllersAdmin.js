const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
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
      imagen: req.file.filename,
    };
    motos.push(nuevoProducto);
    let nuevoProductoGuardar = JSON.stringify(motos, null, 2);
    fs.writeFileSync(
      path.resolve(__dirname, "../database/motos.json"),
      nuevoProductoGuardar
    );
    res.redirect("/administrar");
  },

  edit: (req, res) => {
    let motoId = req.params.id;
    let motoEditar = motos.find((moto) => moto.id == motoId);
    res.render("admin/edit", { motoEditar });
  },

  detail: (req, res) => {
    let miMoto = motos.find((moto) => moto.id == req.params.id);
    res.render("admin/detail", { miMoto });
  },

  update: (req, res) => {
    req.body.id = req.params.id;
    req.body.imagen = req.file ? req.file.filename : req.body.oldImagen;
    let motosUpdate = motos.map((moto) => {
      if (moto.id == req.body.id) {
        return (moto = req.body);
      }
      return moto;
    });
    let motoActualizar = JSON.stringify(motosUpdate, null, " ");
    fs.writeFileSync(
      path.resolve(__dirname, "../database/motos.json"),
      motoActualizar
    );
    res.redirect("/administrar");
  },

  destroy: (req, res) => {
    const motoDeleteId = req.params.id;
    let motosFinal = motos.filter((moto) => moto.id != motoDeleteId);
    console.log(motosFinal);
    let motosGuardar = JSON.stringify(motosFinal, null, ' ');
    fs.writeFileSync(path.resolve(__dirname, '../database/motos.json'), motosGuardar);
    res.redirect("/administrar");
  }
};
