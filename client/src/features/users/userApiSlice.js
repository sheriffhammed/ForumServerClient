import { apiSlice } from "../../app/api/apiSlice"

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            //query: (userId) => `/registration/${userId}`,
            query: () => `/registration`,
            keepUnusedDataFor: 60,
        }),
        getUserByEmail: builder.query({
            query: (email) => `registration/get/userbyemail?email=${email}`,
            keepUnusedDataFor: 60,
        }),
        updateUser: builder.mutation({
            query(data) {
                const { id, ...body } = data
                return {
                url: `registration/${id}`,
                method: 'PUT',
                body,
                }
             }
         }),
         changePasswordByEmail: builder.mutation({
            query(data) {
               const { email, ...body } = data
               return {
               url: `registration/update/userbyemail?email=${email}`,
               method: 'PUT',
               body
               }
            }
        }),
         addUser: builder.mutation({
             query: body => ({
                 url: '/registration',
                 method: 'POST',
                 body,
             })
         })
         
    })
})

export const {
    useGetUsersQuery,
    useUpdateUserMutation,
    useAddUserMutation,
    useChangePasswordByEmailMutation,
    useGetUserByEmailQuery
} = usersApiSlice



