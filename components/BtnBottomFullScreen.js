import {useRef} from "react"
import CheckIsPinned from "../hooks/CheckIsPinned"
import GetTheme from "../../seyed-modules/hooks/GetTheme"

function BtnBottomFullScreen({className, children})
{
    const btnRef = useRef(null)
    const {isDark} = GetTheme()

    CheckIsPinned({ref: btnRef})

    return (
        <div className={`full-screen-btn ${isDark ? "dark" : ""} ${className}`} ref={btnRef}>
            {children}
        </div>
    )
}

export default BtnBottomFullScreen