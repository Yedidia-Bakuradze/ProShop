import { Link, useNavigate } from 'react-router-dom';
import {
    Row,
    Col,
    ListGroup,
    Image,
    Form,
    Button,
    Card
} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return <div>CartScreen</div>;
};

export default CartScreen;
