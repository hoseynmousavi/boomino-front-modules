import {useLayoutEffect, useRef, useState} from "react"
import numberCorrection from "../../seyed-modules/helpers/numberCorrection"
import showPhoneNumber, {phoneSeparator} from "../../seyed-modules/helpers/showPhoneNumber"
import fixInputScroll from "../helpers/fixInputScroll"

function PhoneInput({onChange})
{
    const [value, setValue] = useState("")
    const inputRef = useRef(null)

    useLayoutEffect(() =>
    {
        if (window.innerWidth > 480) setTimeout(() => inputRef?.current?.focus(), 300)
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

    function onClick()
    {
        fixInputScroll({inputRef})
    }

    return (
        <div className="phone-input-cont">
            <input className="phone-input" onClick={onClick} onPaste={onPaste} ref={inputRef} value={showPhone(value)} max={9} type="tel" onChange={onInputChange}/>
            <div className={`phone-input-placeholder ${value.length > 0 ? "active" : ""}`}>۰۹</div>
        </div>
    )
}

export default PhoneInput