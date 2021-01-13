const brandModel = require('./../models/brand.model');
const productModel = require('../models/products.model');

exports.getAllBrands = (req, res, next) => {
    brandModel.getAllBrand().then((brads) => {
        res.render('admin/brands', {
            brands: brads,
            isAdmin: req.session.adminID
        })
    }).catch((err) => {
        res.redirect('/');
    })
}

exports.addNewBrand = (req, res, next) => {
    console.log(req.body);
    brandModel.addNewBrand(req.body).then(() => {
        res.redirect('/custom/brands');
    }).catch((err) => {
        res.redirect('/custom/brands');
    });
}
exports.getProductsOfBrand = (req, res, next) => {
    productModel.getProductsOfBrand(req.params.id).then((products) => {
        res.render('admin/products', {
            products: products,
            isAdmin: req.session.adminID
        })
    }).catch(err => {
        log(err);
        res.redirect('/');
    })
}
