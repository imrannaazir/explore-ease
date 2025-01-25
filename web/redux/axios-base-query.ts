import { TError } from "@/types/api.types";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError, AxiosRequestConfig } from "axios";
import axiosInstance from "./axios-instance";

const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    TError
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorData: any = err?.response?.data;

      return {
        error: {
          message: errorData?.message,
          success: false,
          statusCode: err.response?.status,
          errorSources: errorData?.errorSources,
        } as TError,
      };
    }
  };

export default axiosBaseQuery;
