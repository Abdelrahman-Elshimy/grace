const router = require('express').Router();
const multer = require('multer');
const productController = require('../../controllers/products.controller');

router.get('/products', (rew, res, next) => {
    res.render('admin/addProduct');
});
router.post('/addproduct', multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'images');
        },
        filename: (req, file ,cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        }
    })
}).single('image'), productController.addNewProduct);

router.get('/deleteProduct/:id', productController.deleteProductPost);
router.get('/updateProduct/:id', productController.updateProductPost);

module.exports = router;