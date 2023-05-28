import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Stack,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import DisplayProduct from "../components/DisplayProduct";
import AddProduct from "../components/AddProduct";
import UpdateProduct from "../components/UpdateProduct";

function AdminPage() {
  const textColor = useColorModeValue("gray.600", "whiteAlpha.600");
  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");
  const [view, setView] = useState(1);

  return (
    <Container className="products" maxW="container.xl" my={5}>
        <Heading   textAlign="center" color="mediumseagreen">Admin Panel</Heading>
      <Flex maxW="container.xl" mt={30} minH="40vh">
        <VStack
          align={["stretch", "stretch", "flex-start"]}
          justify="stretch"
          spacing={8}
          bg={bgColor}
          p={2}
          boxShadow="lg"
          overflow="hidden"
          h="100%"
          w="20%"
        >
          <Box w="100%">
            <Heading as="h5" p={2} color="mediumseagreen">
              Product
            </Heading>
            <ul
              style={{
                textAlign: "right",
                width: "100%",
                listStyleType: "square",
                padding: "2px",
                fontSize: "22px",
              }}
            >
              <li>
                <Button colorScheme={textColor} variant="link" onClick={ () => setView(1)}>
                  Get all product
                </Button>
              </li>
              <li>
                <Button colorScheme="teal" variant="link" onClick={ () => setView(2)}>
                  Add product
                </Button>
              </li>
              <li>
                <Button colorScheme="red" variant="link" onClick={ () => setView(3)}>
                  Delete product
                </Button>
              </li>
              <li>
                <Button colorScheme="blue" variant="link" onClick={ () => setView(4)}>
                  update product
                </Button>
              </li>
            </ul>
          </Box>

          <Box w="100%">
            <Heading  as="h5" p={2} color="mediumseagreen">
              User
            </Heading>
            <ul
              style={{
                textAlign: "right",
                width: "100%",
                listStyleType: "square",
                padding: "2px",
                fontSize: "22px",
              }}
            >
              <li>
                <Button colorScheme={textColor} variant="link">
                  Get all user
                </Button>
              </li>
              <li>
                <Button colorScheme="teal" variant="link">
                  Add user
                </Button>
              </li>
              <li>
                <Button colorScheme="red" variant="link">
                  Delete user
                </Button>
              </li>
              <li>
                <Button colorScheme="blue" variant="link">
                  update user
                </Button>
              </li>
            </ul>
          </Box>
        </VStack>
        <Box p={2}>
            {view == 1 && <DisplayProduct/>}
            {view == 2 && <AddProduct/>}
            {view == 3 && <DisplayProduct/>}
            {view == 4 && <UpdateProduct/>}
        </Box>
      </Flex>
    </Container>
  );
}

export default AdminPage;
