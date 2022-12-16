import axios from "axios";

export const getUser = (setUserDetail) => {
  const instance = axios.create({
    withCredentials: true,
  });

  instance
    .get("http://localhost:4000/api/v1/me")
    .then((res) => {
      setUserDetail(res.data.user);
    })
    .catch((e) => {
      console.log(e.message);
    });
};

export const getProducts = async (
  productsState,
  dispatchState,
  setDistinctCategory,
  setFeaturedProducts,
  featuredProducts,
  distinctCategory
) => {
  const { category, searchStr, pages, price_lte, price_gte } = productsState;
  const baseUrl = `http://localhost:4000/api/v1/products?keyword=${searchStr}`;
  let url = baseUrl;

  if (category.length != 0) {
    url += `&category=${category}`;
  }
  if (!Number.isNaN(pages)) {
    url += `&page=${pages}`;
  }
  if (!Number.isNaN(price_lte)) {
    url += `&price[lte]=${price_lte}`;
  }
  if (!Number.isNaN(price_gte)) {
    url += `&price[gte]=${price_gte}`;
  }
  const res = await axios.get(url);
  dispatchState({ type: "GET_PRODUCTS", payload: res.data.products });
  const products = res.data.products;
  // check if distinctCategory exist or not
  if (distinctCategory.length == 0) {
    const allCategory = [];

    products.forEach((product) => {
      allCategory.push({ value: product.category, label: product.category });
    });
    var unique = Array.from(new Set(allCategory.map(JSON.stringify))).map(
      JSON.parse
    );
    setDistinctCategory(unique);
  }
  // check if featuredProduct exists or not
  if (featuredProducts.length == 0) {
    const newFeatureProduct = products.map((product) => {
      return {
        url: product.images[0].url,
        name: product.name,
        id: product._id,
        rating: product.ratings,
        category: product.category,
        price: product.price,
      };
    });
    setFeaturedProducts(
      newFeatureProduct.sort(() => 0.5 - Math.random()).slice(0, 3)
    );
  }
};

export const getSingleProduct = async (id, setCurProduct, setCurrReview) => {
  const res = await axios.get("http://localhost:4000/api/v1/products/" + id);
  setCurProduct(res.data.product);
  setCurrReview(res.data.product.reviews);
};

export const updateReview = async (body, id, setReview) => {
  const instance = axios.create({
    withCredentials: true,
  });
  try {
    if (body.length == 0) return;
    console.log("hello",body.rating,body.comment, body.productId)    
    const res = await instance.put("http://localhost:4000/api/v1/review", body);
    const res2 = await axios.get(
      "http://localhost:4000/api/v1/reviews?id=" + id
    );
    setReview(res2.data.reviews);
  } catch (e) {
    console.log(e);
  }
};
