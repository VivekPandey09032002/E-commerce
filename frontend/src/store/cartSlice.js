import {createSlice, current} from '@reduxjs/toolkit'

const initialState = []

const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        add(state,action) {
            return action.payload
        },
        remove(state,action){
            return [...newState]
        }
    }
})

export const {add,remove} = cartSlice.actions
export default cartSlice.reducer


export const newItem = (currentProduct,quantity) => {

    const {productId,category,images,name,price,userId} = currentProduct
    const url = images[0].url
    let myCart = {productId,category,url,name,price,userId,quantity}
    return myCart
}