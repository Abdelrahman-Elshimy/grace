const productModel = require('./../models/products.model');
const categoryModel = require('../models/category.model');
const brandModel = require('../models/brand.model');

exports.getAllProducts = (req, res, next) => {
    productModel.getProducts().then((products) => {
        res.render('users/index', {
            isUser: req.session.userID,
            products: products
        })
    }).catch(err => {
        res.redirect('/');
    })
}

exports.addNewProduct = (req, res, next) => {
    let product = req.body;
    product.image = req.file.filename;
    productModel.addNewProuctOrUpdate(product).then(() => {
        res.redirect('/custom');
    }).catch((err) => {
        res.redirect('/custom/products');
    })

}

exports.getAllProductsToAdmin = (req, res, next) => {
    productModel.getProducts().then((products) => {
        res.render('admin/main', {
            isAdmin: req.session.adminID,
            products: products
        })
    }).catch(err => {
        log(err);
        res.redirect('/');
    })
}

exports.deleteProductPost = (req, res, next) => {
    productModel.deleteProduct(req.params.id).then((product) => {
        res.redirect('/custom');
    }).catch((err) => {
        res.redirect('/custom');
    })
}

exports.updateProductPost = (req, res, next) => {

    productModel.getProduct(req.params.id).then((product) => {
        categoryModel.getAllCategory().then((cats) => {
            res.render('admin/addProduct', {
                categories: cats,
                product: product,
                isAdmin: req.session.adminID
            });
        }).catch((err) => {
            res.redirect('/custom');
        });
    }).catch((err) => {
        res.redirect('/custom');
    });
}

exports.toAddProduct = (req, res, next) => {
    categoryModel.getAllCategory().then((cats) => {
        brandModel.getAllBrand().then((brands) => {
            res.render('admin/addProduct', {
                categories: cats,
                brands: brands,
                isAdmin: req.session.adminID
            });
        })
    }).catch((err) => {
        res.redirect('/');
    });

}