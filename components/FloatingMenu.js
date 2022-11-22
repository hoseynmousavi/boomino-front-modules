import goBack from "../../seyed-modules/helpers/goBack"
import popOnPopState from "../../seyed-modules/helpers/popOnPopState"
import {useLayoutEffect, useRef, useState} from "react"
import Resize from "../../seyed-modules/hooks/Resize"
import GetTheme from "../../seyed-modules/hooks/GetTheme"
import {dontSwitchGesture} from "../../seyed-modules/hooks/SwitchGesture"

function FloatingMenu({children, onClose, menuClassName, dontChangeStatus, dontPush})
{
    const {isDark} = GetTheme()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const {clientHeight} = Resize()
    const menuRef = useRef(null)
    const rect = menuRef.current && menuRef.current.getBoundingClientRect()
    const marginTop =
        rect ?
            rect.bottom + (+menuRef.current.style.marginTop.replace("px", "")) > clientHeight - 10 ?
                clientHeight - (rect.bottom + (+menuRef.current.style.marginTop.replace("px", ""))) - 10 + "px"
                :
                rect.top - (+menuRef.current.style.marginTop.replace("px", "")) < 10 ?
                    0 - (rect.top - (+menuRef.current.style.marginTop.replace("px", ""))) + 10 + "px"
                    :
                    "0px"
            :
            "0px"

    useLayoutEffect(() =>
    {
        setTimeout(() => setIsMenuOpen(true), 10)
        popOnPopState({dontPush, callback: closeMenu, statusBarColor: dontChangeStatus ? null : isDark ? "#101926" : "#E5E5E5"})
        // eslint-disable-next-line
    }, [])

    function closeMenu()
    {
        setIsMenuOpen(false)
        setTimeout(() => onClose(), 250)
    }

    return (
        <>
            <div className={`vertical-panel-back modal ${dontSwitchGesture} ${isMenuOpen ? "show" : ""}`} onClick={goBack}/>
            <div className={`manual-time-day-menu ${dontSwitchGesture} ${menuClassName} ${isMenuOpen ? "show" : ""}`} style={{marginTop}} ref={menuRef}>
                {children}
            </div>
        </>
    )
}

export default FloatingMenu