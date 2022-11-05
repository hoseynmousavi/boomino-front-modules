import {useEffect, useRef} from "react"
import checkIsPinned from "../helpers/checkIsPinned"

function BtnBottomFullScreen({className, children, delayCheckPin = true})
{
    const btnRef = useRef(null)

    useEffect(() =>
    {
        setTimeout(() => checkIsPinned({ref: btnRef}), delayCheckPin ? 300 : 0)
        // eslint-disable-next-line
    }, [])

    return (
        <div className={`full-screen-btn ${className}`} ref={btnRef}>
            {children}
        </div>
    )
}

export default BtnBottomFullScreen