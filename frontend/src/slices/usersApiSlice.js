import { USERS_URL } from '../constants.js';
import { apiSlice } from './apiSlice.js';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //mutation for POST requests
        login: builder.mutation({
            //data is the email and the password that is sent in the body
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            }),
            keepUnusedDataFor: 5
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            })
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data
            })
        })
    })
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useProfileMutation
} = usersApiSlice;
