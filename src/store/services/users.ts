// Need to use the React-specific entry point to allow generating React hooks
import { createApi } from "@reduxjs/toolkit/query/react";
import type { User } from "../../models/User.model";
import type { TokenInput } from "../../models/pagination.model";
import { axiosBaseQuery } from "../types";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    getProfile: builder.query<User, TokenInput>({
      query: ({ token }) => ({
        url: `/users/profile`,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetProfileQuery } = userApi;
