import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { Routes, Route } from "react-router-dom";
import { useEffect, useReducer } from "react";
import axios from "axios";
import { myProductsReducer } from "./utils/reducer";

import { VStack } from "@chakra-ui/react";

import { getUser } from "./utils/UserLogic";
import React, { useState } from "react";

const initialProducts = {
  products: [],
  searchStr: "",
  category: "",
  filter: "",
  pages: 1,
};

function App() {
  console.log("hello app");
  const [productsState, dispatchState] = useReducer(myProductsReducer,initialProducts);
  const [userDetail, setUserDetail] = useState({});

  useEffect(() => {
    getUser(setUserDetail);
  }, []);

  useEffect(() => {
    const baseUrl = "http://localhost:4000/api/v1/products";
    let url = baseUrl;
    if (productsState.searchStr != "") {
      url += "?keyword=" + productsState.searchStr;
    }
    axios.get(url).then((res) => {
      dispatchState({ type: "GET_PRODUCTS", payload: res.data.products });
    });
  }, [productsState.searchStr]);

  return (
    <VStack alignItems="stretch">
      <Header
        searchStr={productsState.searchStr}
        setMyProductsState={dispatchState}
        name={userDetail.name}
      />
      <Routes>
        <Route exact path="/about" element={<About />}></Route>
        <Route exact path="/contact" element={<Contact />}></Route>
        <Route
          exact
          path="/"
          element={<Products myProducts={productsState} />}
        ></Route>
        <Route
          exact
          path="/login"
          element={<Login setUserDetail={setUserDetail} />}
        ></Route>
        <Route
          exact
          path="/register"
          element={
            <Register  />
          }
        ></Route>
      </Routes>

      <Footer />
    </VStack>
  );
}

export default App;
