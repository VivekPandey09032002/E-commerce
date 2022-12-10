export const myProductsReducer = (state, action) => {
  console.log(action.payload);
  switch (action.type) {
    case "NEW_PRODUCTS":
      return { ...state, products: action.payload };
    case "SEARCH_STR":
      return { ...state, searchStr: action.payload };
    default:
      return state;
  }
};

export const myUsersReducer = (state, action) => {
  switch (action.type) {
    case "SET_PAYLOAD":
      state[action.name] = action.payload;
      return { ...state };
    case "REGISTER_USER":
      return { ...state };
    case "LOGIN_USER":
      return { ...state };
  }
};
