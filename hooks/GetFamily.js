import {useContext, useRef} from "react"
import {FamilyContext} from "../context/family/FamilyReducer"
import FamilyActions from "../context/family/FamilyActions"
import GetData from "../../seyed-modules/request/GetData"

function GetFamily({doAfterGet, selectChildId} = {})
{
    const {state: {family, selectedChildUserId, getFamily}, dispatch} = useContext(FamilyContext)
    const isLoading = !getFamily
    const cancelToken = useRef(null)

    GetData({request, isLoading, cancelToken, doAfterGet})

    function request()
    {
        return FamilyActions.getFamily({dispatch, cancel: cancelSource => cancelToken.current = cancelSource})
    }

    return {family, selectedChildUserId: selectChildId || selectedChildUserId, child: family?.members?.[selectChildId || selectedChildUserId], isLoading, dispatch}
}

export default GetFamily