import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { STATUS } from "../utils/status"

const initialState = {
  data: {},
  status: "idle"

}

const shippingSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    changeStatus(state,action){
      state.status = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeProduct.pending, (state, action) => {
        state.status = STATUS.LOADING
      })
      .addCase(placeProduct.fulfilled, (state, action) => {
        state.data = action.payload
        state.status = STATUS.SUCCESS
      })
      .addCase(placeProduct.rejected, (state, action) => {
        state.status = STATUS.ERROR
      })
  },
})

export const {changeStatus} = shippingSlice.actions
export default shippingSlice.reducer

export const placeProduct = createAsyncThunk(
  "placeProduct/fetch",
  async (details) => {
    const instance = axios.create({
      withCredentials: true,
    })
    const res = await instance.post(
      "http://localhost:4000/api/v1/order/new",
      details
    )
    
    return res.data
    
  }
)
