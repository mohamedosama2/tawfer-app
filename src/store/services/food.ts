// Need to use the React-specific entry point to allow generating React hooks
import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import type {
  AddFood,
  Food,
  FoodInput,
  FoodPagination,
} from "../../models/Food.model";
import { axiosBaseQuery } from "../types";

// Define a service using a base URL and expected endpoints
export const foodApi = createApi({
  reducerPath: "foodApi",
  baseQuery: axiosBaseQuery({
    baseUrl: `/api`,
  }),
  tagTypes: ["Food"],
  endpoints: (builder) => ({
    getFood: builder.query<FoodPagination, FoodInput>({
      query: ({ token, category }) => {
        return {
          url: `/food?category=${category}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["Food"],
    }),

    addFood: builder.mutation<Food, AddFood>({
      query: ({ token, ...restFoodParams }) => {
        const form = new FormData();
        for (const [key, value] of Object.entries(restFoodParams)) {
          console.log(`${key}: ${value}`);
          form.append(key, value.toString());
        }
        return {
          url: `/food`,
          method: "POST",
          data: form,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      async onQueryStarted({ ...patch }, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { _id },
          } = await queryFulfilled;
          await axios.post(
            `/api/categories/send-fans?id=${_id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
        } catch {}
      },
      invalidatesTags: ["Food"],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetFoodQuery, useAddFoodMutation } = foodApi;
