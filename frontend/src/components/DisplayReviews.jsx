import {
  Box,
  Divider,
  HStack,
  Icon,
  Spacer,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import { FaStarHalf } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
function DisplayReviews({ reviews }) {
  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");

  return (
    <Stack boxShadow="lg" p={5}>
      {reviews.map((review, ind) => (
        <Box key={ind} boxShadow="lg" p={5} bg={bgColor}>
          <Stack divider={<StackDivider />} >
            <HStack spacing={4}>
              <Icon as={BsPersonCircle} fontSize={30} ></Icon>
              <Text>{review.name}</Text>
              <Spacer/>
              <Box>
                <ReactStars
                  count={5}
                  activeColor="#ffd700"
                  size={20}
                  value={+review.rating}
                  halfIcon={<FaStarHalf />}
                  isHalf={true}
                  edit={false}
                />
              </Box>
            </HStack>

            <Box>{review.comment}</Box>
          </Stack>
        </Box>
      ))}
    </Stack>
  );
}

export default DisplayReviews;
