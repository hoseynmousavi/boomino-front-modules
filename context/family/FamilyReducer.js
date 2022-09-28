import {createContext, useEffect, useReducer} from "react"
import {EDIT_CHILD_SUCCESS, GET_FAMILY_SUCCESS, SELECT_CHILD} from "./FamilyTypes"
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
            const {family, selectChildUserId} = action.payload
            const familyTemp = {...family, members: family.members.reduce((sum, item) => ({...sum, [item.userId]: {...state?.family?.members?.[item.userId] ?? {}, ...item}}), {})}
            const selectedChildUserId = selectChildUserId ?
                selectChildUserId
                :
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