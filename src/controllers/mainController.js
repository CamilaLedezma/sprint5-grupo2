const fs = require('fs');
const path = require('path');

// ESTO SERIA EL GESTOR DEL MODELO

const jsonDB = require('../model/jsonDatabase');

// Maneja todos los métodos para PRODUCTO, que lo pasa como parámetro
const productModel = jsonDB('products');


const mainController= {
    index : (req, res)=>{
        const products=productModel.all()
        res.render('products/index',{products});
    },
    show : (req,res)=>{
        const products=productModel.all()
        res.render('products/productsAdmin',{products})
    }
}
module.exports = mainController;