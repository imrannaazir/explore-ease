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
  }),
});

export const { useSignUpMutation } = authApi;
