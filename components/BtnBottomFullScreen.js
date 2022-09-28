import {useLayoutEffect, useRef} from "react"
import GetTheme from "../../seyed-modules/hooks/GetTheme"
import checkIsPinned from "../helpers/checkIsPinned"

function BtnBottomFullScreen({className, children, delayCheckPin, changeOnDark = true})
{
    const btnRef = useRef(null)
    const {isDark} = GetTheme()

    useLayoutEffect(() =>
    {
        setTimeout(() => checkIsPinned({ref: btnRef}), delayCheckPin ? 300 : 0)
        // eslint-disable-next-line
    }, [])

    return (
        <div className={`full-screen-btn ${isDark && changeOnDark ? "dark" : ""} ${className}`} ref={btnRef}>
            {children}
        </div>
    )
}

export default BtnBottomFullScreen