import React, { useState } from "react";

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

function Login({ setUserDetail }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

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
        // use if cookie is not working
        // Cookies.set("access_token", res.data.token);
        setUserDetail(res.data.user)
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
        setError(err.response.data.message)
        setLoading(false)
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                
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
