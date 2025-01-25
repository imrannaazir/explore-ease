import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axios-base-query";
import { TagTypeList } from "./tag-types";

const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  tagTypes: TagTypeList,
});
export default baseApi;
