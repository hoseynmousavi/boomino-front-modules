import {useLayoutEffect, useRef, useState} from "react"
import verifyCodeConstant from "../constant/verifyCodeConstant"
import numberCorrection from "../../seyed-modules/helpers/numberCorrection"

function CodeInput({onChange, disable, error})
{
    const [value, setValue] = useState("")
    const inputRef = useRef(null)
    const {numberOfDigits} = verifyCodeConstant
    const codeWidthHeight = `calc((var(--full-viewport) - (${numberOfDigits} * 6px) - (2 * var(--mobile-first-solid-padding))) / ${numberOfDigits})`

    useLayoutEffect(() =>
    {
        setTimeout(() => inputRef?.current?.focus?.(), 300)
    }, [])

    function resetInput()
    {
        onInputChange({target: {value: ""}})
    }

    function onInputChange(e)
    {
        if (!disable)
        {
            const {value: eventValue} = e.target
            const inputValue = numberCorrection(eventValue.trim())
            if (inputValue.length <= numberOfDigits && !isNaN(inputValue))
            {
                setValue(inputValue)
                if (inputValue.length === numberOfDigits) onChange(inputValue, resetInput)
                else onChange(null)
            }
        }
    }

    return (
        <div className={`code-input-cont ${disable ? "disable" : ""}`}>
            <input className="code-input" ref={inputRef} maxLength={numberOfDigits} type="tel" value={value} onChange={onInputChange}/>
            <div className="code-input-boxes">
                {
                    Array(numberOfDigits).fill(0).map((_, index) =>
                        <div key={index}
                             className={`code-input-box ${error ? "err" : ""} ${value[index] ? "fill" : value.length === index ? "ready" : ""}`}
                             style={{
                                 width: codeWidthHeight,
                                 height: codeWidthHeight,
                             }}>
                            {value[index]}
                        </div>,
                    )
                }
            </div>
        </div>
    )
}

export default CodeInput