import {
    Badge,
    Navbar,
    Nav,
    Container,
    NavDropdown,
    Toast
} from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLoginMutation, useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../assets/logo.png';

const Header = () => {
    const { cartItems } = useSelector((state) => state.cart); //Access to the cart from store.js
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHadler = async (e) => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <header>
            {/* The expand and  */}
            <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
                <Container>
                    {/* Barnd - The company title to navigate to the home site*/}
                    <LinkContainer to="/">
                        <Navbar.Brand>
                            <img src={logo} alt="ProShop" />
                            ProShop
                        </Navbar.Brand>
                    </LinkContainer>
                    {/* Toggle - dropdown menu managed by the Collapse component */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <FaShoppingCart /> Cart
                                    {cartItems.length > 0 && (
                                        <Badge
                                            pill
                                            bg="success"
                                            style={{ marginLeft: '5px' }}
                                        >
                                            {cartItems.reduce(
                                                (a, c) => a + c.qty,
                                                0
                                            )}
                                        </Badge>
                                    )}
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown
                                    title={userInfo.name}
                                    id="username"
                                >
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHadler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link>
                                        <FaUser /> Sign In
                                    </Nav.Link>
                                </LinkContainer>
                            )}

                            {userInfo.isAdmin && (
                                <NavDropdown title="Admin">
                                    <LinkContainer to="/admin/orderlist">
                                        <NavDropdown.Item>
                                            Orders
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/userlist">
                                        <NavDropdown.Item>
                                            Users
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/prdocutlist">
                                        <NavDropdown.Item>
                                            Products
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
