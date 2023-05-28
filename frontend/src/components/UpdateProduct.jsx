import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormLabel,
    GridItem,
    Input,
    SimpleGrid,
    Textarea,
    VStack,
    useToast,
} from "@chakra-ui/react";
import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../store/productSlice";
import { uploadImage } from "../utils/apiCalls";
import { STATUS } from "../utils/status";
import RenderError from "./RenderError";

function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [ratings, setRatings] = useState(0);
  const [images, setImages] = useState([]);
  const [avatar, setAvatar] = useState({});
  const [isUploadLoading, setIsUploadLoading] = useState();

  const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0;
  };

  const dispatch = useDispatch();
  const toast = useToast();
  const { status, message } = useSelector((state) => state.products);

  if (status === STATUS.ERROR) {
  }
  return (
    <VStack
      w="full"
      h="full"
      p={10}
      spacing={10}
      justifyContent={"space-between"}
    >
      <Box>
        {status === STATUS.ERROR && (
          <RenderError
            second="admin"
            primaryMsg="cannot add product"
            secondaryMsg={message}
          />
        )}
      </Box>

      <SimpleGrid
        style={{ width: "100%" }}
        columns={2}
        columnGap={3}
        rowGap={4}
      >
        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel>Product name</FormLabel>
            <Input
              placeholder="Enter product name "
              pattern="[0-0]+"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel>Product price</FormLabel>
            <Input
              placeholder="Enter product price "
              pattern="[0-0]+"
              value={price}
              onChange={(e) => {
                let val = e.target.value.match(/^[0-9]*$/);
                if (val === null) return;
                setPrice(val[0]);
              }}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl isRequired>
            <FormLabel>Product Description</FormLabel>
            <Textarea
              placeholder="Enter product description... "
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel>Category</FormLabel>
            <Input
              placeholder="Enter product category "
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel>Stocks</FormLabel>
            <Input
              placeholder="Enter current stock "
              value={stock}
              onChange={(e) => {
                let val = e.target.value.match(/^[0-9]*$/);
                if (val === null) return;
                setStock(val[0]);
              }}
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel>Rating</FormLabel>
            <Input
              placeholder="Enter current rating "
              value={ratings}
              onChange={(e) => {
                let val = e.target.value.match(/^[0-9]*$/);
                if (val === null) return;
                setRatings(val[0]);
              }}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl isRequired>
            <FormLabel> Add Image</FormLabel>
            {isUploadLoading && (
              <CircularProgress isIndeterminate size="24px" color="teal" />
            )}
            <Input
              type="file"
              id="file"
              accept="image/*"
              onChange={async (e) => {
                const avatar = await uploadImage(
                  e.target.files[0],
                  setIsUploadLoading
                );
                if (isObjectEmpty(avatar)) {
                  toast({
                    title: "cannot add image",
                    description: "failed to add image",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  });
                } else {
                  toast({
                    title: "successfully to add image",
                    description: "upload more image if you want",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                }
                setAvatar(avatar);
                setIsUploadLoading(false);
                setImages((images) => [...images, avatar]);
              }}
            />
          </FormControl>
        </GridItem>

        <GridItem colSpan={2}>
          <Button
            variant="primary"
            width="full"
            size="lg"
            onClick={() => {
              dispatch(
                addProduct({
                  name,
                  price,
                  description,
                  category,
                  stock,
                  ratings,
                  images,
                })
              ).then((data) => {
                console.log(data);
                if (!data.error) {
                  toast({
                    title: "product added",
                    description: "new product added succesfully succesfully",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });

                  setName("");
                  setPrice(0);
                  setDescription("");
                  setCategory("");
                  setStock(0);
                  setRatings(0);
                  setImages([]);
                }
              });
            }}
          >
            Add new Product
          </Button>
        </GridItem>
      </SimpleGrid>
    </VStack>
  );
}

export default UpdateProduct;
