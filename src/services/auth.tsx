interface User {
    access_token: null | undefined
    refresh_token: null | undefined
}

const getToken = () => {
    //@ts-ignore
    const user = JSON.parse(localStorage.getItem('user'))
    return user?.access_token
}

const getRefreshToken = () => {
    //@ts-ignore
    const user = JSON.parse(localStorage.getItem('user'))
    return user?.refresh_token
}

const setUserToken = (token: string) => {
    //@ts-ignore
    const user = JSON.parse(localStorage.getItem('user'))
    user.access_token = token
}

const getUser = () => {
    return localStorage.getItem('user')
    // return JSON.parse(localStorage.getItem('user'))
}

const setUser = (user: User) => {
    localStorage.setItem('user_id', JSON.stringify(user))
}

const isAuthenticated = () => {
    //@ts-ignore
    return localStorage.getItem('user_id') !== null
}

const setUserId = (user_id: string | undefined) => {
    if (user_id) {
        localStorage.setItem('user_id', user_id)
    }
}

const removeUserId = () => {
    localStorage.removeItem('user_id')
}

const UserSession = {
    getToken,
    getRefreshToken,
    getUser,
    setUserToken,
    setUser,
    setUserId,
    removeUserId,
    isAuthenticated,
}

export default UserSession
