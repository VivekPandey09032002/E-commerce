import React from "react";
import {
  Box,
  Flex,
  Icon,
  IconButton,
  Image,
  Input,
  LinkBox,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import MyDrawer from "./MyDrawer";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";

import { FaSun, FaMoon } from "react-icons/fa";

import { Link } from "react-router-dom";

function Header({ searchStr, setMyProductsState, name }) {
  console.log("hello header")
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box bg="bg.200">
      <Flex alignItems="center" justifyContent="space-between">
        {/* LeftSide , Drawer, Logo */}
        <Flex>
          <MyDrawer />
          <Image
            boxSize="50px"
            objectFit="cover"
            src="./src/assets/cozgnine.jpg"
            alt="main website logo"
            loading="lazy"
            draggable="false"
          />
          <LinkBox as={Link} to="/">
            <Text fontSize="2.7rem" color="logo.100" p={1}>
              E-Cart{" "}
            </Text>
          </LinkBox>
        </Flex>
        {/* search */}
        <Flex display={["none", "none", "flex"]} flex="0 3 420px">
          <Input
            type="text"
            borderRadius="none"
            colorScheme="gray"
            color="white"
            borderStartRadius={3}
            h={14}
            value={searchStr}
            placeholder="Search...."
            fontSize="1.8rem"
            fontWeight="bold"
            onChange={(e) => {
              setMyProductsState({
                type: "SEARCH_STR",
                payload: e.target.value,
              });
            }}
          />
          <Icon
            as={AiOutlineSearch}
            bg="search.100"
            h={14}
            w={14}
            borderEndRadius={3}
          />
        </Flex>
        {/* signIn, Cart */}
        <Box>
          <Flex alignItems="center" paddingTop={2}>
            {name === undefined ? (
              <span className="inline-text">Sign in&rarr;</span>
            ) : (
              <span className="inline-text">
                {name.split(" ")[0]}
                {/* temp */}
              </span>
            )}

            <Link to="/login">
              <Icon as={AiOutlineUser} fontSize="3.2rem" color="white" mr={3} />
            </Link>
            <Link to="#">
              <Icon
                as={AiOutlineShoppingCart}
                fontSize="3.2rem"
                color="white"
                mr={5}
              />
            </Link>
            <IconButton
              icon={colorMode === "dark" ? <FaMoon /> : <FaSun />}
              isRound={true}
              size="lg"
              mr={2}
              mt={-1}
              onClick={toggleColorMode}
              position="absolute"
              top={{ base: "100px", md: "60px" }}
              right="8px"
            />
          </Flex>
        </Box>
      </Flex>
      <Box p={3} paddingTop={0} display={["flex", "flex", "none"]}>
        <Input
          colorScheme="gray"
          color="white"
          type="text"
          borderRadius="none"
          borderStartRadius={3}
          h={14}
          placeholder="Search...."
          fontSize="1.8rem"
          fontWeight="bold"
        />
        <Icon
          as={AiOutlineSearch}
          bg="search.100"
          h={14}
          w={14}
          borderEndRadius={3}
        />
      </Box>
    </Box>
  );
}

export default Header;
