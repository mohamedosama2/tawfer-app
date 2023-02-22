// Need to use the React-specific entry point to allow generating React hooks
import { createApi } from "@reduxjs/toolkit/query/react";
import type { User } from "../../models/User.model";
import type { TokenInput } from "../../models/pagination.model";
import { axiosBaseQuery } from "../types";
import type { NotificationSubscribe } from "../../models/Notification.model";

// Define a service using a base URL and expected endpoints
export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "/notification",
  }),
  endpoints: (builder) => ({
    subscribe: builder.mutation<void, NotificationSubscribe>({
      query: ({ token, NotificationToken, type = "web" }) => ({
        url: `/Notifications/subscribe`,
        method: "POST",
        data: { token: NotificationToken },
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useSubscribeMutation } = notificationApi;
