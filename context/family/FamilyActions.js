import request from "../../seyed-modules/request/request"
import apiUrlsConstant from "../../constant/apiUrlsConstant"
import {EDIT_CHILD_SUCCESS, GET_FAMILY_SUCCESS, SELECT_CHILD} from "./FamilyTypes"

const base = process.env.REACT_APP_FAMILY_URL

function getFamily({dispatch, cancel})
{
    return request.get({base, url: apiUrlsConstant.getFamily, cancel})
        .then(({family}) =>
        {
            setFamily({dispatch, family})
        })
}

function addFamilyMember({birthDate, gender, fullName, dispatch})
{
    return request.post({base, url: apiUrlsConstant.addMember, data: {birthDate, fullName, gender}})
        .then(({family}) =>
        {
            const child = family.members.filter(item => item.fullName === fullName)[0]
            setFamily({dispatch, family, selectChildUserId: child.userId})
            return child
        })
}

function removeChild({child_id, dispatch})
{
    const data = new FormData()
    data.append("child_id", child_id)
    return request.del({base, url: apiUrlsConstant.removeMember, data})
        .then(({family}) =>
        {
            setFamily({dispatch, family})
        })
}

function setFamily({dispatch, family, selectChildUserId})
{
    dispatch({
        type: GET_FAMILY_SUCCESS,
        payload: {family, selectChildUserId},
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