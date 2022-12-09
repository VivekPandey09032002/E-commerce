import React from "react";
import { Box, Flex, Icon, Image, Input, Link, Text } from "@chakra-ui/react";
import MyDrawer from "./MyDrawer";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
function Header() {
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
          <Text fontSize="2.7rem" color="logo.100" p={1}>
            E-Cart{" "}
          </Text>
        </Flex>
        {/* search */}
        <Flex className="hidden" display={{md : "flex"}} >
          <Input
            type="text"
            borderRadius="none"
            bg="white"
            borderStartRadius={3}
            w={390}
            h={14}
            placeholder="Search...."
            fontSize="1.8rem"
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
            <span className="inline-text">Sign in&rarr;</span>
            <Link href="#" fontSize="3.2rem" color="white" mr={3}>
              <Icon as={AiOutlineUser} />
            </Link>
            <Link href="#" fontSize="3.2rem" color="white" mr={5}>
              <Icon as={AiOutlineShoppingCart} />
            </Link>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default Header;
