import {createContext, useEffect, useReducer, useState} from "react"
import {CHANGE_AVATAR_SUCCESS, LOGOUT, SET_USER} from "./AuthTypes"
import AuthActions from "./AuthActions"
import logoutManager from "../../../seyed-modules/helpers/logoutManager"
import cookieHelper from "../../../seyed-modules/helpers/cookieHelper"
import parseQueryString from "../../../seyed-modules/helpers/parseQueryString"
import LoadingWrapper from "../../../seyed-modules/components/LoadingWrapper"

export const AuthContext = createContext(null)

function AuthProvider({children})
{
    const initialState = null
    const [isLogging, setIsLogging] = useState(false)
    const [state, dispatch] = useReducer(reducer, initialState, init)

    function init()
    {
        return initialState
    }

    function reducer(state, action)
    {
        switch (action.type)
        {
            case SET_USER:
            {
                const {user: userArg} = action.payload
                const user = {...state, ...userArg}
                if (user?.user?.email?.endsWith("@null.com")) user.user.email = null
                saveUserToDisk(user)
                return user
            }
            case CHANGE_AVATAR_SUCCESS:
            {
                const {avatar_fid} = action.payload
                const user = {...state, user: {...state.user, data: {...state.user.data, avatar_fid}}}
                saveUserToDisk(user)
                return user
            }
            case LOGOUT:
            {
                saveUserToDisk(null)
                return init()
            }
            default:
            {
                throw new Error()
            }
        }
    }

    function saveUserToDisk(user)
    {
        if (user)
        {
            if (user.token)
            {
                cookieHelper.setItem("token", user.token)
                delete user.token
            }
            if (user.refreshToken)
            {
                cookieHelper.setItem("refreshToken", user.refreshToken)
                delete user.refreshToken
            }
            localStorage.setItem("user", JSON.stringify(user))
        }
        else
        {
            cookieHelper.removeItem("token")
            cookieHelper.removeItem("refreshToken")
            cookieHelper.removeItem("selectedChildUserId")
            localStorage.clear()
        }
    }

    useEffect(() =>
    {
        const {token: queryToken, refreshToken: queryRefreshToken, childId: queryChildId} = parseQueryString()
        if (queryToken && queryRefreshToken && queryChildId)
        {
            cookieHelper.setItem("token", queryToken)
            cookieHelper.setItem("refreshToken", queryRefreshToken)
            cookieHelper.setItem("selectedChildUserId", queryChildId)
        }

        const token = cookieHelper.getItem("token")
        const refreshToken = cookieHelper.getItem("refreshToken")
        if (token && refreshToken)
        {
            const user = localStorage.getItem("user")
            if (user)
            {
                try
                {
                    AuthActions.setUser({user: JSON.parse(user), dispatch})
                }
                catch (e)
                {
                    console.log("err parsing user:", e.message)
                }
            }
            else setIsLogging(true)

            AuthActions.getUser({dispatch})
                .then(() => setIsLogging(false))
                .catch(() => setIsLogging(false))
        }

        logoutManager.setLogOut({callBack: () => dispatch({type: LOGOUT})})
    }, [])

    return (
        <AuthContext.Provider value={{state, dispatch}}>
            {
                isLogging ?
                    <LoadingWrapper haveBg/>
                    :
                    children
            }
        </AuthContext.Provider>
    )
}

export default AuthProvider