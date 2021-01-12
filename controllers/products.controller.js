const productModel = require('./../models/products.model');

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
   productModel.addNewProuctOrUpdate(product).then(()=> {
       res.redirect('/custom');
   }).catch((err) => {
    res.redirect('/custom/products');
   })

}

exports.getAllProductsToAdmin = (req, res, next) => {
    productModel.getProducts().then((products) => {
        res.render('admin/main', {
            isUser: req.session.userID,
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

exports.updateProductPost  = (req, res, next) => {
    productModel.getProduct(req.params.id).then((product) => {
        res.render('admin/addProduct', {
            product: product,
        });
    }).catch((err) => {
        res.redirect('/custom');
    });
}