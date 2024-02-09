import { apiSlice } from "../../app/api/apiSlice"

export const likesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getLikes: builder.query({
            query: (postId) => `/likes/?postId=${postId}`,
            //query: (postId) => '/likes',
            keepUnusedDataFor: 60,
            providesTags: ['Like'],
        }),
        addLike: builder.mutation({
            query: body => ({
                url: '/likes',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Like'],
        }),
         deleteLike: builder.mutation({
             //query: (userId) => `/registration/${userId}`,
            query(id) {
                return {
                url: `likes/${id}`,
                method: 'DELETE',
                }
             },
             invalidatesTags: ['Post','Like'],
         })
    })
})

export const {
    useGetLikesQuery,
    useAddLikeMutation,
    useDeleteLikeMutation
} = likesApiSlice 