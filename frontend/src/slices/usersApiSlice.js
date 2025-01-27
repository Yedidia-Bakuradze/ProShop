import { USERS_URL } from '../constants.js';
import { apiSlice } from './apiSlice.js';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //mutation for POST requests
        login: builder.mutation({
            //data is the email and the password that is sent in the body
            query: (data) => ({
                url: USERS_URL / auth,
                method: 'POST',
                body: data
            }),
            keepUnusedDataFor: 5
        })
    })
});

export const { useLoginMutation } = usersApiSlice;
