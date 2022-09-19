import {CHANGE_AVATAR_SUCCESS, SET_USER} from "./AuthTypes"
import request from "../../../seyed-modules/request/request"
import apiUrlsConstant from "../../constant/apiUrlsConstant"
import FamilyActions from "../family/FamilyActions"
import cookieHelper from "../../../seyed-modules/helpers/cookieHelper"

const base = process.env.REACT_APP_AUTH_URL

function sendOtp({mobile, cancel})
{
    return request.post({base, url: apiUrlsConstant.sendOtp, data: {mobile}, cancel})
}

function loginOrSignup({mobile, code, dispatch})
{
    return request.post({base, url: apiUrlsConstant.sendOtp, data: {mobile, code}})
        .then(res =>
        {
            const {insertInstant, lastUpdateInstant, registrations} = res.user
            setUser({user: res, dispatch})
            return ({isSignUp: insertInstant === lastUpdateInstant, isAdmin: registrations[0]?.roles?.includes("admin")})
        })
}

function getUser({dispatch})
{
    return request.get({base, url: apiUrlsConstant.getProfile, dontCache: true, dontToast: true})
        .then(user =>
        {
            setUser({user, dispatch})
        })
}

function getTokenWithRefreshToken()
{
    return request.get({base, url: apiUrlsConstant.refreshToken, dontCache: true, dontToast: true, useRefreshToken: true})
        .then(res =>
        {
            const {refreshToken, token} = res
            cookieHelper.setItem("token", token)
            cookieHelper.setItem("refreshToken", refreshToken)
            return true
        })
        .catch(() =>
        {
            return false
        })
}

function editProfile({data, childId, familyDispatch, dispatch})
{
    if (childId) data.childId = childId
    return request.post({base, url: apiUrlsConstant.editProfile, data})
        .then(res =>
        {
            if (childId && familyDispatch)
            {
                const {birthDate, data: {gender}, fullName} = res.user
                FamilyActions.editChildSuccess({childId, data: {birthDate, gender, fullName}, dispatch: familyDispatch})
            }
            else setUser({user: res, dispatch})
        })
}

function changeAvatar({avatar, dispatch, familyDispatch, progress, child_id})
{
    const data = new FormData()
    if (typeof avatar === "string") data.append("avatar_fid", avatar)
    else data.append("avatar_file", avatar)
    if (child_id) data.append("child_id", child_id)
    return request.sendFile({base, url: apiUrlsConstant.sendAvatar, data, progress})
        .then(res =>
        {
            const {fid: avatar_fid} = res
            if (!child_id && dispatch)
            {
                dispatch({
                    type: CHANGE_AVATAR_SUCCESS,
                    payload: {avatar_fid},
                })
            }
            else if (child_id && familyDispatch)
            {
                FamilyActions.editChildSuccess({childId: child_id, data: {avatar_fid}, dispatch: familyDispatch})
            }
            return avatar_fid
        })
}

function removeAvatar({dispatch, familyDispatch, child_id})
{
    let data = null
    if (child_id)
    {
        data = new FormData()
        data.append("child_id", child_id)
    }
    return request.del({base, url: apiUrlsConstant.removeAvatar, data})
        .then(() =>
        {
            if (!child_id && dispatch)
            {
                dispatch({
                    type: CHANGE_AVATAR_SUCCESS,
                    payload: {avatar_fid: null},
                })
            }
            else if (child_id && familyDispatch)
            {
                FamilyActions.editChildSuccess({childId: child_id, data: {avatar_fid: null}, dispatch: familyDispatch})
            }
            return true
        })
}

function checkEmail({email, cancel})
{
    return request.get({base, url: apiUrlsConstant.checkEmail, param: `?email=${email}`, cancel})
}

function setUser({user, dispatch})
{
    dispatch({
        type: SET_USER,
        payload: {user},
    })
}

function logout()
{
    return request.post({base, url: apiUrlsConstant.logout, useRefreshToken: true})
}

function deactivateAccount()
{
    return request.del({base, url: apiUrlsConstant.deactivateAccount})
}

const AuthActions = {
    sendOtp,
    loginOrSignup,
    getUser,
    editProfile,
    removeAvatar,
    checkEmail,
    setUser,
    changeAvatar,
    getTokenWithRefreshToken,
    logout,
    deactivateAccount,
}

export default AuthActions