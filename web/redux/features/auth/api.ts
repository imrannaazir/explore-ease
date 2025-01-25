import baseApi from "@/redux/base-api";
import { TSignUpProps, TUser } from "@/types";
import { TResponse } from "@/types/api.types";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
  useVerifyAccountMutation,
  useSignUpMutation,
  useSignInMutation,
  useResentVerificationEmailMutation,
} = authApi;
