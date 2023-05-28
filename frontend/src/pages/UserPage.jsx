import {
  Container,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Stack,
  VStack,
  FormControl,
  FormLabel,
  Button,
  Input,
  useColorModeValue,
  FormHelperText,
  Flex,
  CircularProgress,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../components/PostCard";
import { changePassword, fetchUser, sendResetEmail } from "../store/userSlice";
import { STATUS } from "../utils/status";
import Loading from "../components/Loading";
import { NavLink } from "react-router-dom";

function UserPage() {
  const [pass, setPass] = useState("");
  const [cpass, setCPass] = useState("");
  const [link, setLink] = useState("");
  const textColor = useColorModeValue("gray.600", "whiteAlpha.600");
  const dispatch = useDispatch();
  const {
    data: user,
    status: userStatus,
    msg: userError,
  } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0;
  };

  if (user.status === STATUS.LOADING) return <Loading />;

  if (isObjectEmpty(user))
    return (
      <>
        <Breadcrumb m={5} fontSize={25}>
          <BreadcrumbItem>
            <BreadcrumbLink as={NavLink} to="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink as={NavLink} to="/user">
              User
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Login in first</AlertTitle>
          <AlertDescription>
            login with your credinatial to access this resource
          </AlertDescription>
        </Alert>
      </>
    );

  function handlePasswordChange(e, url) {
    e.preventDefault();
    if (link.length > 0) {
      const body = { password: pass, confirmPassword: cpass, url: link };
      dispatch(changePassword(body));
    }
  }
  return (
    <Container maxW="container.xl" mt={30} minH="40vh">
      <Stack direction={["column", "column", "row"]} spacing={15}>
        <PostCard user={user} />
        <Box flexBasis="100%">
          {userStatus == STATUS.ERROR && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Error Occurred</AlertTitle>
              <AlertDescription>
                {userError.length > 0 && userError}
              </AlertDescription>
            </Alert>
          )}

          <Accordion p={4} allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Send Reset Password Mail
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <VStack align="flex-start" p={3}>
                  <Button
                    variant="ghost"
                    color={textColor}
                    w="full"
                    onClick={(e) => 
                      dispatch(sendResetEmail({ email: user.email }))
                    }
                  >
                    {userStatus == STATUS.LOADING ? (
                      <CircularProgress
                        value={40}
                        color="orange.400"
                        thickness="8px"
                        isIndeterminate
                      />
                    ) : (
                      "Click Here to send reset password email"
                    )}
                  </Button>
                  <FormControl>
                    <FormLabel>paste your link here</FormLabel>
                    <Input
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                    />
                    <FormHelperText>Enter your new password</FormHelperText>
                  </FormControl>
                  <Flex wrap={["wrap", "wrap", "nowrap"]} gap={10} w="full">
                    <FormControl>
                      <FormLabel>password</FormLabel>
                      <Input
                        type="password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                      />
                      <FormHelperText>Enter your new password</FormHelperText>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Cofirm Password</FormLabel>
                      <Input
                        type="password"
                        value={cpass}
                        onChange={(e) => setCPass(e.target.value)}
                      />
                      <FormHelperText>Confirm the password!!!</FormHelperText>
                    </FormControl>
                  </Flex>
                  <Button
                    variant="ghost"
                    color={textColor}
                    w="full"
                    onClick={(e) => handlePasswordChange(e, link)}
                    disabled={userStatus == STATUS.LOADING ? true : false}
                  >
                    {userStatus == STATUS.LOADING ? (
                      <CircularProgress
                        value={40}
                        color="orange.400"
                        thickness="8px"
                        isIndeterminate
                      />
                    ) : (
                      "Click Here to reset password"
                    )}
                  </Button>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Stack>
    </Container>
  );
}

export default UserPage;
