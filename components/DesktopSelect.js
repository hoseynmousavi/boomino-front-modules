import {dontSwitchGesture} from "../../seyed-modules/hooks/SwitchGesture"
import goBack from "../../seyed-modules/helpers/goBack"
import popOnPopState from "../../seyed-modules/helpers/popOnPopState"
import {useEffect, useState} from "react"

function DesktopSelect({close, children})
{
    const [isHiding, setIsHiding] = useState(false)

    useEffect(() =>
    {
        function hide()
        {
            setIsHiding(true)
            setTimeout(close, 350)
        }

        popOnPopState({callback: hide, dontPush: true})
        // eslint-disable-next-line
    }, [])

    function goBackIfNotHiding()
    {
        if (!isHiding) goBack()
    }

    return (
        <>
            <div className={`select-desktop-back ${dontSwitchGesture}`} onClick={goBackIfNotHiding}/>
            <div className={`select-desktop ${isHiding ? "hide" : ""}`}>
                {children}
            </div>
        </>
    )
}

export default DesktopSelect