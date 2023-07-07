// import { createSlice } from '@reduxjs/toolkit'
// import UserSession from '../../services/auth'

// const initialState = {
//     isLoading: false,
//     message: '',
//     access_token: null,
//     user: null,
// }
// export const user = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         resetAuthReducer(state, action) {
//             return {
//                 ...initialState,
//             }
//         },
//         postUserSignup(state, action) {
//             return {
//                 ...state,
//                 message: '',
//                 isLoading: true,
//             }
//         },
//         postUserSignupSuccess(state, action) {
//             return {
//                 ...state,
//                 user: action.payload.data,
//                 isLoading: false,
//             }
//         },
//         postUserSignupFailed(state, action) {
//             return {
//                 ...state,
//                 message: 'User registration failed',
//                 isLoading: false,
//             }
//         },
//         postUserLogin(state, action) {
//             return {
//                 ...state,
//                 message: '',
//                 isLoading: true,
//             }
//         },
//         postUserLoginSuccess(state, action) {
//             // Update auth details into localStorage
//             UserSession.setUser(action.payload.data)
//             return {
//                 ...state,
//                 isLoading: false,
//             }
//         },
//         postUserLoginFailed(state, action) {
//             return {
//                 ...state,
//                 message: 'User login failed',
//                 isLoading: false,
//             }
//         },
        
//     },
// })

// export const {
//     resetAuthReducer,
//     postUserSignup,
//     postUserSignupSuccess,
//     postUserSignupFailed,
//     postUserLogin,
//     postUserLoginSuccess,
//     postUserLoginFailed
// } = user.actions

// export default user.reducer
