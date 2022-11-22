import Material from "../../seyed-modules/components/Material"
import KeyboardArrowSvg from "../media/svg/KeyboardArrowSvg"
import {useState} from "react"
import dateConstant from "../constant/dateConstant"
import ManualTimeDayItemMenu from "./ManualTimeDayItemMenu"
import GetTextConstant from "../hooks/GetTextConstant"

function ManualTimeDayItem({day, time, index, onChangeRequest, onChange, isLast, recommendedTimeNum, recommendedTimeLetter})
{
    const {textConstant} = GetTextConstant()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function openMenu()
    {
        setIsMenuOpen(true)
    }

    function closeMenu()
    {
        setIsMenuOpen(false)
    }

    function onMenuChange(mode)
    {
        if (mode === "manual") onChangeRequest()
        else onChange({index, value: mode})
    }

    return (
        <div className="manual-time-day-cont">
            <Material className={`manual-time-day ${isLast ? "last" : ""}`} onClick={openMenu}>
                <div>{day}</div>
                <div className="manual-time-day-time">
                    <div>{time === dateConstant.noLimitTime ? textConstant.noLimit : time}</div>
                    <KeyboardArrowSvg isDown className="manual-time-day-time-svg"/>
                </div>
            </Material>
            {
                isMenuOpen &&
                <ManualTimeDayItemMenu closeMenuItem={closeMenu} onChange={onMenuChange} time={time} recommendedTimeNum={recommendedTimeNum} recommendedTimeLetter={recommendedTimeLetter}/>
            }
        </div>
    )
}

export default ManualTimeDayItem