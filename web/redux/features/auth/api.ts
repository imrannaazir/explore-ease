import baseApi from "@/redux/base-api";
import { TagTypes } from "@/redux/tag-types";
import { TSignUpProps, TUser } from "@/types";
import { TResponse } from "@/types/api.types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<TResponse<TUser>, unknown>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: [TagTypes.USER],
    }),

    signUp: builder.mutation<TResponse<TUser>, unknown>({
      query: (data: TSignUpProps) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword: _, ...restData } = data;
        return {
          url: "/auth/sign-up",
          method: "POST",
          data: restData,
        };
      },

      invalidatesTags: [TagTypes.USER],
    }),
    signIn: builder.mutation<TResponse<null>, unknown>({
      query: (data: TSignUpProps) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return {
          url: "/auth/sign-in",
          method: "POST",
          data: data,
        };
      },
      invalidatesTags: [TagTypes.USER],
    }),

    signOut: builder.mutation<TResponse<null>, unknown>({
      query: () => ({
        url: "/auth/sign-out",
        method: "POST",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          // Wait for the `signOut` API call to succeed
          await queryFulfilled;

          // Clear the `getMe` cache manually
          dispatch(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            authApi.util.updateQueryData("getMe", undefined, (draft) => {
              // Mutate the draft data to clear it
              return undefined; // Reset the data
            })
          );
        } catch (err) {
          console.error("Sign-out failed", err);
        }
      },
    }),

    resentVerificationEmail: builder.mutation<TResponse<null>, unknown>({
      query: ({ email }) => {
        console.log(email, "blah email");

        return {
          url: "/auth/resend-verification-mail",
          method: "POST",
          data: { email },
        };
      },
    }),

    verifyAccount: builder.mutation<TResponse<null>, unknown>({
      query: (token) => ({
        url: "/auth/verify-account",
        method: "POST",
        data: { token },
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useSignInMutation,
  useSignUpMutation,
  useSignOutMutation,
  useVerifyAccountMutation,
  useResentVerificationEmailMutation,
} = authApi;
