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
import {myProductsReducer, myUsersReducer} from "./utils/reducer";

import { VStack } from "@chakra-ui/react";

const initialProducts = {
  products: [],
  searchStr: "",
  category: "",
  filter: "",
  pages: 1,
};

const initialUsers = {
  error : "",
  email : "",
  password : "",
  name : "",
  avatar : {},
  isLoading : false,
  user : {}
}

function App() {
  const [productsState, dispatchState] = useReducer(myProductsReducer, initialProducts);
  const [userState, dispatchUser] = useReducer(myUsersReducer, initialUsers);

  useEffect(() => {
    const baseUrl = "http://localhost:4000/api/v1/products";
    let url = baseUrl;
    if (productsState.searchStr != "") {
      url += "?keyword=" + productsState.searchStr;
    }
    axios.get(url).then((res) => {
      dispatchState({ type: "NEW_PRODUCTS", payload: res.data.products });
    });
  }, [productsState.searchStr]);

  return (
    <VStack alignItems="stretch">
      <Header myProducts={productsState} setMyProductsState={dispatchState} />
      <Routes>
        <Route exact path="/about" element={<About />}></Route>
        <Route exact path="/contact" element={<Contact />}></Route>
        <Route
          exact
          path="/"
          element={<Products myProducts={productsState} />}
        ></Route>
        <Route exact path="/login" element={<Login myUser={userState} setMyUserState={dispatchUser} />}></Route>
        <Route exact path="/register" element={<Register myUser={userState} setMyUserState={dispatchUser} />}></Route>
      </Routes>

      <Footer />
    </VStack>
  );
}

export default App;
