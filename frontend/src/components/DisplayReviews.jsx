import {
  Box,
  HStack,
  Icon,
  Spacer,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import React from "react"
import { BsPersonCircle } from "react-icons/bs"
import { FaStarHalf } from "react-icons/fa"
import ReactStars from "react-rating-stars-component"
import { useSelector } from "react-redux"
import { STATUS } from "../utils/status"
function DisplayReviews() {
  const { data: reviews, status } = useSelector((state) => state.reviews)
  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50")

  if (status == STATUS.LOADING) return <h1>loading</h1>
  if (status == STATUS.ERROR) return <h1>error</h1>
  return (
    <Stack boxShadow="lg" p={5}>
      <span style={{ fontSize: "20px" }}>
        ({reviews.length} customer review)
      </span>
      {reviews.map((review, ind) => (
        <Box key={ind} boxShadow="lg" p={5} bg={bgColor}>
          <Stack divider={<StackDivider />}>
            <HStack spacing={4}>
              <Icon as={BsPersonCircle} fontSize={30}></Icon>
              <Text>{review.name}</Text>
              <Spacer />
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
  )
}

export default DisplayReviews
