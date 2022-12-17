import {createSlice} from '@reduxjs/toolkit'

const initialState = []

const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        add(state,action) {

        },
        remove(state,action){

        }
    }
})

export const {add,remove} = cartSlice.actions
export default cartSlice.reducer