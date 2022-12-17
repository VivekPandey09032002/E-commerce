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
} from "@chakra-ui/react";
import React from "react";
import { FaBars, FaCartPlus } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import CustomDrawer from "./CustomDrawer";

const NavBar = ({ userDetail, setUserDetail, cart, setCart }) => {
  const  navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { colorMode, toggleColorMode } = useColorMode();
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
              <Avatar name={userDetail.name} />
            </MenuButton>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Setting</MenuItem>
            </MenuList>
          </Menu>
          <IconButton onClick={toggleColorMode} fontSize={30} m={3}>
            {colorMode === "dark" ? <MdLightMode /> : <MdDarkMode />}
          </IconButton>
          <IconButton fontSize={30} m={3} onClick={() => {navigate("/cart")}}>
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
        {/* <Popover>
            <PopoverTrigger>
              <Avatar />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Confirmation!</PopoverHeader>
              <PopoverBody>
                <List>
                  <ListItem>Profile</ListItem>
                  <ListItem>Setting</ListItem>
                </List>
              </PopoverBody>
            </PopoverContent>
          </Popover> */}
      </Flex>
    </>
  );
};

export default NavBar;
