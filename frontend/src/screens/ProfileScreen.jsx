import { useState, useEffect, act } from 'react';
import { Button, Table, Form, Row, Col } from 'react-bootstrap';
import { setCredentials } from '../slices/authSlice';
import { LinkContainer } from 'react-router-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useProfileMutation } from '../slices/usersApiSlice';
import { useGetUserOrdersQuery } from '../slices/ordersApiSlice';
const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);
    const [updateProfile, { isLoading: loadingProfileUpdate }] =
        useProfileMutation();

    const { data: orders, isLoading, error } = useGetUserOrdersQuery();
    useEffect(() => {
        console.log(orders);
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [orders, userInfo, userInfo.name, userInfo.password]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }

        try {
            console.log(name);
            const res = await updateProfile({
                _id: userInfo._id,
                name,
                email,
                password
            }).unwrap();

            dispatch(setCredentials(res));
            toast.success('Profile updated succefully');
        } catch (error) {
            toast.error(error?.data.message || error?.messages);
        }
    };

    return (
        <Row>
            {/* Profile details */}
            <Col md={3}>
                <Form onSubmit={submitHandler}>
                    {/* Name field */}
                    <Form.Group controlId="name" className="my-2">
                        <Form.Label>Name</Form.Label>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    </Form.Group>

                    {/* Email field */}
                    <Form.Group controlId="email" className="my-2">
                        <Form.Label>Email</Form.Label>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    </Form.Group>

                    {/* Password field */}
                    <Form.Group controlId="password" className="my-2">
                        <Form.Label>Password</Form.Label>
                        <Form.Group>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                    </Form.Group>

                    {/* Confirm Password field */}
                    <Form.Group controlId="confirmPassword" className="my-2">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Group>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password again"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            ></Form.Control>
                        </Form.Group>
                    </Form.Group>

                    <Button type="submit" variant="primary" className="my-2">
                        Update
                    </Button>
                </Form>
            </Col>

            {/* User orders */}
            <Col md={9}>
                <h2>My Orders</h2>
                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">
                        {error?.error?.message || error.error}
                    </Message>
                ) : (
                    <Table striped hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>
                                        {order.isPaid ? (
                                            order.paidAt.substring(0, 10)
                                        ) : (
                                            <FaTimes style={{ color: 'red' }} />
                                        )}
                                    </td>
                                    <td>
                                        {order.isDelivered ? (
                                            order.deliveredAt
                                        ) : (
                                            <FaTimes style={{ color: 'red' }} />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    );
};

export default ProfileScreen;
