import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import ReactStars from "react-rating-stars-component";

function Rating({ FaStarHalf, id, updateReview, setCurrReview }) {
  let [feedBack, setFeedBack] = React.useState("");
  let [rating, setRating] = React.useState(5);
  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    setFeedBack(inputValue);
  };
  return (
    <Stack p={5}>
      <Heading>Write Your Review</Heading>
      <Stack direction="row" alignItems="center" spacing={5}>
        <Text fontSize={[16,20,28]} color="gray.500">Select the Stars:</Text>
        <ReactStars
          count={5}
          activeColor="#ffd700"
          size={20}
          value={rating}
          halfIcon={<FaStarHalf />}
          isHalf={true}
          onChange={(newRating) => setRating(newRating)}
        />
      </Stack>
      <VStack spacing={5}>
        <Textarea
          value={feedBack}
          onChange={handleInputChange}
          placeholder="Here is a sample placeholder"
          size="sm"
        />
        <Button
          size="md"
          mt="8px"
          variant="purple"
          onClick={() => {
            console.log(feedBack);
            updateReview(
              {
                rating,
                comment: feedBack,
                productId: id,
              },
              id,
              setCurrReview
            );
          }}
        >
          Submit Review
        </Button>
      </VStack>
    </Stack>
  );
}

export default Rating;
