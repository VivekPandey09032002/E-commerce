// import {
//   Card,
//   CardBody,
//   Heading,
//   Stack,
//   Image,
//   Box,
//   Button,
//   Grid,
//   GridItem,
// } from "@chakra-ui/react";
// import React from "react";
// import { useState } from "react";

// import MyFilter from "../components/Filter";
// import Products from "../components/Products";

// import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";

// function MySlider({ featuredProducts }) {

//   const navigate = useNavigate()
//   const [current, setCurrent] = useState(0);
//   const currentProduct = featuredProducts[current];
//   return (
//     <Card>
//       <CardBody p={0} borderRadius="12px" position="relative" overflow="hidden">
//         <Image
//           src={currentProduct?.url}
//           alt={currentProduct?.desc}
//           w="100%"
//           h={{ base : "350px", md : "450px"}}
//           transition="all 0.3s"
//           draggable={false}
//         />
//         <AiOutlineArrowLeft
//           className="left-arrow"
//           onClick={(e) => {
//             setCurrent(current > 0 ? current - 1 : featuredProducts.length - 1);
//           }}
//         />
//         <AiOutlineArrowRight
//           className="right-arrow"
//           onClick={(e) => {
//             setCurrent((current + 1) % featuredProducts.length);
//           }}
//         />
//         <Stack
//           className="temp"
//           bg="logo"
//           p={2}
//           direction={["column", "row"]}
//           justifyContent="space-between"
//           alignItems="center"
//         >
//           <Box>
//             <Heading size="md">{currentProduct?.name}</Heading>
//             <p>{currentProduct?.desc}</p>
//           </Box>
//           <Button rounded="10px" w="180px" onClick={() => navigate(`/product/${currentProduct.id}`)}>Buy Now</Button>
//         </Stack>
//       </CardBody>
//     </Card>
//   );
// }

// const MemoSlider = React.memo(MySlider);

// import PostCart from '../components/PostCart'

// function Home({
// myProducts,
// distinctCategory,
// featuredProducts,
// setMyProductsState,
// }) {
//   return (
//     <>
//     <PostCart/>
//     <Grid templateColumns={{ md: "2fr minmax(230px,1fr)" }}  m={2} gap={6}>
//       <GridItem gap={4} >
//         <MemoSlider featuredProducts={featuredProducts} />
//       </GridItem>
//       <GridItem placeItems="center" colSpan={{base : 2, md : 1}}>
//         <MyFilter
//           distinctCategory={distinctCategory}
//           setProductState={setMyProductsState}
//         />
//       </GridItem>
//       <GridItem gap={0} mt={2} colSpan={2}><Products products = {myProducts.products}/></GridItem>
//     </Grid>
//     </>

//   );
// }

// export default Home;

import {
  AspectRatio,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import HomeSpec from "../components/HomeSpec";
import ProductViewer from "../components/ProductViewer";


function Home(myProducts, setMyProductsState) {
  const { distinctCategory: category, featuredProducts } = myProducts;
  return (
    <>
      <Stack spacing={10}>
        <Container
          maxW="container.xl"
          alignSelf="center"
          p={12}
          minH={400}
          mt={10}
        >
          <Stack direction={["column", "column", "row"]} spacing={4}>
            <VStack align="flex-start" spacing={3}>
              <Text as="p" color="gray.500">
                Welcome To
              </Text>
              <Heading fontSize={45}>E-Mart</Heading>
              <Text as="p" color="gray.500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                ex ratione hic, id doloribus eaque voluptate libero veritatis
                explicabo iusto accusantium vitae ullam! Cum, perspiciatis
                pariatur fugiat quae et velit!
              </Text>
              <Button
                as={NavLink}
                alignSelf={["center", "center", "flex-start"]}
                colorScheme="blue"
                p={4}
                to="/products"
              >
                Shop Now
              </Button>
            </VStack>

            <AspectRatio
              ratio={16 / 9}
              display={{ base: "none", md: "block" }}
              w="1200px"
            >
              <Image
                src="./src/assets/panda.jpg"
                draggable="false"
                boxShadow="35px -30px 0px 0px #A670FF"
              ></Image>
            </AspectRatio>
          </Stack>
        </Container>
        <Box bg="gray.200">
          <Container maxW="container.xl" alignSelf="center" p={12} minH={400}>
            <Text as="p" color="gray.500">
              CHECK NOW!
            </Text>
            <Heading fontSize={35} color="gray.900">Our Feature Services</Heading>
            <HStack flexWrap="wrap" justifyContent="center" mt={2}>
              {featuredProducts.map((product) => (
                <ProductViewer
                  key={product.id}
                  url={product.url}
                  rating={product.rating}
                  category={product.category}
                  price={product.price}
                  name={product.name}
                  id={product.id}
                  p={2}
                />
              ))}
            </HStack>
          </Container>
        </Box>
        {/* home stack */}
        <HomeSpec />
        {/* footer */}
      </Stack>
    </>
  );
}

export default Home;
