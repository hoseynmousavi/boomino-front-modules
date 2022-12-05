import request from "../../../seyed-modules/request/request"
import apiUrlsConstant from "../../constant/apiUrlsConstant"
import {ADD_CHILD_SUCCESS, EDIT_CHILD_SUCCESS, GET_FAMILY_SUCCESS, REMOVE_CHILD_SUCCESS, SELECT_CHILD} from "./FamilyTypes"
import toastManager from "../../../seyed-modules/helpers/toastManager"
import {INFO_TOAST} from "../../../seyed-modules/constant/toastTypes"

const base = process.env.REACT_APP_FAMILY_URL

function getFamily({dispatch, cancel})
{
    return request.get({base, url: apiUrlsConstant.getFamily, cancel})
        .then(({family}) =>
        {
            dispatch({
                type: GET_FAMILY_SUCCESS,
                payload: {family},
            })
        })
}

function addFamilyMember({data, dispatch})
{
    return request.post({base, url: apiUrlsConstant.addMember, data})
        .then(child =>
        {
            dispatch({
                type: ADD_CHILD_SUCCESS,
                payload: {child},
            })
            return child
        })
}

function removeChild({child_id, dispatch})
{
    const data = new FormData()
    data.append("child_id", child_id)
    return request.del({base, url: apiUrlsConstant.removeMember, data})
        .then(res =>
        {
            if (res?.status) toastManager.addToast({message: res.status, type: INFO_TOAST})
            dispatch({
                type: REMOVE_CHILD_SUCCESS,
                payload: {child_id},
            })
        })
}

function selectChild({dispatch, userId})
{
    dispatch({
        type: SELECT_CHILD,
        payload: {userId},
    })
}

function editChildSuccess({dispatch, childId, data})
{
    dispatch({
        type: EDIT_CHILD_SUCCESS,
        payload: {childId, data},
    })
}

const FamilyActions = {
    getFamily,
    addFamilyMember,
    removeChild,
    selectChild,
    editChildSuccess,
}

export default FamilyActions