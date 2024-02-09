import { apiSlice } from "../../app/api/apiSlice"

export const postsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query({
            query: () => '/posts',
            keepUnusedDataFor: 60,
            //refetchOnMountOrArgChange : 2
            providesTags: ['Post'],
        }),
        getAllLikedPosts: builder.query({
            query: () => '/posts',
            keepUnusedDataFor: 60,
            //refetchOnMountOrArgChange : 2
            providesTags: ['Post'],
        }),
        addPost: builder.mutation({
            query: body => ({
                url: '/posts',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Post']
        }),
        updatePost: builder.mutation({
            query(data) {
                const { id, ...body } = data
                return {
                url: `posts/${id}`,
                method: 'PUT',
                body,
                }
             },
             invalidatesTags: ['Post']
         }),
         deletePost: builder.mutation({
             //query: (userId) => `/registration/${userId}`,
            query(postId) {
                return {
                url: `posts/${postId}`,
                method: 'DELETE',
                }
             },
             invalidatesTags: ['Post']
         })
    })
})

export const {
    useGetPostsQuery,
    useAddPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useGetAllLikedPostsQuery
} = postsApiSlice 