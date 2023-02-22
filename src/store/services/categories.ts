// Need to use the React-specific entry point to allow generating React hooks
import { createApi } from "@reduxjs/toolkit/query/react";
import type {
  AddToFavourits,
  Category,
  CategoryAndIsFav,
  CategoryPagination,
} from "../../models/Category.model";
import { PaginationParams, TokenInput } from "../../models/pagination.model";
import { axiosBaseQuery } from "../types";

// Define a service using a base URL and expected endpoints
export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: axiosBaseQuery({
    baseUrl: `/api`,
  }),
  tagTypes: ["Favourits"],
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryPagination, PaginationParams>({
      query: ({ token }) => ({
        url: `/categories`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    getCategory: builder.query<CategoryAndIsFav, { id: string; token: string }>(
      {
        query: ({ token, id }) => ({
          url: `/categories/${id}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        providesTags: ["Favourits"],
      }
    ),
    getMyFavourits: builder.query<Array<Category>, TokenInput>({
      query: ({ token }) => ({
        url: `/categories/favourits`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Favourits"],
    }),
    addToFavourits: builder.mutation<void, AddToFavourits>({
      query: ({ id, token }) => ({
        url: `/categories/makeFavourite?id=${id}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Favourits"],
    }),
    removeFromFavourits: builder.mutation<void, AddToFavourits>({
      query: ({ id, token }) => ({
        url: `/categories/removeFavourite?id=${id}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Favourits"],
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
  useGetCategoryQuery,
} = categoryApi;
