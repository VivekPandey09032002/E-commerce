import {
  Box,
  Divider,
  HStack,
  Icon,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import { FaStarHalf } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
function DisplayReviews({ reviews }) {
  return (
    <Box boxShadow="lg" p={2} m={2} border="1px9">
      {reviews.map((review, ind) => (
        <Box key={ind} p={2} mt={2}>
          <Stack>
            <HStack spacing={4}>
              <Icon as={BsPersonCircle} fontSize={20}></Icon>
              <Text>{review.name}</Text>
            </HStack>
            <ReactStars
              count={5}
              activeColor="#ffd700"
              size={30}
              value={+review.rating}
              halfIcon={<FaStarHalf />}
              isHalf={true}
              edit={false}
            />
          </Stack>
          <Box>{review.comment}</Box>
        </Box>
      ))}
    </Box>
  );
}

export default DisplayReviews;
