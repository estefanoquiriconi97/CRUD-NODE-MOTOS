const path = require("path");
const fs = require("fs");
const { json } = require("express");

let motos = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../database/motos.json")));

module.exports = {
  index: (req, res) => {
    res.render('admin/administrar', { motos });
  },

  create: (req, res) =>{
    res.render('admin/create');
  }
};
