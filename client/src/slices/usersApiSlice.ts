import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";
import { user } from "../types/interfaces";

interface LoginPayload {
    email: string;
    password: string;
}
interface RegisterPayload {
    email: string;
    password: string;
    name: string;
}

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<user[], LoginPayload>({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: "POST",
                body: data,
            }),
        }),
        register: builder.mutation<user[], RegisterPayload>({
            query: (data) => ({
                url: USERS_URL,
                method: "POST",
                body: data,
            }),
        }),
        logout: builder.mutation<user[], void>({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: "POST",
            }),
        }),
        profile: builder.mutation<user, Partial<user>>({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: "PUT",
                body: data,
            }),
        }),
        getUsers: builder.query<user[], void>({
            query: () => ({
                url: USERS_URL,
            }),
            providesTags: ["Users"],
            keepUnusedDataFor: 5,
        }),
        deleteUser: builder.mutation<void, string>({  //CHANGE BACK TO <order, string> if fails
            query:(userId)=>{
            console.log(userId);
            console.log(`${USERS_URL}/${userId}`);
            return ({
                url:`${USERS_URL}/${userId}`,
                method: "DELETE",
            })},
        }),
        getUserDetails: builder.query<user,string>({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        updateUser: builder.mutation<user,Partial<user>>({ // partial or somethign indication user is part of it
            query:(data)=>({
                url: `${USERS_URL}/${data._id}`,
                method: "PUT", 
                body: data,
            }),
            invalidatesTags: ['Users'],
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useProfileMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
    useGetUserDetailsQuery,
    useUpdateUserMutation,
} = usersApiSlice;
