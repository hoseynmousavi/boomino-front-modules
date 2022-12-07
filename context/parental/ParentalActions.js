import request from "../../../seyed-modules/request/request"
import apiUrlsConstant from "../../constant/apiUrlsConstant"
import {GET_PACKAGES, SET_APPS, SET_CHANGE_LOGS, SET_CONTACTS, SET_RESTRICTIONS, SET_SUGGESTED_APPS} from "./ParentalTypes"
import strToHash from "../../helpers/strToHash"
import cookieHelper from "../../../seyed-modules/helpers/cookieHelper"
import enToastConstant from "../../constant/enToastConstant"
import faToastConstant from "../../constant/faToastConstant"

const base = process.env.REACT_APP_PARENTAL_URL

function getPackages({child_age, dispatch})
{
    let param = ""
    if (child_age || child_age === 0) param = `?child_age=${child_age}`
    return request.get({base, url: apiUrlsConstant.getPackages, param})
        .then(packages =>
        {
            dispatch({
                type: GET_PACKAGES,
                payload: {packages},
            })
        })
}

function addChildRestrictions({childId, packageId, restrictions, dispatch})
{
    return request.post({base, url: apiUrlsConstant.addChildRestrictions, data: {childId, packageId, restrictions}})
        .then(res =>
        {
            setRestrictions({res, dispatch})
        })
}

function getChildRestrictions({child_id, dispatch, cancel})
{
    return request.get({base, url: apiUrlsConstant.getChildRestrictions, cancel, param: `?child_id=${child_id}`})
        .then(res =>
        {
            res.child_id = child_id
            setRestrictions({res, dispatch})
        })
        .catch(err =>
        {
            if (err?.response?.status === 404)
            {
                const res = {child_id}
                setRestrictions({res, dispatch})
            }
            else throw err
        })
}

function getSuggestedApps({dispatch, cancel})
{
    return request.get({base, url: apiUrlsConstant.getSuggestedApps, cancel})
        .then(res =>
        {
            dispatch({
                type: SET_SUGGESTED_APPS,
                payload: {res},
            })
        })
}

function setRestrictions({res, dispatch})
{
    dispatch({
        type: SET_RESTRICTIONS,
        payload: {res},
    })
}

function editChildRestriction({childId, restrictions, dispatch})
{
    return request.put({base, url: apiUrlsConstant.editChildRestrictionsTime, data: {childId, restrictions}})
        .then(res =>
        {
            res.child_id = childId
            setRestrictions({res, dispatch})
        })
}

function editChildPackage({childId, packageId, dispatch})
{
    return request.put({base, url: apiUrlsConstant.editChildPackage, data: {childId, packageId}})
        .then(res =>
        {
            res.child_id = childId
            setRestrictions({res, dispatch})
        })
}

function removeChildWhiteApp({child_id, app_package_name, dispatch})
{
    return request.del({base, url: apiUrlsConstant.removeChildRestrictionsApp, data: {child_id, app_package_name}})
        .then(res =>
        {
            res.child_id = child_id
            setRestrictions({res, dispatch})
        })
}

function addChildWhiteApp({child_id, app_package_name, dispatch})
{
    return request.put({base, url: apiUrlsConstant.addChildRestrictionsApp, data: {child_id, app_package_name}})
        .then(res =>
        {
            res.child_id = child_id
            setRestrictions({res, dispatch})
        })
}

function addChildWhiteContact({child_id, contact_phone_no, contact_label, contact_avatar_file, progress, dispatch})
{
    const data = new FormData()
    data.append("child_id", child_id)
    data.append("contact_phone_no", contact_phone_no)
    data.append("contact_label", contact_label)
    if (contact_avatar_file)
    {
        if (typeof contact_avatar_file === "string") data.append("contact_avatar_fid", contact_avatar_file)
        else data.append("contact_avatar_file", contact_avatar_file)
    }
    return request.put({base, url: apiUrlsConstant.addChildRestrictionsContact, data, progress})
        .then(res =>
        {
            res.child_id = child_id
            setRestrictions({res, dispatch})
            getChildAllContacts({child_id, dispatch})
        })
}

