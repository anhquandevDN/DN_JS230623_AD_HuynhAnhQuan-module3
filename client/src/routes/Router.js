import React from 'react';
import { Routes, Route, Outlet } from "react-router-dom";
import Home from './../component/Home';
import Login from './../component/Login';
import Register from './../component/Register';


const Router = () => {
    return (
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Register' element={<Register/>}/>
       </Routes>
    );
};

export default Router;