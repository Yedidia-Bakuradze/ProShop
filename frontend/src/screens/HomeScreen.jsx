import { Row, Col, Pagination } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
const HomeScreen = () => {
    const { pageNumber } = useParams();
    const { data, isLoading, error } = useGetProductsQuery({ pageNumber });

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <>
                    <h1> Latests Products</h1>
                    <Row>
                        {data.products.map((product) => (
                            <Col sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>

                    <Paginate page={data.page} pages={data.pages} />
                </>
            )}
        </>
    );
};

export default HomeScreen;
