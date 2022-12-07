import {createContext, useEffect, useReducer} from "react"
import {GET_PACKAGES, SET_APPS, SET_CHANGE_LOGS, SET_CONTACTS, SET_RESTRICTIONS, SET_SUGGESTED_APPS} from "./ParentalTypes"
import {LOGOUT} from "../auth/AuthTypes"
import logoutManager from "../../../seyed-modules/helpers/logoutManager"

export const ParentalContext = createContext(null)

function ParentalProvider({children})
{
    const initialState = {
        packages: null,
        getPackages: false,
        restrictions: {},
        allApps: {},
        allContacts: {},
        allChangeLogs: {},
        suggested: {},
    }

    const [state, dispatch] = useReducer(reducer, initialState, init)

    function init()
    {
        return initialState
    }

    function reducer(state, action)
    {
        switch (action.type)
        {
            case GET_PACKAGES:
            {
                const {packages} = action.payload
                return {
                    ...state,
                    packages,
                    getPackages: true,
                }
            }
            case SET_RESTRICTIONS:
            {
                const {res} = action.payload
                return {
                    ...state,
                    restrictions: {
                        ...state.restrictions,
                        [res.child_id]: {
                            ...state.restrictions[res.child_id],
                            ...res,
                            getRestriction: true,
                        },
                    },
                }
            }
            case SET_APPS:
            {
                const {apps, child_id} = action.payload
                return {
                    ...state,
                    allApps: {
                        ...state.allApps,
                        [child_id]: {
                            ...state.allApps[child_id],
                            apps,
                            getApps: true,
                        },
                    },
                }
            }
            case SET_CONTACTS:
            {
                const {contacts, child_id} = action.payload
                return {
                    ...state,
                    allContacts: {
                        ...state.allContacts,
                        [child_id]: {
                            ...state.allContacts[child_id],
                            contacts,
                            getContacts: true,
                        },
                    },
                }
            }
            case SET_CHANGE_LOGS:
            {
                const {res} = action.payload
                return {
                    ...state,
                    allChangeLogs: {
                        getDone: true,
                        changeLogs: res,
                    },
                }
            }
            case SET_SUGGESTED_APPS:
            {
                const {res: {apps, pwas}} = action.payload
                return {
                    ...state,
                    suggested: {
                        apps,
                        pwas,
                        getDone: true,
                    },
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

    useEffect(() =>
    {
        logoutManager.setLogOut({callBack: () => dispatch({type: LOGOUT})})
    }, [])

    return (
        <ParentalContext.Provider value={{state, dispatch}}>
            {children}
        </ParentalContext.Provider>
    )
}

export default ParentalProvider