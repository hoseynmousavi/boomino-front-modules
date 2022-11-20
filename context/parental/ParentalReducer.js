import {createContext, useEffect, useReducer} from "react"
import {GET_PACKAGES, SET_APPS, SET_CATEGORIES, SET_CHANGE_LOGS, SET_CHART, SET_CONTACTS, SET_RESTRICTIONS, SET_SUGGESTED_APPS, SET_TIMELINE, SET_TIMELINE_DETAIL, SET_TODAY_USAGE} from "./ParentalTypes"
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
        chart: {},
        categories: {},
        timeline: {},
        timelineDetail: {},
        todayUsage: {},
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
                const {res, updateTimelineDetailContact} = action.payload
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
                    timelineDetail: {
                        ...state.timelineDetail,
                        [res.child_id]: {
                            ...state.timelineDetail[res.child_id],
                            timeline: updateTimelineDetailContact ?
                                state.timelineDetail[res.child_id]?.timeline?.map(item =>
                                    item.phone_no ?
                                        {...item, label: res.restrictions.contacts.filter(contact => contact.phone_no === item.phone_no)[0].label}
                                        :
                                        item,
                                )
                                :
                                state.timelineDetail[res.child_id]?.timeline,
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
            case SET_CHART:
            {
                const {res: {chart}, child_id, time_period} = action.payload
                const field = child_id || "emptyState"
                return {
                    ...state,
                    chart: {
                        ...state.chart,
                        [field]: {
                            ...state.chart[field],
                            [time_period]: {
                                ...state.chart[field]?.[time_period],
                                chart,
                                getChart: true,
                            },
                        },
                    },
                }
            }
            case SET_CATEGORIES:
            {
                const {res: {categories}, child_id} = action.payload
                const field = child_id || "emptyState"
                return {
                    ...state,
                    categories: {
                        ...state.categories,
                        [field]: {
                            ...state.categories[field],
                            categories,
                            getCategories: true,
                        },
                    },
                }
            }
            case SET_TIMELINE:
            {
                const {res: {timeline}, child_id} = action.payload
                return {
                    ...state,
                    timeline: {
                        ...state.timeline,
                        [child_id]: {
                            ...state.timeline[child_id],
                            timeline,
                            getTimeLine: true,
                        },
                    },
                }
            }
            case SET_TIMELINE_DETAIL:
            {
                const {res: {timeline}, child_id} = action.payload
                return {
                    ...state,
                    timelineDetail: {
                        ...state.timelineDetail,
                        [child_id]: {
                            ...state.timelineDetail[child_id],
                            timeline,
                            getTimeLine: true,
                        },
                    },
                }
            }
            case SET_TODAY_USAGE:
            {
                const {res, child_id} = action.payload
                return {
                    ...state,
                    todayUsage: {
                        ...state.todayUsage,
                        [child_id]: {
                            ...state.todayUsage[child_id],
                            todayUsage: {...res},
                            getTodayUsage: true,
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