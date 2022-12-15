import { Box, Button, Heading, Stack, Text, Textarea } from "@chakra-ui/react";
import React from "react";
import ReactStars from "react-rating-stars-component";
import { getReview, updateReview } from "../utils/UserLogic";

function Rating({ FaStarHalf, setMyProductsState,id ,setReview }) {

  let [value, setValue] = React.useState("");
  let [rating, setRating] = React.useState(5);
  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };
  return (
    <Box mx="4px">
      <Heading>Write Your Review</Heading>
      <Stack direction="row" alignItems="center">
        <Text my="8px">Select the Stars</Text>
        <ReactStars
          count={5}
          activeColor="#ffd700"
          size={30}
          value={rating}
          halfIcon={<FaStarHalf />}
          isHalf={true}
          onChange={(newRating) => setRating(newRating)}
        />
      </Stack>

      <Textarea
        value={value}
        onChange={handleInputChange}
        placeholder="Here is a sample placeholder"
        size="sm"
      />
      <Button
        size="md"
        mt="8px"
        onClick={() => {
          // setMyProductsState({
          //     type : "NEW_RATING",
          //     payload :
          // })

          updateReview({
            rating,
            comment: value,
            productId: id,
          });

         setReview(id,setReview) 

        }}
      >
        Submit Review
      </Button>
    </Box>
  );
}

export default Rating;
