import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContatiner from '../../components/FormContatiner';
import { toast } from 'react-toastify';
import {
    useGetProductDetailsQuery,
    useUpdateProductMutation,
    useUploadProductImageMutation
} from '../../slices/productsApiSlice';

const ProductEditScreen = () => {
    const { id: productId } = useParams();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const {
        data: product,
        isLoading,
        error
    } = useGetProductDetailsQuery(productId);

    const [updateProduct, { isLoading: loadingUpdate }] =
        useUpdateProductMutation();

    const [uploadProductImage, { isLoading: loadingProductImage }] =
        useUploadProductImageMutation();
    const navigate = useNavigate();

    //Screen initializer - data init
    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [product]);

    //Submit product details changes
    const submitHandler = async (e) => {
        e.preventDefault();
        const updatedProduct = {
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        };

        const res = await updateProduct(updatedProduct);
        if (!res) {
            toast.error(res.error);
            return;
        }

        toast.success('Product details been modfied');
        navigate(`/admin/productlist`);
    };

    //Image uploader
    const uploadImageHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);

        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <>
            <Link to={`/admin/productlist`} className="btn btn-light my-3">
                Go Back
            </Link>

            <FormContatiner>
                <h2>Edit Product</h2>

                {loadingUpdate && <Loader />}

                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="name"
                                value={name}
                                placeholder="Enter product's name"
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="price" className="my-2">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                value={price}
                                placeholder="Enter product's price"
                                onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="image" className="my-2">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product's image URL"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></Form.Control>
                            <Form.Control
                                type="file"
                                Label="Choose a file"
                                onChange={uploadImageHandler}
                            ></Form.Control>
                        </Form.Group>
                        {loadingProductImage && <Loader />}

                        <Form.Group controlId="brand" className="my-2">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type="name"
                                value={brand}
                                placeholder="Enter product's brand"
                                onChange={(e) => setBrand(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="category" className="my-2">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="name"
                                value={category}
                                placeholder="Enter product's category"
                                onChange={(e) => setCategory(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="countInStock" className="my-2">
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control
                                type="number"
                                value={countInStock}
                                placeholder="Enter product's count in stock"
                                onChange={(e) =>
                                    setCountInStock(e.target.value)
                                }
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="description" className="my-2">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                value={description}
                                placeholder="Enter product's description"
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Button
                            type="submit"
                            variant="primary"
                            className="my-2"
                        >
                            Update
                        </Button>
                    </Form>
                )}
            </FormContatiner>
        </>
    );
};

export default ProductEditScreen;
