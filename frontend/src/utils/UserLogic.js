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
      allCategory.push({value : product.category, label : product.category});
    });
    var unique = Array.from(new Set(allCategory.map(JSON.stringify))).map(JSON.parse);
    setDistinctCategory(unique);
  }

  // check if featuredProduct exists or not
  if (featuredProducts.length == 0) {
    const newFeatureProduct = products.map((product) => {
      return { url: product.images[0].url , desc : product.description , name : product.name , id : product._id };
    });
    setFeaturedProducts(newFeatureProduct.slice(0, 4));
  }
};



export const getSingleProduct = async (id,setCurProduct,setCurrReview)=>{
  const res = await axios.get("http://localhost:4000/api/v1/products/"+id)
  setCurProduct(res.data.product)
  setCurrReview(res.data.reviews)
}

export const updateReview = async(body) => {
  const instance = axios.create({
    withCredentials: true,
  });
  try{
  console.log(body)  
  const res = await instance.put("http://localhost:4000/api/v1/review",body)
  // console.log(res.data)
  }catch(e){
    console.log(e)
  }
   
}


export const getReview = async(id,setReviews) => {
  try{
  const res = await axios.get("http://localhost:4000/api/v1/reviews?id="+id)
  console.log(res)
  setReviews(res.data.reviews)
  }catch(e){
    console.log(e)
  }
  
}