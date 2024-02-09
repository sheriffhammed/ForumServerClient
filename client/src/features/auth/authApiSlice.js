import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        logout: builder.query({
            query: () => '/logout',
            //keepUnusedDataFor: 5,
        }),
    })
})

export const {
    useLoginMutation,
    useLazyLogoutQuery
} = authApiSlice