// Need to use the React-specific entry point to allow generating React hooks
import { createApi } from "@reduxjs/toolkit/query/react";
import type {
  AddToFavourits,
  Category,
  CategoryPagination,
} from "../../models/Category.model";
import { PaginationParams, TokenInput } from "../../models/pagination.model";
import { axiosBaseQuery } from "../types";

// Define a service using a base URL and expected endpoints
export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "",
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryPagination, PaginationParams>({
      query: ({ token }) => ({
        url: `categories`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getMyFavourits: builder.query<Array<Category>, TokenInput>({
      query: ({ token }) => ({
        url: `categories/favourits`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    addToFavourits: builder.mutation<void, AddToFavourits>({
      query: ({ id, token }) => ({
        url: `categories/makeFavourite`,
        method: "POST",
        data: { id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    removeFromFavourits: builder.mutation<void, AddToFavourits>({
      query: ({ id, token }) => ({
        url: `categories/removeFavourite`,
        method: "POST",
        data: { id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetCategoriesQuery,
  useAddToFavouritsMutation,
  useGetMyFavouritsQuery,
  useRemoveFromFavouritsMutation,
} = categoryApi;
