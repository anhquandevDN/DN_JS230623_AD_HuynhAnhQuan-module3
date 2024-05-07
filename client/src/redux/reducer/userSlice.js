import { createSlice } from "@reduxjs/toolkit";
import { fetchAllUser, loginUser, RegisterUser, updateProduct, deleteUser } from "./../api/userAPI";

const userSlice = createSlice({
    name:'users',
    initialState:{
        data:[],
        user:[],
        userLogin:[],
        isLoading: false,
        isSuccess:false,
        errorMessage:''
    },
    reducers:{},
    extraReducers:(builder) => {
        builder
        // fetching user data from database
        .addCase(fetchAllUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload
        })
        .addCase(fetchAllUser.pending,(state,action)=>{
            state.isLoading = true;
        })
        .addCase(fetchAllUser.rejected,(state,action)=>{
            state.errorMessage = action.payload
        })

        // delete user from database
        .addCase(deleteUser.fulfilled,(state,action)=>{
            state.isSuccess = true;
            state.isLoading = false;
            state.data = action.payload
        })
        .addCase(deleteUser.pending,(state,action)=>{
            state.isLoading = true;
        })
        .addCase(deleteUser.rejected,(state,action)=>{
            state.isSuccess = false;
            state.errorMessage = 'error'
        })
        
        // User register
        .addCase(RegisterUser.fulfilled,(state,action)=>{
            state.data = action.payload;
            state.isSuccess = true;
        })
        .addCase(RegisterUser.pending,(state,action)=>{
            state.isLoading = true;
        })
        .addCase(RegisterUser.rejected,(state,action)=>{
            state.errorMessage = action.payload
        })
        // User Login
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.userLogin = action.payload;
            state.isSuccess = true;
        })
        .addCase(loginUser.pending,(state,action)=>{
            state.isLoading = true;
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.errorMessage = action.payload
        })
        // update user
        .addCase(updateProduct.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload
        })
        .addCase(updateProduct.pending,(state,action)=>{
            state.isLoading = true;
        })
        .addCase(updateProduct.rejected,(state,action)=>{
            state.errorMessage = action.payload
        })
    }
});
const {reducer} = userSlice;
export default reducer;