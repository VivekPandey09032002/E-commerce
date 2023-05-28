import {
  Button,
  HStack,
  Heading,
  Icon,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductById,
  fetchProducts,
  fetchProductsWithFilters,
} from "../store/productSlice";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { STATUS } from "../utils/status";
import RenderError from "./RenderError";

function DisplayProduct() {
  const dispatch = useDispatch();
  const toast = useToast();
  const {
    data: products,
    status,
    message,
  } = useSelector((state) => state.products);
  const [category, setCategory] = useState("");
  const [prices, setPrices] = useState([NaN, NaN]);
  const [searchStr, setSearchStr] = useState("");
  const [page, setPage] = useState(1);
  const [currentStatus, setcurrentStatus] = useState(status);

  function deleteProduct(id) {
    dispatch(deleteProductById(id)).then((data) => {
      if (!data.error) {
        toast({
          title: "product deleted",
          description: "deleted product succesfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      dispatch(fetchProductsWithFilters({ category, prices, page, searchStr }))
    });
    ;
  }

  useEffect(() => {
    dispatch(fetchProductsWithFilters({ category, prices, page, searchStr }));
  }, [page, searchStr]);

  return (
    <>
      {message !== "" && (
        <RenderError
          second="admin"
          primaryMsg="failed to perfom operation on product"
          secondaryMsg={message}
        />
      )}
      <Heading
        color="mediumseagreen"
        fontSize={"24"}
        textAlign={"center"}
        p={"5"}
      >
        All Product details
      </Heading>
      <HStack>
        {page != 1 && (
          <Button
            variant="ghost"
            w="full"
            onClick={() => setPage((page) => page - 1)}
          >
            Previous Page
          </Button>
        )}
        {products.length != 0 && (
          <Button
            variant="ghost"
            w="full"
            onClick={() => setPage((page) => page + 1)}
          >
            Next
          </Button>
        )}

        <Input
          placeholder="filter by name "
          pattern="[0-0]+"
          value={searchStr}
          onChange={(e) => {
            setSearchStr(e.target.value);
          }}
        />
      </HStack>
      <TableContainer ml={"4"}>
        <Table size="md">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th isNumeric>price</Th>
              <Th isNumeric>ratings</Th>
              <Th>category</Th>
              <Th>stock</Th>
              <Th>action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product) => (
              <Tr key={product.id}>
                <Td>
                  {product.name.length < 20
                    ? product.name
                    : product.name.substring(0, 20) + "..."}
                </Td>
                <Td isNumeric>{product.price}</Td>
                <Td isNumeric>{product.rating}</Td>
                <Td>{product.category}</Td>
                <Td>{product.stock}</Td>

                <Td>
                  <Button fontSize={"20"} color={"blue.300"} variant="link">
                    <Icon as={AiFillEdit} />
                  </Button>
                  <Button
                    fontSize={"20"}
                    color={"red.500"}
                    variant="link"
                    onClick={() => deleteProduct(product.productId)}
                  >
                    <Icon as={AiFillDelete} />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default DisplayProduct;
