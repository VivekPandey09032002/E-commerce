import {configureStore} from '@reduxjs/toolkit'

import cartReducer from './cartSlice' 
import featuredProductReducer from './featuredProductSlice'
import productReducer from './productSlice'
import productCategoriesReducer from './productCategorySlice'

const store = configureStore({
    reducer : {
        cart : cartReducer,
        products : productReducer,
        featuredProduct : featuredProductReducer,
        productCategories : productCategoriesReducer
    }
})

export default store