import request from "../../../seyed-modules/request/request"
import apiUrlsConstant from "../../constant/apiUrlsConstant"
import {GET_PACKAGES_SUCCESS, SET_APPS, SET_CATEGORIES, SET_CHART, SET_CONTACTS, SET_RESTRICTIONS, SET_TIMELINE, SET_TIMELINE_DETAIL, SET_TODAY_USAGE} from "./ParentalTypes"

const base = process.env.REACT_APP_PARENTAL_URL

const getPackages = ({child_age, dispatch}) =>
{
    let param = ""
    if (child_age) param = `?child_age=${child_age}`
    return request.get({base, url: apiUrlsConstant.getPackages, param})
        .then(packages =>
        {
            dispatch({
                type: GET_PACKAGES_SUCCESS,
                payload: {packages},
            })
        })
}

const addChildRestrictions = ({childId, packageId, restrictions, dispatch}) =>
{
    return request.post({base, url: apiUrlsConstant.addChildRestrictions, data: {childId, packageId, restrictions}})
        .then(res =>
        {
            setRestrictions({res, dispatch})
        })
}

const getChildRestrictions = ({child_id, dispatch, cancel}) =>
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

const getChildChart = ({child_id, time_period, dispatch, cancel}) =>
{
    let param = `?time_period=${time_period}`
    if (child_id) param += `&child_id=${child_id}`
    return request.get({base, url: apiUrlsConstant.getChildChart, cancel, param})
        .then(res =>
        {
            dispatch({
                type: SET_CHART,
                payload: {res, child_id, time_period},
            })
        })
}

const getChildTodayUsage = ({child_id, dispatch, cancel}) =>
{
    return request.get({base, url: apiUrlsConstant.getChildTodayUsage, param: `?child_id=${child_id}`, cancel})
        .then(res =>
        {
            dispatch({
                type: SET_TODAY_USAGE,
                payload: {res, child_id},
            })
        })
}

const getChildCategories = ({child_id, dispatch, cancel}) =>
{
    let param = child_id ? `?child_id=${child_id}` : ""
    return request.get({base, url: apiUrlsConstant.getChildCategories, cancel, param})
        .then(res =>
        {
            dispatch({
                type: SET_CATEGORIES,
                payload: {res, child_id},
            })
        })
}

const getChildTimeLine = ({child_id, dispatch, cancel}) =>
{
    return request.get({base, url: apiUrlsConstant.getChildTimeLine, cancel, param: `?child_id=${child_id}`})
        .then(res =>
        {
            dispatch({
                type: SET_TIMELINE,
                payload: {res, child_id},
            })
        })
}

const getChildTimeLineDetail = ({child_id, dispatch, cancel}) =>
{
    return request.get({base, url: apiUrlsConstant.getChildTimeLineDetail, cancel, param: `?child_id=${child_id}`})
        .then(res =>
        {
            dispatch({
                type: SET_TIMELINE_DETAIL,
                payload: {res, child_id},
            })
        })
}

const setRestrictions = ({res, dispatch, updateTimelineDetailContact}) =>
{
    dispatch({
        type: SET_RESTRICTIONS,
        payload: {res, updateTimelineDetailContact},
    })
}

const editChildRestriction = ({childId, restrictions, dispatch}) =>
{
    return request.put({base, url: apiUrlsConstant.editChildRestrictionsTime, data: {childId, restrictions}})
        .then(res =>
        {
            res.child_id = childId
            setRestrictions({res, dispatch})
            getChildTodayUsage({child_id: childId, dispatch})
        })
}

const editChildPackage = ({childId, packageId, dispatch}) =>
{
    return request.put({base, url: apiUrlsConstant.editChildPackage, data: {childId, packageId}})
        .then(res =>
        {
            res.child_id = childId
            setRestrictions({res, dispatch})
        })
}

const removeChildWhiteApp = ({child_id, app_package_name, dispatch}) =>
{
    return request.del({base, url: apiUrlsConstant.removeChildRestrictionsApp, data: {child_id, app_package_name}})
        .then(res =>
        {
            res.child_id = child_id
            setRestrictions({res, dispatch})
        })
}

const addChildWhiteApp = ({child_id, app_package_name, dispatch}) =>
{
    return request.put({base, url: apiUrlsConstant.addChildRestrictionsApp, data: {is_default: false, fid: "", child_id, app_package_name}})
        .then(res =>
        {
            res.child_id = child_id
            setRestrictions({res, dispatch})
        })
}

const addChildWhiteContact = ({child_id, contact_phone_no, contact_label, contact_avatar_file, progress, dispatch}) =>
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
            setRestrictions({res, dispatch, updateTimelineDetailContact: true})
            getChildAllContacts({child_id, dispatch})
        })
}

const removeChildWhiteContact = ({child_id, contact_phone_no, dispatch}) =>
{
    return request.del({base, url: apiUrlsConstant.addChildRestrictionsContact, data: {child_id, contact_phone_no}})
        .then(res =>
        {
            res.child_id = child_id
            setRestrictions({res, dispatch})
        })
}

const addChildWhiteSite = ({child_id, url, dispatch}) =>
{
    return request.put({base, url: apiUrlsConstant.addChildRestrictionsSite, data: {childId: child_id, url}})
        .then(res =>
        {
            res.child_id = child_id
            setRestrictions({res, dispatch})
        })
}

const removeChildWhiteSite = ({child_id, site_url, dispatch}) =>
{
    return request.del({base, url: apiUrlsConstant.addChildRestrictionsSite, data: {child_id, site_url}})
        .then(res =>
        {
            res.child_id = child_id
            setRestrictions({res, dispatch})
        })
}

const getChildAllApps = ({child_id, dispatch, cancel}) =>
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

const getChildAllContacts = ({child_id, dispatch, cancel}) =>
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

const setKidZonePassword = ({password}) =>
{
    return request.post({base, url: apiUrlsConstant.setKidZonePass, data: {password}})
}

const verifyKidZonePassword = ({password}) =>
{
    return request.post({base, url: apiUrlsConstant.verifyKidZonePass, data: {password}})
}

const ParentalActions = {
    getPackages,
    addChildRestrictions,
    getChildRestrictions,
    getChildChart,
    getChildCategories,
    getChildTimeLine,
    editChildRestriction,
    getChildTodayUsage,
    editChildPackage,
    addChildWhiteContact,
    addChildWhiteSite,
    removeChildWhiteSite,
    removeChildWhiteApp,
    addChildWhiteApp,
    removeChildWhiteContact,
    getChildTimeLineDetail,
    getChildAllApps,
    getChildAllContacts,
    setKidZonePassword,
    verifyKidZonePassword,
}

export default ParentalActions