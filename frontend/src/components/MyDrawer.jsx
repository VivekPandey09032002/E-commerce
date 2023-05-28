import React, { useEffect } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Box,
  Button,
} from "@chakra-ui/react";

import { FaBars } from "react-icons/fa";
import { Icon } from "@chakra-ui/react";
function MyDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let colorMode = 'light'
  
  return (
    <Box>
      <Icon as={FaBars} fontSize="30px" onClick={onOpen} m="8px" />
      <Drawer placement="left" onClose={onClose} isOpen={isOpen} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton size="lg" />
          <DrawerHeader borderBottomWidth="2px" fontSize="1.5rem">
            E-Cart
          </DrawerHeader>
          <DrawerBody>

            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

export default MyDrawer;
