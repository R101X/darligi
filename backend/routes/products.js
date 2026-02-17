const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  getProduct, 
  createProduct, 
  updateProduct,
  approveProduct,
  deleteProduct,
  getMyProducts,
  getPendingProducts
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getProducts);
router.get('/my/products', protect, getMyProducts);
router.get('/pending', protect, admin, getPendingProducts);
router.get('/:id', getProduct);
router.post('/', protect, upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'file', maxCount: 1 }
]), createProduct);
router.put('/:id', protect, updateProduct);
router.put('/approve/:id', protect, admin, approveProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