function removeChildWhiteContact({child_id, contact_phone_no, dispatch})
{
    return request.del({base, url: apiUrlsConstant.addChildRestrictionsContact, data: {child_id, contact_phone_no}})
        .then(res =>
        {
            res.child_id = child_id
            setRestrictions({res, dispatch})
        })
}

function addChildWhiteSite({child_id, url, dispatch})
{
    return request.put({base, url: apiUrlsConstant.addChildRestrictionsSite, data: {childId: child_id, url}})
        .then(res =>
        {
            res.child_id = child_id
            setRestrictions({res, dispatch})
        })
}

function removeChildWhiteSite({child_id, site_url, dispatch})
{
    return request.del({base, url: apiUrlsConstant.addChildRestrictionsSite, data: {child_id, site_url}})
        .then(res =>
        {
            res.child_id = child_id
            setRestrictions({res, dispatch})
        })
}

function getChildAllApps({child_id, dispatch, cancel})
{
    return request.get({base, url: apiUrlsConstant.getChildApps, cancel})
        .then(res =>
        {
            const {apps} = res
            dispatch({
                type: SET_APPS,
                payload: {apps, child_id},
            })
        })
        .catch(err =>
        {
            if (err?.response?.status === 404)
            {
                dispatch({
                    type: SET_APPS,
                    payload: {apps: [], child_id},
                })
            }
            else throw err
        })
}

function getChildAllContacts({child_id, dispatch, cancel})
{
    return request.get({base, url: apiUrlsConstant.getChildContacts, cancel})
        .then(res =>
        {
            const {contacts} = res
            dispatch({
                type: SET_CONTACTS,
                payload: {contacts, child_id},
            })
        })
        .catch(err =>
        {
            if (err?.response?.status === 404)
            {
                dispatch({
                    type: SET_CONTACTS,
                    payload: {contacts: [], child_id},
                })
            }
            else throw err
        })
}

function setKidZonePassword({password, cancel})
{
    return request.post({base, url: apiUrlsConstant.setKidZonePass, data: {password}, dontToast: true, cancel})
        .then(res =>
        {
            localStorage.setItem("kidZonePassword", strToHash(password).toString())
            return res
        })
}

function verifyKidZonePassword({password, cancel})
{
    return request.post({base, url: apiUrlsConstant.verifyKidZonePass, data: {password}, dontToast: true, cancel})
        .then(() =>
        {
            localStorage.setItem("kidZonePassword", strToHash(password).toString())
        })
        .catch(err =>
        {
            const kidZonePassword = localStorage.getItem("kidZonePassword")
            if (err.message === "Network Error" && kidZonePassword)
            {
                if (strToHash(password).toString() !== kidZonePassword)
                {
                    const language = cookieHelper.getItem("language") || "fa"
                    // eslint-disable-next-line
                    throw {response: {data: {status: language === "en" ? enToastConstant.wrongPassword : faToastConstant.wrongPassword}}}
                }
            }
            else throw err
        })
}

function getUpdateChanges({version, getAll, dispatch, cancel})
{
    return request.get({base, url: apiUrlsConstant.getUpdateChanges, dontCache: !getAll, dontToast: !getAll, param: `?version=${version}&client=WEB`, cancel})
        .then(res =>
        {
            if (getAll)
            {
                dispatch({
                    type: SET_CHANGE_LOGS,
                    payload: {res},
                })
            }
            else return res
        })
}

const ParentalActions = {
    getPackages,
    addChildRestrictions,
    getChildRestrictions,
    editChildRestriction,
    editChildPackage,
    addChildWhiteContact,
    addChildWhiteSite,
    removeChildWhiteSite,
    removeChildWhiteApp,
    addChildWhiteApp,
    removeChildWhiteContact,
    getChildAllApps,
    getChildAllContacts,
    setKidZonePassword,
    verifyKidZonePassword,
    getUpdateChanges,
    getSuggestedApps,
}

export default ParentalActions