import {useEffect, useState} from "react"
import Material from "../../seyed-modules/components/Material"
import KeyboardArrowSvg from "../../boomino-front-modules/media/svg/KeyboardArrowSvg"
import Button from "../../seyed-modules/components/Button"
import Scroll from "./Scroll"
import goBack from "../../seyed-modules/helpers/goBack"
import dateConstant from "../constant/dateConstant"
import numberCorrection from "../../seyed-modules/helpers/numberCorrection"
import fixTimeFormat from "../helpers/fixTimeFormat"
import VerticalPanel from "../../boomino-front-modules/components/VerticalPanel"
import GetTextConstant from "../hooks/GetTextConstant"

function TimePicker({parent, name, full_title, title, onChange, placeholder, defaultValue, justShowPanel})
{
    const {textConstant} = GetTextConstant()
    const [isShowPanel, setIsShowPanel] = useState(false)
    const [value, setValue] = useState(null)
    const [hour, setHour] = useState(dateConstant.defaultHour)
    const [minute, setMinute] = useState(dateConstant.defaultMinute)

    useEffect(() =>
    {
        if (defaultValue)
        {
            const split = numberCorrection(defaultValue).split(":")
            if (split.length === 2)
            {
                const hour = +split[0]
                const minute = +split[1]
                setHour(hour)
                setMinute(minute)
                setValue(fixTimeFormat({hour, minute}))
            }
        }
        if (justShowPanel) showPanel()
        // eslint-disable-next-line
    }, [])

    function hidePanel()
    {
        setIsShowPanel(false)
        if (justShowPanel) justShowPanel()
    }

    function showPanel()
    {
        setIsShowPanel(true)
    }

    function onMinuteChange(value)
    {
        setMinute(value)
    }

    function onHourChange(value)
    {
        setHour(value)
    }

    function submitTime()
    {
        const value = fixTimeFormat({hour, minute})
        setValue(value)
        onChange({name, value})
        goBack()
    }

    return (
        <>
            {
                !justShowPanel &&
                <label className="select-label">
                    <p className="select-label-text">{title}</p>
                    <Material className="select-main" onClick={showPanel}>
                        <div className={`select-main-text ${value ? "active" : ""}`}>
                            {value || placeholder || full_title || title}
                        </div>
                        <KeyboardArrowSvg isDown className={`select-main-svg ${isShowPanel ? "show" : ""}`}/>
                    </Material>
                </label>
            }

            {
                isShowPanel &&
                <VerticalPanel parent={parent} close={hidePanel}>
                    <div className="select-title">{full_title || title}</div>
                    <div className="select-birth-cont">
                        <div className="select-birth-col">
                            <div className="select-birth-col-title">{textConstant.minute}</div>
                            <Scroll type="minute" onChange={onMinuteChange} defaultValue={minute}/>
                        </div>
                        <div className="select-birth-col">
                            <div className="select-birth-col-title">{textConstant.hour}</div>
                            <Scroll type="hour" onChange={onHourChange} defaultValue={hour}/>
                        </div>
                        <Button className="select-birth-save" onClick={submitTime}>{textConstant.saveBtn}</Button>
                    </div>
                </VerticalPanel>
            }
        </>
    )
}

export default TimePicker