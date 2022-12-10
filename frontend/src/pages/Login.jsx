import React, { useState } from "react";
import Cookies from "js-cookie";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  CircularProgress,
  VStack,
  StackDivider,
  HStack,
  Spacer,
  useToast,
} from "@chakra-ui/react";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function Login({ myUser, setMyUserState }) {
  const { error, email, password, isLoading } = myUser;

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      navigate("/");
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setMyUserState({
      type: "SET_PAYLOAD",
      payload: true,
      name: "isLoading",
    });

    axios
      .post(
        "http://localhost:4000/api/v1/login",
        {
          email: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((res) => {
        Cookies.set("access_token", res.data.token);
        setMyUserState({
          type: "SET_PAYLOAD",
          payload: false,
          name: "isLoading",
        });
        setMyUserState({
          type: "SET_PAYLOAD",
          payload: "",
          name: "email",
        });
        setMyUserState({
          type: "SET_PAYLOAD",
          payload: "",
          name: "password",
        });
        setMyUserState({
          type: "SET_PAYLOAD",
          payload: res.data.user,
          name: "user",
        });
        setMyUserState({
          type: "SET_PAYLOAD",
          payload: "",
          name: "error",
        });
        toast({
          title: "Login Success",
          description: "Successfully logged in to account",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom-right",
        });
        navigate("/");
      })
      .catch((err) => {
        setMyUserState({
          type: "SET_PAYLOAD",
          payload: err.response.data.message,
          name: "error",
        });
        setMyUserState({
          type: "SET_PAYLOAD",
          payload: false,
          name: "isLoading",
        });
        setMyUserState({
          type: "SET_PAYLOAD",
          payload: "",
          name: "email",
        });
        setMyUserState({
          type: "SET_PAYLOAD",
          payload: "",
          name: "password",
        });
        toast({
          title: "Login Failed",
          description: `${error}`,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom-right",
        });
      });
  };

  return (
    <VStack>
      <form onSubmit={handleSubmit}>
        <VStack
          my="40px"
          p={8}
          maxWidth="450px"
          borderWidth={3}
          borderRadius={8}
          boxShadow="lg"
          divider={<StackDivider borderColor="gray.200" />}
        >
          <FormControl isRequired>
            <HStack mb={5}>
              <Button
                colorScheme="teal"
                variant="outline"
                fontSize="1.8rem"
                w="45%"
                h="3.5rem"
              >
                <Link to="/login">SignIn</Link>
              </Button>
              <Spacer />
              <Button
                colorScheme="teal"
                variant="outline"
                fontSize="1.8rem"
                w="45%"
                h="3.5rem"
              >
                <Link to="/register">SignUp</Link>
              </Button>
            </HStack>

            <HStack my={3}>
              <FormLabel fontSize="2rem">Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                size="lg"
                fontSize="1.8rem"
                value={email}
                onChange={(event) =>
                  setMyUserState({
                    type: "SET_PAYLOAD",
                    payload: event.target.value,
                    name: "email",
                  })
                }
              />
            </HStack>
          </FormControl>

          <FormControl isRequired mt={6}>
            <HStack mb={4}>
              <FormLabel fontSize="1.8rem">Password</FormLabel>
              <Input
                type="password"
                placeholder="*******"
                size="lg"
                fontSize="2rem"
                value={password}
                onChange={(event) =>
                  setMyUserState({
                    type: "SET_PAYLOAD",
                    payload: event.target.value,
                    name: "password",
                  })
                }
              />
            </HStack>
          </FormControl>

          <Button
            colorScheme="teal"
            variant="outline"
            type="submit"
            width="full"
            mt={4}
            h={16}
            fontSize="1.8rem"
          >
            {isLoading ? (
              <CircularProgress isIndeterminate size="24px" color="teal" />
            ) : (
              "Sign In"
            )}
          </Button>
        </VStack>
      </form>
    </VStack>
  );
}

export default Login;
