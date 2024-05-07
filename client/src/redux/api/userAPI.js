import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";
import { URL_API } from '../../config';

// API lấy thôn tin user
export const fetchAllUser = createAsyncThunk(
    'userList/fetchAll',
    async (thunkAPI) => {
        const response = await axios.get(URL_API  + '/api/V1/getUser')
        return response.data;
    }
);
// API Đăng nhập
export const loginUser = createAsyncThunk(
    'login/loginUser',
    async(user, thunkAPI) => {
        const response = await axios.post(URL_API + '/api/v1/login', user)
        localStorage.setItem('user', JSON.stringify(response))
        console.log("loginuser",response.data);
        return response.data
    }
);

// API Đăng ký
export const RegisterUser = createAsyncThunk(
    'reister/register',
    async(user, thunkAPI) => {
        const response = await axios.post(URL_API+ '/api/v1/register', user)
        return response.data
    }
)
// API cập nhật user
export const updateProduct = createAsyncThunk(
    'user/userUpdate',
    async(user,thunkAPI,id) => {
        const response = await axios.put(URL_API + `/api/v1/update/${id}`, user)
        return response.data
    }
)
// API xóa user
export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async(id, thunkAPI)=>{
        const response = await axios.delete(URL_API+ '/api/v1/delete'+id)
    }
)
