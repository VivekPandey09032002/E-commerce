


import {  Routes, Route } from "react-router-dom";
import { useEffect, useReducer } from "react";

import { myProductsReducer } from "./utils/reducer";

import { getUser, getProducts } from "./utils/UserLogic";
import React, { useState } from "react";

import Home from "./pages/Home";
import Footer from "./components/Footer";
import About from "./pages/About";

import SingleProduct from "./pages/SingleProduct";
import CartPage from "./pages/CartPage";
import NavBar from "./components/NavBar";
import Products from "./pages/Products";

const initialProducts = {
  products: [],
  searchStr: "",
  category: "",
  pages: NaN,
  price_lte: NaN,
  price_gte: NaN,
};

function App() {
  const [productsState, dispatchState] = useReducer(
    myProductsReducer,
    initialProducts
  );
  const [userDetail, setUserDetail] = useState({});
  const [distinctCategory, setDistinctCategory] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    getUser(setUserDetail);
  }, []);

  useEffect(() => {
    getProducts(
      productsState,
      dispatchState,
      setDistinctCategory,
      setFeaturedProducts,
      featuredProducts,
      distinctCategory
    ).catch((e) => console.log(e));
  }, [
    productsState.searchStr,
    productsState.category,
    productsState.filter,
    productsState.pages,
    productsState.price_lte,
    productsState.price_gte,
  ]);

  return (
    <>
      <NavBar userDetail={userDetail} setUserDetail={setUserDetail} />
      <Routes>
        {/* <Route path="/" index element={<Home />} />
        <Route path="/post" element={<PostPage />} /> */}
        <Route
          path="/"
          element={
            <Home
              myProducts={productsState}
              distinctCategory={distinctCategory}
              featuredProducts={featuredProducts}
              setMyProductsState={dispatchState}
            />
          }
        />
        <Route
          path="/product/:id"
          element={<SingleProduct setMyProductsState={dispatchState} />}
        ></Route>
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

{
  /* <Header
        searchStr={productsState.searchStr}
        setMyProductsState={dispatchState}
        name={userDetail.name}
      /> */
}
{
  /* <Flex justifyContent="flex-end" p={3}>
        <Button onClick={() => toggleColorMode()}>
          {colorMode === "light" ? <MdDarkMode /> : <MdLightMode />}
        </Button>
      </Flex>

      <Routes>
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />}></Route>
        <Route
          exact
          path="/"
          element={
            <Home
              myProducts={productsState}
              distinctCategory={distinctCategory}
              featuredProducts={featuredProducts}
              setMyProductsState={dispatchState}
            />
          }
        ></Route>
        <Route
          exact
          path="/login"
          element={<Login setUserDetail={setUserDetail} />}
        ></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route
          exact
          path="/product/:id"
          element={<SingleProduct setMyProductsState={dispatchState} />}
        ></Route>
        <Route exact path="/cart" element={<CartPage />}></Route>
      </Routes>

      <Footer /> */
}

export default App;
