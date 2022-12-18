import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Input,
  SimpleGrid,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react"

import React from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeStatus, placeProduct } from "../store/shippingSlice"
import { shippingDetails } from "../utils/UserLogic"

import { STATUS } from "../utils/status"
import { removeAll } from "../store/cartSlice"
import { useNavigate } from "react-router-dom"

const YourDetails = () => {
  const [phoneNo, setPhoneNo] = useState("")
  const [pinCode, setPinCode] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useToast()
  const { data: cart, price } = useSelector((state) => state.cart)
  const { data: shipping, status: shippingStatus } = useSelector(
    (state) => state.shipping
  )

  if (shippingStatus == STATUS.SUCCESS) {
    dispatch(changeStatus(STATUS.IDLE))
    localStorage.removeItem("cart")
    dispatch(removeAll())
    setTimeout(() => {
      navigate("/")
    }, 1000)
  }
  if (shippingStatus == STATUS.ERROR) {
    dispatch(changeStatus(STATUS.IDLE))
  }
  return (
    <VStack w="full" h="full" p={10} spacing={10} align="flex-start">
      <VStack spacing={2} align="flex-start">
        {shippingStatus == STATUS.SUCCESS &&
          toast({
            title: "Successfully placed order",
            description: "We've created your order",
            status: "success",
            duration: 3000,
            isClosable: true,
          })}
        {shippingStatus == STATUS.ERROR &&
          toast({
            title: "Error while placing order",
            description: "Fill all the shipping details to place order",
            status: "error",
            duration: 9000,
            isClosable: true,
          })}
        <Heading>Your Details</Heading>
        <Text>If you already have an account, click here to log in.</Text>
      </VStack>
      <SimpleGrid columns={2} columnGap={3} rowGap={4}>
        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel>Phone No</FormLabel>
            <Input
              placeholder="Enter phone number "
              pattern="[0-0]+"
              value={phoneNo}
              onChange={(e) => {
                let val = e.target.value.match(/^[0-9]*$/)
                if (val === null) return
                setPhoneNo(val[0])
              }}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel>pinCode</FormLabel>
            <Input
              placeholder="Enter pin code "
              pattern="[0-0]+"
              value={pinCode}
              onChange={(e) => {
                let val = e.target.value.match(/^[0-9]*$/)
                if (val === null) return
                setPinCode(val[0])
              }}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl isRequired>
            <FormLabel>Address</FormLabel>
            <Textarea
              placeholder="Enter Your Address... "
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel>City</FormLabel>
            <Input
              placeholder="Enter City "
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel>State</FormLabel>
            <Input
              placeholder="Enter City "
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl>
            <Checkbox>Ship to the billing address.</Checkbox>
          </FormControl>
        </GridItem>

        <GridItem colSpan={2}>
          <Button
            variant="primary"
            width="full"
            size="lg"
            onClick={() => {
              const details = shippingDetails(
                cart,
                price,
                phoneNo,
                pinCode,
                address,
                city,
                state
              )
              if (cart.length == 0) return
              dispatch(placeProduct(details))
              setPhoneNo("")
              setPhoneNo("")
              setAddress("")
              setCity("")
              setState("")
            }}
          >
            Place Order
          </Button>
        </GridItem>
      </SimpleGrid>
    </VStack>
  )
}

export default YourDetails
