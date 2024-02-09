import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userId : null,
    firstName : null,
    lastName : null,
    email : null,
    token : null,
    phone : null,
    error : null
  } 

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { email, accessToken,userId, firstName, lastName , phone} = action.payload
            state.email = email
            state.token = accessToken
            state.userId = userId
            state.firstName = firstName
            state.lastName = lastName
            state.phone = phone
        },
        logOut: (state, action) => {
            state.email = null
            state.token = null
            state.userId = null
            state.firstName = null
            state.lastName = null
            state.phone = null
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectEmail = (state) => state.auth.email
export const selectToken = (state) => state.auth.token
export const selectUserId = (state) => state.auth.userId
export const selectFirstName = (state) => state.auth.firstName
export const selectLastName = (state) => state.auth.lastName
export const selectPhone = (state) => state.auth.phone
