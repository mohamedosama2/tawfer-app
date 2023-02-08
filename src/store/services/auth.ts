import { createApi } from "@reduxjs/toolkit/query/react";
import type { User } from "../../models/User.model";
import { axiosBaseQuery } from "../types";

// Define a service using a base URL and expected endpoints

interface SignUp {
  username: string;
  password: string;
  phone: string;
}
interface LogIn {
  password: string;
  phone: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "http://localhost:4000", ////BEGAIN HERE
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<User, SignUp>({
      query: (userData) => ({
        url: `auth/signup`,
        method: "POST",
        data: userData,
      }),
    }),
    logIn: builder.mutation<LoginResponse, LogIn>({
      query: (userData) => {
        console.log(userData);
        return {
          url: `/auth/login`,
          method: "POST",
          data: userData,
        };
      },
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useLogInMutation, useSignUpMutation } = authApi;
