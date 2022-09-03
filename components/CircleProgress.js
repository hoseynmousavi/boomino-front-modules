import React from "react"

function CircleProgress({percent = 0, strokeColor = "var(--first-color)", opacity = 1, disableOpacity = 0.4, strokeWidth = 2})
{
    return (
        <svg className="circular-progress" viewBox="29 29 42 42" style={{opacity}}>
            <circle className="circular-progress-path" style={{stroke: strokeColor, strokeDasharray: `${percent / 4 * 5}, 125`, opacity: percent === 0 ? "0" : "1"}} cx="50" cy="50" r="20" fill="none" strokeWidth={strokeWidth} strokeMiterlimit="10"/>
            <circle className="circular-progress-path transparent" style={{opacity: disableOpacity, stroke: strokeColor, strokeDasharray: `125, 125`}} cx="50" cy="50" r="20" fill="none" strokeWidth={strokeWidth} strokeMiterlimit="10"/>
        </svg>
    )
}

export default CircleProgress