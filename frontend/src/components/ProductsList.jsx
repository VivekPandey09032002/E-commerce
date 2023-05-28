import { Button, Flex, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { CgDisplayFlex } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchProductsWithFilters } from "../store/productSlice";

import { STATUS } from "../utils/status";
import Loading from "./Loading";
import ProductViewer from "./ProductViewer";

function ProductsList() {
  const dispatch = useDispatch();
  const { data: products, productCount } = useSelector(
    (state) => state.products
  );

  const [category, setCategory] = useState("");
  const [prices, setPrices] = useState([NaN, NaN]);
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(
      fetchProductsWithFilters({ category, prices, input, page, searchStr: "" })
    );
  }, [page]);

  if (products.status === STATUS.LOADING) return <Loading />;

  if (products.status === STATUS.ERROR) return <h1>Error</h1>;

  return (
    <VStack w="100%" overflowY="auto">
      <Flex w="100%" justify="space-between" p={2}>
        <HStack p={2}>
          <BsFillGridFill size={30} />
          <CgDisplayFlex size={30} />
        </HStack>
        <HStack>
          {page != 1 && (
            <Button
              variant="ghost"
              w="full"
              onClick={() => setPage((page) => page - 1)}
            >
              Previous Page
            </Button>
          )}
          {products.length != 0 && (
            <Button
              variant="ghost"
              w="full"
              onClick={() => setPage((page) => page + 1)}
            >
              Next
            </Button>
          )}
        </HStack>
        <Text fontSize={20} fontWeight="500">
          Total product count: {productCount}
        </Text>
      </Flex>
      <Grid
        templateColumns={["1fr", "1fr 1fr", "1fr 1fr 1fr", "1fr 1fr 1fr 1fr"]}
        templateRows={["230px"]}
        style={{ gridAutoRows: "250px" }}
        gap="20px"
        p={4}
      >
        {products.map((product) => (
          <ProductViewer
            category={product.category}
            url={product?.images[0]?.url}
            rating={product.rating}
            price={product.price}
            name={product.name}
            id={product.productId}
            key={product.id}
          />
        ))}
      </Grid>
    </VStack>
  );
}

export default ProductsList;
