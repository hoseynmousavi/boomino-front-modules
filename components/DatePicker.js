import {useEffect, useState} from "react"
import Material from "../../seyed-modules/components/Material"
import KeyboardArrowSvg from "../../boomino-front-modules/media/svg/KeyboardArrowSvg"
import Button from "../../seyed-modules/components/Button"
import Scroll from "./Scroll"
import goBack from "../../seyed-modules/helpers/goBack"
import dateConstant from "../constant/dateConstant"
import toGregorian from "../helpers/toGregorian"
import numberCorrection from "../../seyed-modules/helpers/numberCorrection"
import fixDateFormat from "../helpers/fixDateFormat"
import VerticalPanel from "../../boomino-front-modules/components/VerticalPanel"
import ShowValidationError from "./ShowValidationError"
import validationConstant from "../constant/validationConstant"

function DatePicker({name, full_title, title, onChange, placeholder, defaultValue, disabled, required, noSpace})
{
    const [isShowPanel, setIsShowPanel] = useState(false)
    const [value, setValue] = useState(null)
    const [haveOpened, setHaveOpened] = useState(false)
    const [day, setDay] = useState(dateConstant.defaultDay)
    const [month, setMonth] = useState(dateConstant.defaultMonth)
    const [year, setYear] = useState(dateConstant.defaultYear)
    const error = required && haveOpened && !isShowPanel && !value && validationConstant.requiredField

    useEffect(() =>
    {
        if (defaultValue)
        {
            const gregorian = numberCorrection(new Date(defaultValue).toLocaleDateString("fa-ir"))
            const split = gregorian.split("/")
            if (split.length === 3)
            {
                const year = +split[0]
                const month = +split[1]
                const day = +split[2]
                setYear(year)
                setMonth(month)
                setDay(day)
                setValue(fixDateFormat({year, month, day, separator: "/"}))
            }
        }
        // eslint-disable-next-line
    }, [])

    function hidePanel()
    {
        setIsShowPanel(false)
    }

    function showPanel()
    {
        setHaveOpened(true)
        setIsShowPanel(true)
    }

    function onDayChange(value)
    {
        setDay(value)
    }

    function onMonthChange(value)
    {
        setMonth(value)
    }

    function onYearChange(value)
    {
        setYear(value)
    }

    function submitBirth()
    {
        setValue(fixDateFormat({year, month, day, separator: "/"}))
        const gregorian = toGregorian(year, month, day)
        onChange({name, value: fixDateFormat({year: gregorian.gy, month: gregorian.gm, day: gregorian.gd, separator: "-"})})
        goBack()
    }

    return (
        <>
            <label className="select-label">
                <p className="select-label-text">{title}</p>
                <Material className={`select-main ${error ? "err" : ""}`} onClick={showPanel} disable={disabled}>
                    <div className={`select-main-text ${value ? "active" : ""}`}>
                        {value || placeholder || full_title || title}
                    </div>
                    <KeyboardArrowSvg className={`select-main-svg ${isShowPanel ? "show" : ""}`}/>
                </Material>
                <ShowValidationError error={error} noSpace={noSpace}/>
            </label>

            {
                isShowPanel &&
                <VerticalPanel close={hidePanel}>
                    <div className="select-title">{full_title || title}</div>
                    <div className="select-birth-cont">
                        <div className="select-birth-col">
                            <div className="select-birth-col-title">روز</div>
                            <Scroll type="day" onChange={onDayChange} defaultValue={day} selectedMonth={month} selectedYear={year}/>
                        </div>
                        <div className="select-birth-col">
                            <div className="select-birth-col-title">ماه</div>
                            <Scroll type="month" onChange={onMonthChange} defaultValue={month}/>
                        </div>
                        <div className="select-birth-col">
                            <div className="select-birth-col-title">سال</div>
                            <Scroll type="year" onChange={onYearChange} defaultValue={year}/>
                        </div>
                        <Button className="select-birth-save" onClick={submitBirth}>ذخیره</Button>
                    </div>
                </VerticalPanel>
            }
        </>
    )
}

export default DatePicker