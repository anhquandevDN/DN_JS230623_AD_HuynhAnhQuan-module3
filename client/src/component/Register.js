import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RegisterUser } from '../redux/api/userAPI';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const inputFullNameRef = useRef();
    const inputPsdRef = useRef();
    const inputEmailRef = useRef();
    const inputRePsdRef = useRef();
    const initialValues = { fullname: "", email: "", password: "", repassword: "" };
    const [formValues, setFormValues] = useState(initialValues);

    // lưu các thay đổi khi nhập input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    // submit form đăng ký
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            fullname: inputFullNameRef.current.value,
            email: inputEmailRef.current.value,
            password: inputPsdRef.current.value,
            repassword: inputRePsdRef.current.value,
        };
        dispatch(RegisterUser(user)).then(() => {
            navigate('/login');
        });
    };

    return (
        <div className='form-register' style={{ width: '40%', position: 'absolute', left: '30%', top: '10%' }}>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" ref={inputEmailRef} onChange={handleChange} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name="fullname" ref={inputFullNameRef} onChange={handleChange} />
                    <Form.Text className="text-muted">
                        Your name here
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" ref={inputPsdRef} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicRePassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm password" name="repassword" ref={inputRePsdRef} onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Register
                </Button>
            </Form>
        </div>
    );
};

export default Register;
