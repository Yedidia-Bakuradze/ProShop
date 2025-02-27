import { FaEdit, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { Button, Table, Row, Col } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { LinkContainer } from 'react-router-bootstrap';
import {
    useGetProductsQuery,
    useCreateProductMutation,
    useDeleteProductMutation
} from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';
import Paginate from '../../components/Paginate';

const ProductListScreen = () => {
    const { pageNumber } = useParams();
    const { data, isLoading, error, refetch } = useGetProductsQuery({
        pageNumber
    });

    const [createProduct, { isLoading: loadingCreateProduct }] =
        useCreateProductMutation();

    const [deleteProduct, { isLoading: loadingProductDelete }] =
        useDeleteProductMutation();

    const deleteHanlder = async (productId) => {
        if (window.confirm('Are you sure?')) {
            try {
                await deleteProduct(productId);
                refetch();
                toast.success('Product been deleted');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    const createProductHandler = async () => {
        if (window.confirm('Adding new empty product, Are you sure?')) {
            try {
                await createProduct();
                refetch();
                toast.success('New product was added');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-end">
                    <Button
                        className="btn-sm m-3"
                        onClick={createProductHandler}
                    >
                        <FaEdit /> Add new product
                    </Button>
                </Col>
            </Row>

            {loadingCreateProduct && <Loader />}
            {loadingProductDelete && <Loader />}

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
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
                            {data.products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
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
                                            <FaTrash
                                                style={{ color: 'white' }}
                                            />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate
                        pages={data.pages}
                        page={data.page}
                        isAdmin={true}
                    />
                </>
            )}
        </>
    );
};

export default ProductListScreen;
