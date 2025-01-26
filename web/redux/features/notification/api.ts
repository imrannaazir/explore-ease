import baseApi from "@/redux/base-api";
import { TagTypes } from "@/redux/tag-types";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query({
      query: () => ({
        url: `/notifications/me/get-all`,
      }),
      providesTags: [TagTypes.NOTIFICATION],
    }),
    markNotificationsRead: builder.mutation({
      query: () => ({
        url: `/notifications/mark-as-read`,
        method: "PATCH",
      }),
      invalidatesTags: [TagTypes.NOTIFICATION],
    }),
    deleteNotificationById: builder.mutation({
      query: (notificationId: string) => ({
        url: `/notifications/delete/${notificationId}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.NOTIFICATION],
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useMarkNotificationsReadMutation,
  useDeleteNotificationByIdMutation,
} = notificationApi;
