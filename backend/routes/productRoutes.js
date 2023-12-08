import express from "express";
const router = express.Router();
// import products from '../data/products.js';
// import asyncHandler from '../middleware/asyncHandler.js';
// import Product from "../models/productModel.js";
//import products from '../data/products.js';
import {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.get('/top',getTopProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);
router.route("/:id/reviews").post(protect, createProductReview);

// router.get('/', asyncHandler(async (req, res)=>{
//     const products = await Product.find({});
//     res.json(products);

// }))

// router.get('/:id',asyncHandler( async (req, res)=>{
//     // const product = products.find((p)=> p._id === req.params.id);
//     const product = await Product.findById(req.params.id);
//     if(product){
//         res.json(product);
//     }
//     else{
//         res.status(404);
//         throw new Error('Resource not found');
//     }
//     // res.status(404).json({message: 'Product not found'});
// }))

export default router;
