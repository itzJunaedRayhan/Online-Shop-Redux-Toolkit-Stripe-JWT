import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items : [],
    status: null,
    error : null
};

export const productsFetch = createAsyncThunk(
    "products/productsFetch",
    async (id = null, {rejectWithValue}) => {
       try {
        const response = await axios.get("http://localhost:5000/products");
        return response?.data
       }catch(error) {
        return rejectWithValue("An Error Occured!");
       }
    }
)

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: {
        [productsFetch.pending] : (state, action) => {
            //  immer
            state.status = "pending";
        },
        [productsFetch.fulfilled] : (state, action) => {
            //  immer
            state.status = "success";
            state.items  = action.payload
        },
        [productsFetch.rejected] : (state, action) => {
            //  immer
            state.status = "rejected";
            state.error  = action.payload;
        },
    }
});

export default productsSlice.reducer;