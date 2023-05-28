import {
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { FaBars, FaCartPlus } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomDrawer from "./CustomDrawer";
import { logOutUser } from "../store/userSlice";

const NavBar = ({ userDetail, setUserDetail }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: cart } = useSelector((state) => state.cart);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0;
  };

  function logoutToast(userDetail) {
    if (isObjectEmpty(userDetail)) {
      toast({
        title: "Logout triggered",
        description: "you have been already logout",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    } else {
      toast({
        title: "Logout triggered",
        description: "you have been logout successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    }
  }

  if (cart == null) return null;
  return (
    <>
      <Container maxW="container.xl">
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
          size="lg"
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <CustomDrawer setUserDetail={setUserDetail} />
          </DrawerContent>
        </Drawer>
      </Container>
      <Flex
        h="75px"
        bg="brand.800"
        justify="space-between"
        align="center"
        px={4}
      >
        <IconButton
          onClick={onOpen}
          ref={btnRef}
          variant="ghost"
          color="white"
          _hover={{ bg: "main.400" }}
          fontSize="3xl"
        >
          <FaBars />
        </IconButton>

        <Flex align="center" position="relative">
          <Menu>
            <MenuButton>
              {isObjectEmpty(userDetail) ? (
                <Avatar name="guest" />
              ) : (
                <Avatar name={userDetail.name} src={userDetail.avatar} />
              )}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={(e) => navigate("/user")}>Profile</MenuItem>
              <MenuItem
                onClick={(e) => {
                  dispatch(logOutUser());
                  navigate("/");
                  logoutToast(userDetail);
                  setUserDetail({});
                  
                }}
              >
                Log Out
              </MenuItem>
            </MenuList>
          </Menu>
          <IconButton onClick={toggleColorMode} fontSize={30} m={3}>
            {colorMode === "dark" ? <MdLightMode /> : <MdDarkMode />}
          </IconButton>
          <IconButton
            fontSize={30}
            m={3}
            onClick={() => {
              navigate("/cart");
            }}
          >
            <FaCartPlus />
          </IconButton>
          <Box
            position="absolute"
            right={3}
            top={-1}
            fontSize={20}
            fontWeight="bold"
            color="red.500"
          >
            {cart.length}
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default NavBar;
