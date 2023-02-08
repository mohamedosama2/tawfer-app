// Need to use the React-specific entry point to allow generating React hooks
import { createApi } from "@reduxjs/toolkit/query/react";
import type { User } from "../../models/User.model";
import { axiosBaseQuery } from "../types";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "http://localhost:4000",
  }),
  endpoints: (builder) => ({
    getProfile: builder.query<User, void>({
      query: () => ({ url: `/users/profile` }),
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetProfileQuery } = userApi;
