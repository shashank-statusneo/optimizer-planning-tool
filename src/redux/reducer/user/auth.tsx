import { createSlice } from '@reduxjs/toolkit'
import UserSession from '../../../services/auth'
import Cookies from 'js-cookie'

// Define a type for the initial state
interface StateType {
    isLoading: boolean
    message: string
    access_token: any
    user: any
}

const initialState: StateType = {
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
        postUserSignup(state) {
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
        postUserLogin(state) {
            return {
                ...state,
                message: '',
                isLoading: true,
            }
        },
        postUserLoginSuccess(state, action) {
            // add user_id into localStorage
            UserSession.setUserId(Cookies.get('user_id'))
            return {
                ...state,
                isLoading: false,
            }
        },
        postUserLoginFailed(state, action) {
            const errorMessage = action?.payload?.response?.data?.error
                ? action?.payload?.response?.data?.error
                : ''
            return {
                ...state,
                message: `User login failed: ${errorMessage}`,
                isLoading: false,
            }
        },
        postUserLogout(state) {
            return {
                ...state,
                message: '',
                isLoading: true,
            }
        },
        postUserLogoutSuccess(state, action) {
            // remove user_id into localStorage
            UserSession.removeUserId()
            return {
                ...state,
                isLoading: false,
            }
        },
        postUserLogoutFailed(state, action) {
            const errorMessage = action?.payload?.response?.data?.error
                ? action?.payload?.response?.data?.error
                : ''
            return {
                ...state,
                message: `User logout failed: ${errorMessage}`,
                isLoading: false,
            }
        },
        getUserDetail(state) {
            return {
                ...state,
                message: '',
                isLoading: true,
            }
        },
        getUserDetailSuccess(state, action) {
            return {
                ...state,
                isLoading: false,
            }
        },
        getUserDetailFailed(state, action) {
            const errorMessage = action?.payload?.response?.data?.error
                ? action?.payload?.response?.data?.error
                : ''
            return {
                ...state,
                message: `User details fetch failed: ${errorMessage}`,
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
    postUserLogout,
    postUserLogoutSuccess,
    postUserLogoutFailed,
    getUserDetail,
    getUserDetailSuccess,
    getUserDetailFailed,
} = userAuth.actions

export default userAuth.reducer
