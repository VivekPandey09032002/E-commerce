import { Container } from "@chakra-ui/react";
import React from "react";

function Products({ myProducts }) {
  let { searchStr, category, products, filter, page } = myProducts;
  return (
    <>
      {products.map((ele) => (
        <p>hello</p>
      ))}
    </>
  );
}

export default Products;
