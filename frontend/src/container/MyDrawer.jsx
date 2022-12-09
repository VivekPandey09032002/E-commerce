import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { AiOutlineMenu } from "react-icons/ai";
import { Icon } from "@chakra-ui/react";
function MyDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Icon
        as={AiOutlineMenu}
        boxSize="5rem"
        color="white"
        onClick={onOpen}
        p={3}
      />
      <Drawer placement="left" onClose={onClose} isOpen={isOpen} size="sm">
        <DrawerOverlay />
        <DrawerContent >
          <DrawerCloseButton size="lg" />
          <DrawerHeader borderBottomWidth="2px" fontSize="1.6rem">E-Cart</DrawerHeader>
          <DrawerBody>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default MyDrawer;
