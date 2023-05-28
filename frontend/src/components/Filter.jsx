import {
  Button,
  Heading,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
  VStack,
  useColorModeValue
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductCategories } from "../store/productCategorySlice";
import { fetchProductsWithFilters } from "../store/productSlice";
import { STATUS } from "../utils/status";

function Filter() {
  console.log("filter");
  const dispatch = useDispatch();
  const { data: categories } = useSelector((state) => state.productCategories);
  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");
  const textColor = useColorModeValue("blackAlpha.800", "whiteAlpha.700");

  const [category, setCategory] = useState("");
  const [prices, setPrices] = useState([NaN, NaN]);
  const [input, setInput] = useState("");
  const [page, setPage] = useState(NaN);

  useEffect(() => {
    dispatch(fetchProductCategories());
  }, []);

  if (categories.status === STATUS.LOADING)
    return <Progress size="xs" isIndeterminate />;

  if (categories.status === STATUS.ERROR)
    return (
      <>
        <Breadcrumb m={5} fontSize={25}>
          <BreadcrumbItem>
            <BreadcrumbLink as={NavLink} to="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink as={NavLink} to="/products">
              Products
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Login in first</AlertTitle>
          <AlertDescription>
            login with your credinatial to access this resource
          </AlertDescription>
        </Alert>
      </>
    );

  return (
    <VStack
      align={["stretch", "stretch", "flex-start"]}
      justify="stretch"
      spacing={8}
      bg={bgColor}
      color={textColor}
      p={2}
      boxShadow="lg"
      overflow="hidden"
      h="100%"
    >
      <Input
        w="full"
        size="sm"
        variant="outline"
        placeholder="Search..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            dispatch(
              fetchProductsWithFilters({
                searchStr: input,
                category: "",
                page: NaN,
                price_lte: NaN,
                price_gte: NaN,
              })
            );
          }
        }}
        color={textColor}
      ></Input>
      <VStack align="stretch" w="full">
        <Heading fontSize={26}>Category</Heading>
        {categories.map((category) => (
          <Text key={category.label} px={2}>
            {category.value}
          </Text>
        ))}
        <Menu>
          <MenuButton as={Button} variant="outline">
            {category.length > 0 ? category : "Select Category"}
          </MenuButton>
          <MenuList>
            {categories.map((category) => (
              <MenuItem
                onClick={(e) => setCategory(e.target.value)}
                value={category.value}
                key={category.value}
              >
                {category.value}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </VStack>
      <VStack align="flex-start" w="full">
        <Heading fontSize={26}>Price Range</Heading>
        <Button color={textColor} variant="outline" disabled="true" w="full">
          $ {prices[0] ? prices[0] : 0} {"<="} $ {prices[1] ? prices[1] : 0}
        </Button>
        <RangeSlider
          aria-label={["min", "max"]}
          defaultValue={[10000, 50000]}
          max={100000}
          onChange={(val) => setPrices(val)}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider>
      </VStack>
      <VStack w="full">
        <Button
          variant="purple"
          w="full"
          onClick={() => {
            dispatch(
              fetchProductsWithFilters({
                searchStr: input,
                category: category,
                page: page,
                price_lte: prices[1],
                price_gte: prices[0],
              })
            );
          }}
        >
          Apply Filters
        </Button>
        <Button
          variant="secondary"
          w="full"
          onClick={() => {
            setCategory("");
            setInput("");
            setPrices([NaN, NaN]);
            setPage(NaN);
            dispatch(
              fetchProductsWithFilters({
                searchStr: "",
                category: "",
                page: NaN,
                price_lte: NaN,
                price_gte: NaN,
              })
            );
          }}
        >
          Clear Filters
        </Button>
      </VStack>
    </VStack>
  );
}

export default Filter;
