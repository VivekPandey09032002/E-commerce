import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { Routes, Route } from "react-router-dom";
import { useEffect, useReducer } from "react";

import { myProductsReducer } from "./utils/reducer";

import { Button, Container, Flex, useColorMode } from "@chakra-ui/react";

import { getUser, getProducts } from "./utils/UserLogic";
import React, { useState } from "react";
import Home from "./pages/Home";

import { MdDarkMode, MdLightMode } from "react-icons/md";
import SingleProduct from "./pages/SingleProduct";

const initialProducts = {
  products: [],
  searchStr: "",
  category: "",
  pages: NaN,
  price_lte: NaN,
  price_gte: NaN,
};

function App() {

  const { colorMode, toggleColorMode } = useColorMode();
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
    <Container maxW="1336px" p="10px">
      <Header
        searchStr={productsState.searchStr}
        setMyProductsState={dispatchState}
        name={userDetail.name}
      />
      <Flex justifyContent="flex-end" p={3}>
        <Button onClick={() => toggleColorMode()}>
          {colorMode === "light" ? <MdDarkMode /> : <MdLightMode />}
        </Button>
      </Flex>

      <Routes>
        <Route exact path="/about" element={<About />}></Route>
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
        <Route exact path="/product/:id" element={<SingleProduct setMyProductsState={dispatchState}/>}></Route>
      </Routes>

      <Footer />
    </Container>
  );
}

export default App;
