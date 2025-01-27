import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import FormContatiner from '../components/FormContatiner';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Retrive user's data if there is any in the local storgae
    const [login, { isLoading }] = useLoginMutation();
    const { userInfo } = useSelector((state) => state.auth);

    //Check if there is any redirection to other page
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    //Redirection action
    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await login({ email, password }).unwrap(); //The unwrap would extract the data from the Promise
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (err) {
            console.log(err.data);
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <FormContatiner>
            <h1>Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email" className="my-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="Password" className="my-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button
                    type="submit"
                    variant="primary"
                    className="mt-2"
                    disabled={isLoading}
                >
                    Sign In
                </Button>
                {isLoading && <Loader />}
            </Form>
            <Row className="py-3">
                <Col>
                    New Customer?{' '}
                    <Link
                        to={
                            redirect !== '/'
                                ? `/register?redirect=${redirect}`
                                : `/register`
                        }
                    >
                        Register Now
                    </Link>
                </Col>
            </Row>
        </FormContatiner>
    );
};

export default LoginScreen;
