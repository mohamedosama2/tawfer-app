// Need to use the React-specific entry point to allow generating React hooks
import { createApi } from "@reduxjs/toolkit/query/react";
import type { AddFood, FoodPagination } from "../../models/Food.model";
import { PaginationParams } from "../../models/pagination.model";
import { axiosBaseQuery } from "../types";

// Define a service using a base URL and expected endpoints
export const foodApi = createApi({
  reducerPath: "foodApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "",
  }),
  endpoints: (builder) => ({
    getFood: builder.query<FoodPagination, PaginationParams>({
      query: ({ token }) => ({
        url: `food`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    addFood: builder.query<void, AddFood>({
      query: ({ token, ...restFoodParams }) => {
        const form = new FormData();
        for (const [key, value] of Object.entries(restFoodParams)) {
          console.log(`${key}: ${value}`);
          form.append(key, value.toString());
        }
        return {
          url: `food`,
          data: form,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetFoodQuery,useAddFoodQuery } = foodApi;
