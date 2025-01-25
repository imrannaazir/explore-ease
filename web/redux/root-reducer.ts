import baseApi from "./base-api";

const rootReducer = {
  [baseApi.reducerPath]: baseApi.reducer,
};
export default rootReducer;
