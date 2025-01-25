import baseApi from "@/redux/base-api";
import { TagTypes } from "@/redux/tag-types";
import { TExpedition, TExpeditionInput, TResponse } from "@/types";

const expeditionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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

export const { usePostExpeditionMutation } = expeditionApi;
