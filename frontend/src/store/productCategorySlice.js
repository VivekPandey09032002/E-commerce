import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import { STATUS } from '../utils/status'

const initialState = {
    data : [],
    status : 'idle',
}

const productCategoriesSlice = createSlice({
    name : 'productCategories',
    initialState,
    reducers : {
    },
    extraReducers : (builder) => {
        builder
        .addCase(fetchProductCategories.pending,(state,action)=> {
            state.status = STATUS.LOADING
        })
        .addCase(fetchProductCategories.fulfilled,(state,action)=>{
            state.data = action.payload
            state.status = STATUS.IDLE
        })
        .addCase(fetchProductCategories.rejected,(state,action)=>{
            state.status = STATUS.ERROR
        })
    }
})


// export const {setProducts} = productCategorySlice.actions
export default productCategoriesSlice.reducer

//Thunks

export const fetchProductCategories = createAsyncThunk('featuredProducts/fetch', async () => {

    const res = await axios.get("http://localhost:4000/api/v1/productCategory")
    return res.data.categories
})