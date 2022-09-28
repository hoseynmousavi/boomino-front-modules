import {useLayoutEffect, useRef} from "react"
import GetTheme from "../../seyed-modules/hooks/GetTheme"
import checkIsPinned from "../helpers/checkIsPinned"

function BtnBottomFullScreen({className, children, changeOnDark = true})
{
    const btnRef = useRef(null)
    const {isDark} = GetTheme()

    useLayoutEffect(() =>
    {
        setTimeout(() => checkIsPinned({ref: btnRef}), 300)
        // eslint-disable-next-line
    }, [])

    return (
        <div className={`full-screen-btn ${isDark && changeOnDark ? "dark" : ""} ${className}`} ref={btnRef}>
            {children}
        </div>
    )
}

export default BtnBottomFullScreen