import React from "react";
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

import { uploadImage } from "../utils/apiCalls";
import { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState({});
  const [isUploadLoading, setIsUploadLoading] = useState();

  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    axios
      .post("http://localhost:4000/api/v1/register", {
        name: name,
        email: email,
        password: password,
        avatar: avatar,
      })
      .then((res) => {
        setLoading(false);
        toast({
          title: "Login Success",
          description: "Successfully logged in to account",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setError(err.response.data.message);
        setLoading(false);
        toast({
          title: "Login Failed",
          description: `${error}`,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
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
          alignSelf="center"
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

          <FormControl isRequired mt={6}>
            <HStack mb={4}>
              <FormLabel fontSize="1.8rem">Name</FormLabel>
              <Input
                type="text"
                placeholder="vivek"
                size="lg"
                fontSize="2rem"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </HStack>
          </FormControl>

          <FormControl isRequired mt={6}>
            <HStack mb={4}>
              <FormLabel fontSize="1.8rem">upload</FormLabel>
              <Input
                type="file"
                size="lg"
                variant="filled"
                onChange={async (e) => {
                  const avatar = await uploadImage(
                    e.target.files[0],
                    setIsUploadLoading
                  );
                  setAvatar(avatar)
                  setIsUploadLoading(false);
                }}
              />
              {isUploadLoading && (
                <CircularProgress isIndeterminate size="24px" color="teal" />
              )}
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

export default Register;
