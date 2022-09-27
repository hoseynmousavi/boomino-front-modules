import {useRef} from "react"
import CheckIsPinned from "../hooks/CheckIsPinned"
import GetTheme from "../../seyed-modules/hooks/GetTheme"

function BtnBottomFullScreen({className, children, changeOnDark = true})
{
    const btnRef = useRef(null)
    const {isDark} = GetTheme()

    CheckIsPinned({ref: btnRef, threshold: 0.9})

    return (
        <div className={`full-screen-btn ${isDark && changeOnDark ? "dark" : ""} ${className}`} ref={btnRef}>
            {children}
        </div>
    )
}

export default BtnBottomFullScreen