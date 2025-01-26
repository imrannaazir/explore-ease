import { BookingStatus } from "@/constants";
import baseApi from "@/redux/base-api";
import { TagTypes } from "@/redux/tag-types";
import {
  TBooking,
  TBookingPerMonth,
  TExpedition,
  TExpeditionInput,
  TPopularDestination,
  TResponse,
} from "@/types";

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
    getAllMyBookedExpeditions: builder.query<TResponse<TBooking[]>, unknown>({
      query: () => {
        return {
          url: "/bookings/get-my",
          method: "GET",
        };
      },
      providesTags: [TagTypes.EXPEDITION, TagTypes.BOOKING],
    }),

    getAllBookedExpeditions: builder.query<TResponse<TBooking[]>, unknown>({
      query: () => {
        return {
          url: "/bookings/get-all",
          method: "GET",
        };
      },
      providesTags: [TagTypes.EXPEDITION, TagTypes.BOOKING],
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
    updateBooking: builder.mutation<TResponse<TBooking>, unknown>({
      query: ({
        bookingId,
        status,
      }: {
        status: BookingStatus;
        bookingId: string;
      }) => ({
        url: `/bookings/update/${bookingId}`,
        method: "POST",
        data: { status },
      }),
      invalidatesTags: [TagTypes.EXPEDITION, TagTypes.BOOKING],
    }),
    getBookingsPerMonth: builder.query<TResponse<TBookingPerMonth[]>, unknown>({
      query: () => ({
        url: `/bookings/get-bookings-per-month`,
        method: "GET",
      }),
    }),

    getPopularDestinations: builder.query<
      TResponse<TPopularDestination[]>,
      unknown
    >({
      query: () => ({
        url: `/expeditions/get-popular-destination`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  usePostExpeditionMutation,
  useGetAllExpeditionQuery,
  useGetSingleExpeditionQuery,
  useBookExpeditionMutation,
  useGetAllMyBookedExpeditionsQuery,
  useGetAllBookedExpeditionsQuery,
  useUpdateBookingMutation,
  useGetBookingsPerMonthQuery,
  useGetPopularDestinationsQuery,
} = expeditionApi;
