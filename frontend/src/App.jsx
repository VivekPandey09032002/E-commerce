import { useDispatch } from "react-redux"
import { Routes, Route } from "react-router-dom"
import { Suspense, useEffect } from "react"
import { getUser} from "./utils/UserLogic"
import React, { useState } from "react"

import Home from "./pages/Home"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import { fetchFeaturedProducts } from "./store/featuredProductSlice"
import { add } from "./store/cartSlice"

const SingleProduct = React.lazy(() => import("./pages/SingleProduct"))
const CartPage = React.lazy(() => import("./pages/CartPage"))
const About = React.lazy(() => import("./pages/About"))
const ProductsPage = React.lazy(() => import("./pages/ProductsPage"))
// import SingleProduct from "./pages/SingleProduct";
// import CartPage from "./pages/CartPage";
// import About from "./pages/About";
// import ProductsPage from "./pages/ProductsPage";


function App() {
  const dispatch = useDispatch()
  const [userDetail, setUserDetail] = useState({})
  const [cart, setCart] = useState([])
  useEffect(() => {
    if (localStorage.getItem("cart")) {
      dispatch(add(JSON.parse(localStorage.getItem("cart"))))
    }
    dispatch(fetchFeaturedProducts("hello"))
  }, [])

  return (
    <div style={{overflow : "hidden"}}>
    <Suspense fallback="loading....">
      <NavBar
        userDetail={userDetail}
        setUserDetail={setUserDetail}
        cart={cart}
        setCart={setCart}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route
          path="/product/:id"
          element={<SingleProduct cart={cart} setCart={setCart} />}
        ></Route>

        <Route
          path="/cart"
          element={<CartPage cart={cart} setCart={setCart} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
      <Footer />
    </Suspense>
    </div>
  )
}

export default App
