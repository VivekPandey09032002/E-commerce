import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleProduct, updateReview } from "../utils/UserLogic";
import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import ReactStars from "react-rating-stars-component";

import {
  FaMoneyCheckAlt,
  FaStarHalf,
  TbReplace,
  TbTruckDelivery,
} from "react-icons/all";
import Rating from "../components/Rating";
import DisplayReviews from "../components/DisplayReviews";
import PostCard from "../components/PostCard";

function SingleProduct({ setMyProductsState }) {
  const changeReview = (body) => {
    const { rating, comment, productId } = body;
    console.log("masterji", rating, comment, productId);
    updateReview(
      {
        rating,
        comment,
        productId,
      },
      id,
      setCurrReview
    );
  };

  console.log("single product");
  const { id } = useParams();
  const [currProduct, setCurrProduct] = useState(null);
  const [current, setCurrent] = useState(0);
  const [currReview, setCurrReview] = useState([]);

  useEffect(() => {
    getSingleProduct(id, setCurrProduct, setCurrReview).catch((e) =>
      console.log(e)
    );
  }, []);

  if (!currProduct) return null;

  return (
    <Container maxW="container.xl" p={2}>
      <HStack
        flexDirection={["column", "column", "row"]}
        gap={2}
        spacing={{ md: 10 }}
      >
        <Card minW={["90vw", "90vw", "480px"]} p={[1, 2]} bg="whiteAlpha.500">
          <CardBody
            p={0}
            borderRadius="12px"
            position="relative"
            overflow="hidden"
            m={0}
          >
            <Image
              src={currProduct.images[current].url}
              alt={currProduct.images[current].desc}
              w="100%"
              h={{ base: "400px", md: "450px" }}
              transition="all 0.3s"
              draggable={false}
            />
            <AiOutlineArrowLeft
              className="left-arrow"
              onClick={(e) => {
                setCurrent(
                  current > 0 ? current - 1 : currProduct.images.length - 1
                );
              }}
            />
            <AiOutlineArrowRight
              className="right-arrow"
              onClick={(e) => {
                setCurrent((current + 1) % currProduct.images.length);
              }}
            />
          </CardBody>
        </Card>
        <VStack alignItems="flex-start" p={3}>
          <Heading>{currProduct.name}</Heading>
          <Flex alignItems="center" gap={2}>
            <ReactStars
              count={5}
              activeColor="#ffd700"
              size={30}
              halfIcon={<FaStarHalf />}
              value={currProduct.ratings}
              isHalf={true}
              edit={false}
            />
            <span>({currProduct.reviews.length} customer review)</span>
          </Flex>
          <Text as="p" fontSize={20}>
            MRP : {currProduct.price}
          </Text>
          <Text>{currProduct.description}</Text>
          <HStack spacing={25}>
            <VStack>
              <Icon as={TbTruckDelivery} boxSize={10} mx={3}></Icon>
              <Text as="p" fontSize={12}>
                Free Delivery
              </Text>
            </VStack>
            <VStack>
              <Icon as={TbReplace} boxSize={10} mx={3}></Icon>
              <Text as="p" fontSize={12}>
                30 Days Replacement
              </Text>
            </VStack>
            <VStack>
              <Icon as={FaMoneyCheckAlt} boxSize={10} mx={3}></Icon>
              <Text as="p" fontSize={12}>
                Money back guarantee
              </Text>
            </VStack>
          </HStack>
          <Divider />
          <Stack spacing={1}>
            <Text>
              Available : {currProduct.stock > 0 ? "In Stock" : "Out Of Stock"}
            </Text>
            <Text>Current Stock : {currProduct.stock}</Text>
          </Stack>
          <Divider />
          <NumberInput
            size="lg"
            maxW={32}
            defaultValue={1}
            min={1}
            max={currProduct.stock}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button variant="secondary" w="full">
            Add to Cart
          </Button>
        </VStack>
      </HStack>
      <Rating
        FaStarHalf={FaStarHalf}
        setMyProductsState={setMyProductsState}
        id={id}
        setCurrReview={setCurrReview}
        updateReview={changeReview}
      />

      <DisplayReviews reviews={currReview} />
      {/* <PostCard/> */}
    </Container>
  );
}

export default SingleProduct;