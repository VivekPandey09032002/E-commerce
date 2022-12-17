import {configureStore} from '@reduxjs/toolkit'

import cartReducer from './cartSlice' 
import featuredProductReducer from './featuredProductSlice'
import productReducer from './productSlice'
import productCategoriesReducer from './productCategorySlice'
import singleProductReducer from './singleProductSlice'
import reviewReducer from './reviewSlice'

const store = configureStore({
    reducer : {
        cart : cartReducer,
        products : productReducer,
        featuredProduct : featuredProductReducer,
        productCategories : productCategoriesReducer,
        singleProduct : singleProductReducer,
        reviews : reviewReducer
    }
})

export default store