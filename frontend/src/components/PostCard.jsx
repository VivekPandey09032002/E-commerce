import {
    Avatar,
    AvatarBadge,
    Button,
    Flex,
    Heading,
    HStack,
    Image,
    Stack,
    Text,
    VStack,
  } from "@chakra-ui/react";
  import React from "react";
  import { Link } from "react-router-dom";
  
  const PostCard = ({user}) => {
    const {avatar,name,email,role} = user;
    console.log("avatar",user)
    return (
      <Flex justify="center" align="center">
        <Stack width="500px" boxShadow="md" borderRadius="xl">
          <Image w="100%" h={500} src={avatar.url} alt="profile image" />
          <Stack  p="2">
            <HStack  alignItems="right" justifyContent="space-around">
               <Text  fontWeight="400">Name: {name}</Text>
               <Text  fontWeight="400">role: {role}</Text>
            </HStack>
            <Text p={2} fontWeight="500">email: {email}</Text>
          </Stack>
        </Stack>
      </Flex>
    );
  };
  
  export default PostCard;