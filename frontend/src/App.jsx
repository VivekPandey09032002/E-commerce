import Header from "./container/Header";
import Footer from "./container/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import Products from "./components/Products";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { compareSync } from "bcryptjs";

function App() {
  const [products, setProducts] = useState([]);
  const [searchStr, setSearchStr] = useState("");
  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState("");
  const [pages, setPages] = useState(1);

  useEffect(() => {
    axios.get("http://localhost:4000/api/v1/products?keyword=" + searchStr)
      .then((res) => {
        setProducts(res.data.products);
      });
  }, [searchStr, category, filter, pages]);

  return (
    <div className="App">
      <Header
        searchStr={searchStr}
        setSearchStr={setSearchStr}
        products={products}
        setProducts={setProducts}
      />
      <Routes>
        <Route exact path="/about" element={<About />}></Route>
        <Route exact path="/contact" element={<Contact />}></Route>
        <Route
          exact
          path="/"
          element={<Products products={products} setProducts={setProducts} />}
        ></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
