//Handels the logics
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc	Fetch all products
// @route	GET /api/products
// @access	Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// @desc	Fetch a product
// @route	GET /api/products/:id
// @access	Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        console.log(product);
        res.json(product);
    }
    res.status(404);
    throw new Error('Resource not found');
});

// @desc	Create new product
// @route	POST /api/products
// @access	Private/admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Demo Name',
        price: 0,
        brand: 'Demo Brand',
        category: 'Demo Category',
        user: req.user._id,
        image: '/images/sample.jpg',
        countInStock: 0,
        numReviews: 0,
        description: 'Demo Description'
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

export { getProducts, getProductById, createProduct };
