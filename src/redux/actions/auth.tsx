// import {
//     fetchLogin,
//     fetchLoginSuccess,
//     fetchLoginFailed,
//     fetchRegister,
//     fetchRegisterSuccess,
//     fetchRegisterFailed,
// } from '../reducer/auth'
// import { authApiClient} from '../../services/apiClient'
// import { CHANGE_PASSWORD, LOGIN_API, REGISTER_API } from '../../services/routes'


// const globalConfig = {
//     retry: 3,
//     retryDelay: 1000,
// }

// // @ts-ignore
// export const login = payload => async dispatch => {
//     console.log('Calling action : login()')
//     // @ts-ignore
//     await dispatch(fetchLogin())
//     try {
//         const response = await authApiClient.post(LOGIN_API, payload)
//         return dispatch(fetchLoginSuccess(response))
//     } catch (err) {
//         return dispatch(fetchLoginFailed(err))
//     }
// }
// // @ts-ignore
// export const register = payload2 => async dispatch => {
//     console.log('Calling action : register()')
//     // @ts-ignore
//     await dispatch(fetchRegister())
//     try {
//         const response = await authApiClient.post(REGISTER_API, payload2)
//         return dispatch(fetchRegisterSuccess(response))
//     } catch (err) {
//         return dispatch(fetchRegisterFailed(err))
//     }
// }

// // @ts-ignore
// export const password_reset = (payload) => async (dispatch) => {
//     console.log('Calling action : password_reset()')
//     try {
//         // @ts-ignore
//         const response = await warehouseApiClient.put(CHANGE_PASSWORD, payload, globalConfig)
//         return dispatch(fetchRegisterSuccess(response))
//     } catch (err) {
//         return dispatch(fetchRegisterFailed(err))
//     }

// }