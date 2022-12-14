import {useEffect, useRef, useState} from "react"
import numberCorrection from "../../seyed-modules/helpers/numberCorrection"
import showPhoneNumber, {phoneSeparator} from "../../seyed-modules/helpers/showPhoneNumber"
import fixInputScroll from "../helpers/fixInputScroll"
import inputKeyDownEnter from "../helpers/inputKeyDownEnter"

function PhoneInput({onChange, onSubmit, disableSubmit})
{
    const [value, setValue] = useState("")
    const inputRef = useRef(null)
    const timerFixScroll = useRef(null)

    useEffect(() =>
    {
        if (window.innerWidth > 480) setTimeout(() => inputRef?.current?.focus(), 300)
        return () => clearTimeout(timerFixScroll.current)
    }, [])

    function onInputChange(e)
    {
        const {value: eventValue} = e.target
        const inputValue = numberCorrection(showPhoneNumber.fixToNumber(eventValue))
        if (inputValue.length <= 9 && !isNaN(inputValue))
        {
            setValue(inputValue)
            if (inputValue.length === 9) onChange("09" + inputValue)
            else onChange(null)
        }
    }

    function onPaste(e)
    {
        const clipboardData = e?.clipboardData || window?.clipboardData
        const pastedData = clipboardData?.getData("Text")
        const inputValue = numberCorrection(showPhoneNumber.fixToNumber(pastedData))
        if (inputValue && inputValue.length === 11 && !isNaN(inputValue) && inputValue.startsWith("09"))
        {
            setValue(inputValue.slice(2, 11))
            onChange(inputValue)
        }
    }

    function showPhone(input)
    {
        return input && !isNaN(input) ?
            input.length >= 6 ?
                input.slice(0, 2) + phoneSeparator + input.slice(2, 5) + phoneSeparator + input.slice(5, input.length)
                :
                input.length >= 3 ?
                    input.slice(0, 2) + phoneSeparator + input.slice(2, input.length)
                    :
                    input
            :
            input
    }

    function onFocusClick()
    {
        clearTimeout(timerFixScroll.current)
        timerFixScroll.current = fixInputScroll({inputRef})
    }

    function onBlur()
    {
        clearTimeout(timerFixScroll.current)
    }

    return (
        <div className="phone-input-cont">
            <input className="phone-input"
                   onFocus={onFocusClick}
                   onClick={onFocusClick}
                   onBlur={onBlur}
                   onPaste={onPaste}
                   ref={inputRef}
                   value={showPhone(value)}
                   max={9}
                   type="tel"
                   onChange={onInputChange}
                   onKeyDown={inputKeyDownEnter({onSubmit, disableSubmit})}
            />
            <div className={`phone-input-placeholder ${value.length > 0 ? "active" : ""}`}>09</div>
        </div>
    )
}

export default PhoneInput