import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { STATUS } from "../utils/status";

const initialState = {
  data: [],
  productCount: 0,
  status: "idle",
  message: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload.productDetail;
        state.productCount = action.payload.productCount;
        state.status = STATUS.IDLE;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = STATUS.ERROR;
      })
      .addCase(fetchProductsWithFilters.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchProductsWithFilters.fulfilled, (state, action) => {
        state.data = action.payload.productDetail;
        state.productCount = action.payload.productCount;
        state.status = STATUS.IDLE;
      })
      .addCase(fetchProductsWithFilters.rejected, (state, action) => {
        state.status = STATUS.ERROR;
      })
      .addCase(addProduct.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = STATUS.IDLE;
        state.message = "";
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = STATUS.ERROR;
        state.message = action.error.message;
      })
      .addCase(deleteProductById.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(deleteProductById.fulfilled, (state, action) => {
        state.status = STATUS.IDLE;
        state.message = "";
      })
      .addCase(deleteProductById.rejected, (state, action) => {
        state.status = STATUS.ERROR;
        state.message = action.error.message;
      });
  },
});

// export const {} = productSlice.actions
export default productSlice.reducer;

//Thunks

export const deleteProductById = createAsyncThunk(
  "products/delete",
  async (id) => {
    console.log("my id ", id)
    const instance = axios.create({
      withCredentials: true,
    });
    try {
      await instance.delete("http://localhost:4000/api/v1/admin/products/" + id );
    } catch (e) {
      throw new Error(e.response.data.message);
    }
  }
);

export const addProduct = createAsyncThunk("products/add", async (body) => {
  const instance = axios.create({
    withCredentials: true,
  });
  try {
    const res = await instance.post(
      "http://localhost:4000/api/v1/admin/products/new",
      body
    );
    const { product } = res.data;
    return { product };
  } catch (e) {
    throw new Error(e.response.data.message);
  }
});

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await axios.get("http://localhost:4000/api/v1/products");
  const { products, productCount } = res.data;
  const productDetail = [];
  products.map((product, index) => {
    const {
      _id: productId,
      description,
      category,
      images,
      name,
      price,
      stock,
      user: userID,
      ratings,
      user: userId,
      createdAt: date,
    } = product;

    productDetail.push({
      productId,
      category,
      description,
      images,
      name,
      price,
      stock,
      userID,
      id: index,
      rating: ratings,
      userId,
      date,
    });
  });
  return { productDetail, productCount };
});

export const fetchProductsWithFilters = createAsyncThunk(
  "productsFilter/fetch",
  async (body) => {
    const { searchStr, category, page, price_lte, price_gte } = body;
    const baseUrl = `http://localhost:4000/api/v1/products?keyword=${searchStr}`;
    let url = baseUrl;

    if (category !== null && category.length != 0) {
      url += `&category=${category}`;
    }
    if (page !== undefined && !Number.isNaN(page)) {
      url += `&page=${page}`;
    }
    if (price_lte !== undefined && !Number.isNaN(price_lte)) {
      url += `&price[lte]=${price_lte}`;
    }
    if (price_gte != undefined && !Number.isNaN(price_gte)) {
      url += `&price[gte]=${price_gte}`;
    }
    console.log("yaha tak chala ", url);
    const res = await axios.get(url);
    const { products, productCount } = res.data;
    const productDetail = [];
    products.map((product, index) => {
      const {
        _id: productId,
        description,
        category,
        images,
        name,
        price,
        stock,
        user: userID,
        ratings,
        user: userId,
        createdAt: date,
      } = product;

      productDetail.push({
        productId,
        category,
        description,
        images,
        name,
        price,
        stock,
        userID,
        id: index,
        rating: ratings,
        userId,
        date,
      });
    });
    return { productDetail, productCount };
  }
);
