import {createContext, useEffect, useReducer} from "react"
import {ADD_CHILD_SUCCESS, EDIT_CHILD_SUCCESS, GET_FAMILY_SUCCESS, REMOVE_CHILD_SUCCESS, SELECT_CHILD} from "./FamilyTypes"
import FamilyActions from "./FamilyActions"
import logoutManager from "../../../seyed-modules/helpers/logoutManager"
import {LOGOUT} from "../auth/AuthTypes"
import cookieHelper from "../../../seyed-modules/helpers/cookieHelper"
import getSortedChildren from "../../helpers/getSortedChildren"

export const FamilyContext = createContext(null)

const initialState = {
    family: null,
    selectedChildUserId: null,
    getFamily: false,
}

const init = () => initialState

function reducer(state, action)
{
    switch (action.type)
    {
        case GET_FAMILY_SUCCESS:
        {
            const {family} = action.payload
            const familyTemp = {...family, members: family.members.reduce((sum, item) => ({...sum, [item.userId]: {...state?.family?.members?.[item.userId] ?? {}, ...item}}), {})}
            const selectedChildUserId =
                state.selectedChildUserId && familyTemp.members[state.selectedChildUserId] ?
                    state.selectedChildUserId
                    :
                    getSortedChildren(family)?.[0]?.userId
            cookieHelper.setItem("selectedChildUserId", selectedChildUserId)
            return {
                ...state,
                family: familyTemp,
                selectedChildUserId,
                getFamily: true,
            }
        }
        case ADD_CHILD_SUCCESS:
        {
            const {child} = action.payload
            const {userId} = child
            const selectedChildUserId = userId
            cookieHelper.setItem("selectedChildUserId", selectedChildUserId)
            return {
                ...state,
                family: {
                    ...state?.family ?? {},
                    members: {
                        ...state?.family?.members ?? {},
                        [userId]: child,
                    },
                },
                selectedChildUserId,
            }
        }
        case REMOVE_CHILD_SUCCESS:
        {
            const {child_id} = action.payload
            const membersTemp = {...state.family.members}
            delete membersTemp[child_id]
            const selectedChildUserId =
                state.selectedChildUserId && membersTemp[state.selectedChildUserId] ?
                    state.selectedChildUserId
                    :
                    getSortedChildren({members: membersTemp})?.[0]?.userId
            return {
                ...state,
                family: {
                    ...state.family,
                    members: membersTemp,
                },
                selectedChildUserId,
            }
        }
        case EDIT_CHILD_SUCCESS:
        {
            const {childId, data} = action.payload
            return {
                ...state,
                family: {
                    ...state.family,
                    members: {
                        ...state.family.members,
                        [childId]: {
                            ...state.family.members?.[childId] ?? {},
                            ...data,
                        },
                    },
                },
            }
        }
        case SELECT_CHILD:
        {
            const {userId} = action.payload
            cookieHelper.setItem("selectedChildUserId", userId)
            return {
                ...state,
                selectedChildUserId: userId,
            }
        }
        case LOGOUT:
        {
            return init()
        }
        default:
        {
            throw new Error()
        }
    }
}

function FamilyProvider({children})
{
    const [state, dispatch] = useReducer(reducer, initialState, init)

    useEffect(() =>
    {
        const userId = cookieHelper.getItem("selectedChildUserId")
        if (userId) FamilyActions.selectChild({dispatch, userId})

        logoutManager.setLogOut({callBack: () => dispatch({type: LOGOUT})})
    }, [])

    return (
        <FamilyContext.Provider value={{state, dispatch}}>
            {children}
        </FamilyContext.Provider>
    )
}

export default FamilyProvider