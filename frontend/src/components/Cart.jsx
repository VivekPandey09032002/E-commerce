import {
  AspectRatio,
  Button,
  Container,
  Divider,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const Cart = ({ cart, setCart }) => {
  console.log(cart)
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");
  const textColor = useColorModeValue("gray.600", "whiteAlpha.600");
  return (
    <VStack w="full" h="full" p={3} spacing={6} align="flex-start" bg={bgColor}>
      <VStack alignItems="flex-start" spacing={3}>
        <Heading size="2xl">Your cart</Heading>
        <Text>
          If the price is too hard on your eyes,{" "}
          <Button
            onClick={toggleColorMode}
            variant="outline"
            colorScheme="black"
          >
            try changing the theme.
          </Button>
        </Text>
      </VStack>
      <VStack spacing={4} alignItems="stretch" w="full" overflowY="auto">
        {cart.map((item) => (
          <HStack key={item.id} spacing={6} alignItems="center" w="full">
            <AspectRatio ratio={1} w={24}>
              <Image src={item.image} alt="Skateboard" />
            </AspectRatio>
            <Stack
              spacing={0}
              w="full"
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <VStack w="full" spacing={0} alignItems="flex-start">
                <Heading size="md">{item.name.substring(0, 12)}</Heading>
                <Text color={textColor}>{item.product}</Text>
              </VStack>
              <Heading size="sm" textAlign="end" p={2}>
               ${item.price}
              </Heading>
            </Stack>
          </HStack>
        ))}
      </VStack>

      <VStack spacing={4} alignItems="stretch" w="full">
        <HStack justifyContent="space-between">
          <Text color={textColor}>Subtotal</Text>
          <Heading size="sm">$119.00</Heading>
        </HStack>
        <HStack justifyContent="space-between">
          <Text color={textColor}>Shipping</Text>
          <Heading size="sm">$19.99</Heading>
        </HStack>
        <HStack justifyContent="space-between">
          <Text color={textColor}>Taxes (estimated)</Text>
          <Heading size="sm">$23.80</Heading>
        </HStack>
      </VStack>
      <Divider />
      <HStack justifyContent="space-between" w="full">
        <Text color={textColor}>Total</Text>
        <Heading size="lg">$162.79</Heading>
      </HStack>
    </VStack>
  );
};

export default Cart;
