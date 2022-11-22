import Material from "../../seyed-modules/components/Material"
import goBack from "../../seyed-modules/helpers/goBack"
import CheckSvg from "../../seyed-modules/media/svg/CheckSvg"
import dateConstant from "../constant/dateConstant"
import FloatingMenu from "./FloatingMenu"
import GetTextConstant from "../hooks/GetTextConstant"

function ManualTimeDayItemMenu({time, closeMenuItem, onChange, recommendedTimeLetter, recommendedTimeNum})
{
    const {textConstant} = GetTextConstant()

    function onItemClick(mode)
    {
        return () =>
        {
            goBack()
            setTimeout(() => onChange(mode), 10)
        }
    }

    return (
        <FloatingMenu onClose={closeMenuItem}>
            <CheckSvg className="manual-time-day-active" style={{top: time === dateConstant.noLimitTime ? "12px" : time === recommendedTimeNum ? "54px" : "97px"}}/>
            <Material className={`manual-time-day-item ${time === dateConstant.noLimitTime ? "active" : ""}`} onClick={onItemClick(dateConstant.noLimitTime)}>{textConstant.noLimit}</Material>
            <Material className={`manual-time-day-item ${time === recommendedTimeNum ? "active" : ""}`} onClick={onItemClick(recommendedTimeNum)}>{recommendedTimeLetter}</Material>
            <Material className={`manual-time-day-item ${time !== dateConstant.noLimitTime && time !== recommendedTimeNum ? "active" : ""}`} onClick={onItemClick("manual")}>{textConstant.manualSelect}</Material>
        </FloatingMenu>
    )
}

export default ManualTimeDayItemMenu