import baseApi from "@/redux/base-api";
import { TagTypes } from "@/redux/tag-types";
import { TBooking, TExpedition, TExpeditionInput, TResponse } from "@/types";

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
    getSingleExpedition: builder.query<TResponse<TExpedition>, unknown>({
      query: (id) => ({
        url: `/expeditions/get-single/${id}`,
        method: "GET",
      }),
      providesTags: [TagTypes.EXPEDITION],
    }),
    bookExpedition: builder.mutation<TResponse<TBooking>, unknown>({
      query: ({
        seats,
        expeditionId,
      }: {
        seats: number;
        expeditionId: string;
      }) => ({
        url: `/bookings/book/${expeditionId}`,
        method: "POST",
        data: { seats },
      }),
      invalidatesTags: [TagTypes.EXPEDITION],
    }),
  }),
});

export const {
  usePostExpeditionMutation,
  useGetAllExpeditionQuery,
  useGetSingleExpeditionQuery,
  useBookExpeditionMutation,
} = expeditionApi;
