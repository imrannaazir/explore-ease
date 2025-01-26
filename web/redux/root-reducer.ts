import baseApi from "./base-api";
import { authReducer } from "./features/auth/slice";
import { notificationReducer } from "./features/notification/slice";

const rootReducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  notification: notificationReducer,
};
export default rootReducer;
