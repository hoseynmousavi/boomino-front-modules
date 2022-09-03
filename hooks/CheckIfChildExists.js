import {useContext, useRef} from "react"
import {FamilyContext} from "../context/family/FamilyReducer"
import FamilyActions from "../context/family/FamilyActions"
import GetData from "../../seyed-modules/request/GetData"

function CheckIfChildExists({childId, doAfterGet})
{
    const {state: {family, getFamily}, dispatch} = useContext(FamilyContext)
    const child = family?.members?.[childId]
    const isLoading = childId ? !getFamily && !child : false
    const notFound = childId ? !isLoading && !child : false
    const cancelToken = useRef(null)

    GetData({request, isLoading, cancelToken, dependencies: [child], doAfterGet: () => doAfterGet?.(child)})

    function request()
    {
        return FamilyActions.getFamily({dispatch, cancel: cancelSource => request.current = cancelSource})
    }

    return {child, notFound, isLoading}
}

export default CheckIfChildExists