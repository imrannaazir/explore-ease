import baseApi from "./base-api";
import { authReducer } from "./features/auth/slice";

const rootReducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
};
export default rootReducer;
