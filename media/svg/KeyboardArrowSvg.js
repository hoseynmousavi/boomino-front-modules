import React from "react"
import GetTextConstant from "../../hooks/GetTextConstant"

function KeyboardArrowSvg({className, isDown})
{
    const {direction} = GetTextConstant()
    return (
        <svg className={className} viewBox={`${isDown ? "0" : direction === "rtl" ? "-24" : 0} ${isDown ? "0" : direction === "ltr" ? "-24" : 0} 24 24`}>
            <g transform={`rotate(${isDown ? "0" : direction === "rtl" ? "90" : "-90"})`}>
                <path fill="none" d="M17 9.5L12 14.5L7 9.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
        </svg>
    )
}

export default KeyboardArrowSvg