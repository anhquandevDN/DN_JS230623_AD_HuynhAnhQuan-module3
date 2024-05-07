import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUser, loginUser } from '../redux/api/userAPI';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inputPsdRef = useRef();
    const inputusernameRef = useRef();
    const dataUser = useSelector(state => state.user);

    useEffect(() => {
        dispatch(fetchAllUser());
    }, [dispatch]);

    // khởi tạo các giá trị input ban đầu
    const initialValues = { username: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);

    // thay đổi khi nhập input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    // submit form đăng nhập
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(loginUser(formValues)).then((result) => {
            if (result.payload) {
                navigate('/');
            }
        });
    };

    return (
        <div className='login-form' style={{ width: '40%', position: 'absolute', left: '30%', top: '10%' }}>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" ref={inputusernameRef} name="username" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" ref={inputPsdRef} onChange={handleChange} />
                    <Form.Text className="text-muted">
                        We'll never share your password with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Đăng nhập
                </Button>
            </Form>
        </div>
    );
};

export default Login;
