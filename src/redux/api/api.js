import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/` }),
  tagTypes: ["Chat", "User", "Message"], // * agr kisi or page pr jaake to fetch hua data
  // * chache m se is naam se le sake
  // * Bydefault fetch chache m hota h wapas fetch nii hota.
  endpoints: (builder) => ({
    myChats: builder.query({
      query: () => ({
        url: "chat/my",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),

    searchUser: builder.query({
      query: (name) => ({
        url: `user/search?name=${name}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),

    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: `user/send-request`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["User"], //* friend request bhjte hi refetch hoga providedTags m jo User wale h
    }),

    getMyNotifications: builder.query({
      query: () => ({
        url: "user/notifications",
        credentials: "include",
      }),
      keepUnusedDataFor: 0, //* Iska mtlb koi chaching nii kr rhe hum, mtlb data hr time real fetch hoga
    }),

    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: `user/accept-request`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Chat"], //* friend request accept ya reject krke
      //* bhjte hi refetch hoga providedTags m jo Chat wale h
    }),

    chatDetails: builder.query({
      query: ({ chatId, populate = false }) => {
        let url = `chat/${chatId}`;
        if (populate) url += "?populate=true";

        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["Chat"],
    }),

    getOldMessages: builder.query({
      query: ({ chatId, page }) => ({
        url: `chat/message/${chatId}?page=${page}`,
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),

    sendAttachments: builder.mutation({
        query: (data) => ({
            url: `chat/message`,
            method: "POST",
            credentials: "include",
            body: data
        }),
    }),

    myGroups: builder.query({
        query: () => ({
            url: `chat/my/groups`,
            credentials: "include"
        }),
        providesTags: ["Chat"]
    }),

    availableFriends: builder.query({
        query: (chatId) => {
            let url =  `user/friends`;
            if(chatId) url+= `?chatId=${chatId}`;
            
            return {
                url,
                credentials: "include"
            }
        },
        providesTags: ["Chat"]
    }),

    createGroup: builder.mutation({
        query: ({name, members}) => ({
            url: `chat/new`,
            method: "POST",
            body: {name, members},
            credentials: "include"
        }),
        invalidatesTags: ["Chat"]
    }),

    renameGroup: builder.mutation({
        query: ({chatId, name}) => ({
            url: `chat/${chatId}`,
            method: "PUT",
            body: {name},
            credentials: "include"
        }),
        invalidatesTags: ["Chat"]
    }),

    removeGroupMember: builder.mutation({
        query: ({userId, chatId}) => ({
            url: `chat/removemember`,
            method: "PUT",
            body: {userId, chatId},
            credentials: "include"
        }),
        invalidatesTags: ["Chat"]
    }),

    addGroupMembers: builder.mutation({
        query: ({members, chatId}) => ({
            url: `chat/addmembers`,
            method: "PUT",
            body: {members, chatId},
            credentials: "include"
        }),
        invalidatesTags: ["Chat"]
    }),

    deleteGroup: builder.mutation({
        query: ({chatId}) => ({
            url: `chat/${chatId}`,
            method: "DELETE",
            credentials: "include",
        }),
        invalidatesTags: ["Chat"]
    }),

    leaveGroup: builder.mutation({
        query: ({chatId}) => ({
            url: `chat/leave/${chatId}`,
            method: "DELETE",
            credentials: "include"
        }),
        invalidatesTags: ["Chat"]
    })

  }),
});

export default api;

export const {
  useMyChatsQuery,
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
  useGetMyNotificationsQuery,
  useAcceptFriendRequestMutation,
  useChatDetailsQuery,
  useGetOldMessagesQuery,
  useSendAttachmentsMutation,
  useMyGroupsQuery,
  useAvailableFriendsQuery,
  useCreateGroupMutation,
  useRenameGroupMutation,
  useRemoveGroupMemberMutation,
  useAddGroupMembersMutation,
  useDeleteGroupMutation,
  useLeaveGroupMutation
} = api;
