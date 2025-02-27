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
        res.json(product);
        return;
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

// @desc	Update a product
// @route	PUT /api/products/:id
// @access	Private/admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    const updatedProduct = await product.save();
    res.status(202).json(updatedProduct);
});

// @desc	Delete a product
// @route	DELETE /api/products/:id
// @access	Private/admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: 'Product has been deleted' });
});

// @desc	Create a new review
// @route	POST /api/products/:id/reviews
// @access	Private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    console.log('id', req.params.id);
    const product = await Product.findById(req.params.id);

    //Check if the product exists
    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    //Check if the user already reviewed the product
    if (
        product.reviews.find(
            (review) => review.user.toString() === req.user._id.toString()
        )
    ) {
        res.status(400);
        throw new Error('Product already reviewd by you');
    }

    const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    //Calculate new product staring avg
    product.rating =
        product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        product.reviews.length;
    await product.save();

    res.status(201).json({ message: 'Review added' });
});
export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview
};
