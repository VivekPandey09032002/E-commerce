import { Button, DrawerBody, DrawerHeader, HStack, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";

function CustomDrawer({ setUserDetail }) {
  const [isLogin, setLogin] = useState(false);
  const [isRegister, setRegister] = useState(true);
  return (
    <>
      <DrawerHeader>
        <HStack>
          <Button
            variant="secondary"
            w={20}
            onClick={() => {
              setLogin(false);
              setRegister(true);
            }}
          >
            Register
          </Button>
          <Button
            w={20}
            variant="purple"
            onClick={() => {
              setRegister(false);
              setLogin(true);
            }}
          >
            Login
          </Button>
        </HStack>
      </DrawerHeader>

      <DrawerBody>
        {isLogin && <Login setUserDetail={setUserDetail} />}
        {isRegister && <Register />}
      </DrawerBody>
    </>
  );
}

export default CustomDrawer;
