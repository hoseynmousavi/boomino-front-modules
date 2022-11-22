import {useEffect, useRef} from "react"
import {createPortal} from "react-dom"
import popOnPopState from "../../seyed-modules/helpers/popOnPopState"
import goBack from "../../seyed-modules/helpers/goBack"
import checkParentClass from "../../seyed-modules/helpers/checkParentClass"
import changeBodyOverflow from "../../seyed-modules/helpers/changeBodyOverflow"
import onResize from "../../seyed-modules/helpers/onResize"
import GetTheme from "../../seyed-modules/hooks/GetTheme"
import {dontSwitchGesture} from "../../seyed-modules/hooks/SwitchGesture"

function VerticalPanel({parent = "root", children, className, contentClassName, style, close, statusBarColor, dontChangeStatus, dontPush})
{
    const root = document.getElementById(parent)
    const {isDark} = GetTheme()
    let gesture = useRef(false)
    let maxHeight = useRef(0)
    let posY = useRef(0)
    let translateY = useRef(0)
    let deltaY = useRef(0)
    let fullModal = useRef(false)
    const sidebarRef = useRef(null)
    const sidebarContentRef = useRef(null)
    const sidebarBack = useRef(null)
    const isHiding = useRef(false)
    const removeResize = useRef(null)

    useEffect(() =>
    {
        changeBodyOverflow(true, parent)
        popOnPopState({dontPush, callback: hideSidebar, dontChangeOverflow: true, statusBarColor: dontChangeStatus ? null : statusBarColor || (isDark ? "#0D0D0D" : "#7F7F7F")})
        setHeight({reset: false})
        removeResize.current = onResize({callback: () => setHeight({reset: true})})
        return () => removeResize.current && removeResize.current()
        // eslint-disable-next-line
    }, [])

    function setHeight({reset})
    {
        if (reset)
        {
            sidebarContentRef.current.style.removeProperty("height")
            fullModal.current = false
            maxHeight.current = 0
        }

        setTimeout(() =>
        {
            if (sidebarRef.current.scrollHeight < root.clientHeight) maxHeight.current = -sidebarRef.current.scrollHeight
            else
            {
                maxHeight.current = -root.clientHeight
                sidebarContentRef.current.style.height = root.clientHeight - 45 + "px"
                fullModal.current = true
            }
            showSidebar()
        }, 0)
    }

    function onTouchStart(e)
    {
        if (!checkParentClass(e.target, "dont-gesture") && sidebarContentRef.current.scrollTop <= 0)
        {
            posY.current = e.touches?.[0].clientY || e.clientY
            gesture.current = true
            if (!e.touches?.[0].clientX)
            {
                document.addEventListener("mousemove", onTouchMove, {passive: true})
                document.addEventListener("mouseup", onTouchEnd, {passive: true})
            }
        }
    }

    function onTouchMove(e)
    {
        if (gesture.current)
        {
            deltaY.current = posY.current - (e.touches?.[0].clientY || e.clientY)
            posY.current = e.touches?.[0].clientY || e.clientY
            translateY.current = translateY.current - deltaY.current <= 0 ? translateY.current - deltaY.current >= maxHeight.current ? translateY.current - deltaY.current : maxHeight.current : 0
            sidebarRef.current.style.transform = `translate3d(0, ${translateY.current}px, 0)`
            if (fullModal.current)
            {
                sidebarRef.current.style.transition = "border-radius linear 0.2s"
                if (translateY.current === maxHeight.current) sidebarRef.current.style.borderRadius = "0 0 0 0"
                else sidebarRef.current.style.borderRadius = "var(--second-radius) var(--second-radius) 0 0"
            }
            sidebarBack.current.style.opacity = `${translateY.current / maxHeight.current}`
            sidebarBack.current.style.backdropFilter = `grayscale(${(translateY.current / maxHeight.current) * 100}%)`
            sidebarBack.current.style.webkitBackdropFilter = `grayscale(${(translateY.current / maxHeight.current) * 100}%)`
        }
    }

    function onTouchEnd()
    {
        if (gesture.current)
        {
            if (deltaY.current > 3) showSidebar()
            else if (deltaY.current < -3) goBack()
            else if (translateY.current > maxHeight.current / 2) goBack()
            else showSidebar()
            gesture.current = false
            document.removeEventListener("mousemove", onTouchMove)
            document.removeEventListener("mouseup", onTouchEnd)
        }
    }

    function showSidebar()
    {
        if (translateY.current !== maxHeight.current)
        {
            translateY.current = maxHeight.current
            sidebarRef.current.style.transition = "transform linear 0.2s, border-radius linear 0.2s"
            sidebarRef.current.style.transform = `translate3d(0, ${translateY.current}px, 0)`
            if (fullModal.current)
            {
                sidebarRef.current.style.borderRadius = "0 0 0 0"
                sidebarContentRef.current.style.overflowY = "auto"
            }
            sidebarBack.current.style.transition = "opacity linear 0.2s, backdrop-filter linear 0.2s"
            sidebarBack.current.style.opacity = "1"
            sidebarBack.current.style.backdropFilter = `grayscale(100%)`
            sidebarBack.current.style.webkitBackdropFilter = `grayscale(100%)`
            setTimeout(() =>
            {
                if (sidebarRef?.current) sidebarRef.current.style.transition = "initial"
                if (sidebarBack?.current) sidebarBack.current.style.transition = "initial"
            }, 250)
        }
    }

    function hideSidebar()
    {
        if (translateY.current !== 0)
        {
            isHiding.current = true
            translateY.current = 0
            if (sidebarRef?.current)
            {
                sidebarRef.current.style.transition = "transform linear 0.2s, border-radius linear 0.2s"
                sidebarRef.current.style.transform = `translate3d(0, ${translateY.current}px, 0)`
                if (fullModal.current)
                {
                    sidebarRef.current.style.borderRadius = "var(--second-radius) var(--second-radius) 0 0"
                    sidebarContentRef.current.style.overflowY = "visible"
                }
            }
            if (sidebarBack?.current)
            {
                sidebarBack.current.style.transition = "opacity linear 0.2s, backdrop-filter linear 0.2s"
                sidebarBack.current.style.opacity = `0`
                sidebarBack.current.style.backdropFilter = `grayscale(0)`
                sidebarBack.current.style.webkitBackdropFilter = `grayscale(0)`
            }
            setTimeout(() =>
            {
                changeBodyOverflow(false, parent)
                close()
            }, 250)
        }
    }

    function goBackIfNotHiding()
    {
        if (!isHiding.current)
        {
            isHiding.current = true
            goBack()
        }
    }

    return (
        createPortal(
            <>
                <div className={`vertical-panel-back ${dontSwitchGesture}`} style={parent ? {height: root.clientHeight + "px"} : {}} ref={sidebarBack} onClick={goBackIfNotHiding}/>
                <div className={`vertical-panel ${dontSwitchGesture} ${className}`}
                     style={{...style, ...(parent ? {top: root.clientHeight + "px"} : {})}}
                     ref={sidebarRef}
                     onMouseDown={onTouchStart}
                     onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
                    <div className="vertical-panel-line"/>
                    <div className={`vertical-panel-content hide-scroll ${contentClassName}`} ref={sidebarContentRef}>
                        {children}
                    </div>
                </div>
            </>,
            root,
        )
    )
}

export default VerticalPanel