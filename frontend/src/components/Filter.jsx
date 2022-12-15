import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Select,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";

import React, { useState } from "react";

function MyFilter({ distinctCategory, setProductState }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([25000, 50000]);

  const submitHandler = (e) => {
    e.preventDefault();
    setProductState({
      type: "NEW_FILTER",
      payload: {
        searchStr: "",
        category: selectedCategory,
        price_lte: priceRange[1],
        price_gte: priceRange[0],
        pages: 2,
      },
    });
  };

  return (
    <Stack
      spacing="20px"
      boxShadow="lg"
      p={2}
      rounded="md"
      bg="#6A5ACD"
      divider={<StackDivider />}
    >
      <Heading fontSize="xl" p={2} mt={3}>
        Quick Filter
      </Heading>
      <form onSubmit={submitHandler}>
        <Select
          variant="filled"
          colorScheme="brand"
          placeholder="Category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          boxShadow="md"
          bg="#708090"
        >
          {distinctCategory.map((ele, ind) => (
            <option key={ind} value={ele.value}>
              {ele.label}
            </option>
          ))}
        </Select>
        <Divider mt={3} bg="black" />
        <FormControl mt="20px">
          <FormLabel p={2}>Select Range:</FormLabel>
          <RangeSlider
            aria-label={["min", "max"]}
            defaultValue={[25000, 50000]}
            min={0}
            max={120000}
            onChange={(e) => {
              setPriceRange(e);
            }}
            bg="#708090"
            rounded="md"
            boxShadow="md"
            h="40px"
            me="30px"
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0}>
              <Box position="absolute" top="-25px">
                {priceRange[0]}
              </Box>
            </RangeSliderThumb>
            <RangeSliderThumb index={1}>
              <Box position="absolute" top="-25px">
                {priceRange[1]}
              </Box>
            </RangeSliderThumb>
          </RangeSlider>
        </FormControl>
        <FormControl>
          <Text mt={2}>Page</Text>
          <NumberInput size="lg" maxW={32} defaultValue={1} min={1} onChange={(e) => console.log(e)}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl textAlign="center">
          <Button
            mt={4}
            colorScheme="teal"
            type="submit"
            size="md"
            rounded="lg"
          >
            Filter
          </Button>
        </FormControl>
      </form>
    </Stack>
  );
}

export default MyFilter;
