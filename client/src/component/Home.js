import React, { useEffect } from 'react';
import { fetchAllUser, deleteUser } from '../redux/api/userAPI';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

const Home = () => {
    const dispatch = useDispatch();
    const dataUser = useSelector(state => state.user);
    const userInfor = dataUser.data;

    // fetch all users
    useEffect(() => {
        dispatch(fetchAllUser());
    }, [dispatch]);

    const hanldeDelete = (id) => {
        dispatch(deleteUser(id));
    };

    return (
        <div className="container">
            <h2 className="my-4">User List</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Password</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userInfor?.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.password}</td>
                            <td>
                                <Button variant="danger" className="me-2" onClick={() => hanldeDelete(item.id)}>Delete</Button>
                                <Button variant="info">Edit</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Home;
