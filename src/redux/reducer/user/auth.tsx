import { createSlice } from '@reduxjs/toolkit'
import UserSession from '../../../services/auth'

const initialState = {
    isLoading: false,
    message: '',
    access_token: null,
    user: null,
}
export const userAuth = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        resetAuthReducerData(state, action) {
            return {
                ...initialState,
            }
        },
        postUserSignup(state, action) {
            return {
                ...state,
                message: '',
                isLoading: true,
            }
        },
        postUserSignupSuccess(state, action) {
            return {
                ...state,
                user: action.payload.data,
                isLoading: false,
            }
        },
        postUserSignupFailed(state, action) {
            const errorMessage = action?.payload?.response?.data?.error
                ? action?.payload?.response?.data?.error
                : ''
            return {
                ...state,
                message: `User registration failed: ${errorMessage}`,
                isLoading: false,
            }
        },
        postUserLogin(state, action) {
            return {
                ...state,
                message: '',
                isLoading: true,
            }
        },
        postUserLoginSuccess(state, action) {
            // Update auth details into localStorage
            UserSession.setUser(action.payload.data)
            return {
                ...state,
                isLoading: false,
            }
        },
        postUserLoginFailed(state, action) {
            return {
                ...state,
                message: 'User login failed',
                isLoading: false,
            }
        },
    },
})

export const {
    resetAuthReducerData,
    postUserSignup,
    postUserSignupSuccess,
    postUserSignupFailed,
    postUserLogin,
    postUserLoginSuccess,
    postUserLoginFailed,
} = userAuth.actions

export default userAuth.reducer
