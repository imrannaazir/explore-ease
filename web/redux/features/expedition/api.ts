import baseApi from "@/redux/base-api";
import { TagTypes } from "@/redux/tag-types";
import { TExpedition, TExpeditionInput, TResponse } from "@/types";

const expeditionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllExpedition: builder.query<TResponse<TExpedition[]>, unknown>({
      query: (query: Record<string, string>) => {
        const params = new URLSearchParams();
        if (query) {
          Object.keys(query).forEach((key) => {
            params.append(key, query[key]);
          });
        }
        return {
          url: "/expeditions/get-all",
          method: "GET",
          params,
        };
      },
      providesTags: [TagTypes.EXPEDITION],
    }),
    postExpedition: builder.mutation<TResponse<TExpedition>, unknown>({
      query: (data: TExpeditionInput) => ({
        url: "/expeditions/post",
        method: "POST",
        data,
      }),
      invalidatesTags: [TagTypes.EXPEDITION],
    }),
  }),
});

export const { usePostExpeditionMutation, useGetAllExpeditionQuery } =
  expeditionApi;
