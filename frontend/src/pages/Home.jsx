import {
  Card,
  CardBody,
  Heading,
  Stack,
  Image,
  Box,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

import MyFilter from "../components/Filter";
import Products from "../components/Products";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function MySlider({ featuredProducts }) {

  const navigate = useNavigate()
  const [current, setCurrent] = useState(0);
  const currentProduct = featuredProducts[current];
  return (
    <Card>
      <CardBody p={0} borderRadius="12px" position="relative" overflow="hidden">
        <Image
          src={currentProduct?.url}
          alt={currentProduct?.desc}
          w="100%"
          h={{ base : "350px", md : "450px"}}
          transition="all 0.3s"
          draggable={false}
        />
        <AiOutlineArrowLeft
          className="left-arrow"
          onClick={(e) => {
            setCurrent(current > 0 ? current - 1 : featuredProducts.length - 1);
          }}
        />
        <AiOutlineArrowRight
          className="right-arrow"
          onClick={(e) => {
            setCurrent((current + 1) % featuredProducts.length);
          }}
        />
        <Stack
          className="temp"
          bg="logo"
          p={2}
          direction={["column", "row"]}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Heading size="md">{currentProduct?.name}</Heading>
            <p>{currentProduct?.desc}</p>
          </Box>
          <Button rounded="10px" w="180px" onClick={() => navigate(`/product/${currentProduct.id}`)}>Buy Now</Button>
        </Stack>
      </CardBody>
    </Card>
  );
}

const MemoSlider = React.memo(MySlider);

function Home({
  myProducts,
  distinctCategory,
  featuredProducts,
  setMyProductsState,
}) {
  return (
    <Grid templateColumns={{ md: "2fr minmax(230px,1fr)" }}  m={2} gap={6}>
      <GridItem gap={4} >
        <MemoSlider featuredProducts={featuredProducts} />
      </GridItem>
      <GridItem placeItems="center" colSpan={{base : 2, md : 1}}>
        <MyFilter
          distinctCategory={distinctCategory}
          setProductState={setMyProductsState}
        />
      </GridItem>
      <GridItem gap={0} mt={2} colSpan={2}><Products products = {myProducts.products}/></GridItem>
    </Grid>
  );
}

export default Home;
