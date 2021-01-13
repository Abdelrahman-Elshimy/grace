const categoryModel = require('./../models/category.model');
const productModel = require('../models/products.model');

exports.getAllCategory = (req, res, next) => {
    categoryModel.getAllCategory().then((cats) => {
        res.render('admin/categories', {
            categories: cats,
            isAdmin: req.session.adminID
        })
    }).catch((err) => {
        res.redirect('/');
    })
}

exports.addNewCategory = (req, res, next) => {
    categoryModel.addNewCategory(req.body).then(() => {
        res.redirect('/custom/categories');
    }).catch((err) => {
        res.redirect('/custom/categories');
    });
}
exports.getProductsOfCategory = (req, res, next) => {
    productModel.getProductsOfCategory(req.params.id).then((products) => {
        res.render('admin/products', {
            products: products,
            isAdmin: req.session.adminID
        })
    }).catch(err => {
        log(err);
        res.redirect('/');
    })
}
