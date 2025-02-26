import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import { Button, Table, Row, Col, Fade } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { LinkContainer } from 'react-router-bootstrap';
import { useGetProductsQuery } from '../../slices/productsApiSlice';

const ProductListScreen = () => {
    const { data: products, isLoading, error } = useGetProductsQuery();

    const deleteHanlder = (productId) => {
        console.log('del', productId);
    };

    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-end">
                    <Button className="btn-sm m-3">
                        <FaEdit /> Add new product
                    </Button>
                </Col>
            </Row>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>In Stock</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.countInStock}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer
                                        to={`/admin/product/${product._id}/edit`}
                                    >
                                        <Button
                                            type="button"
                                            className="btn-sm mx-2"
                                            variant="light"
                                        >
                                            <FaEdit />
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        type="button"
                                        className="btn-sm mx-2"
                                        variant="danger"
                                        onClick={() =>
                                            deleteHanlder(product._id)
                                        }
                                    >
                                        <FaTrash style={{ color: 'white' }} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default ProductListScreen;
