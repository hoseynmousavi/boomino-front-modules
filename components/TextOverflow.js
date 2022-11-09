import {useEffect, useRef, useState} from "react"
import createMaterialColor from "../../seyed-modules/helpers/createMaterialColor"
import pageLoaded from "../../seyed-modules/helpers/pageLoaded"
import GetTextConstant from "../hooks/GetTextConstant"

function TextOverflow({className, children, infinite})
{
    const {direction} = GetTextConstant()
    const [showAddedText, setShowAddedText] = useState(false)
    const textRef = useRef(null)
    const textSlideRef = useRef(null)
    const scrollWidthRef = useRef(null)
    const multiple = direction === "rtl" ? 1 : -1

    useEffect(() =>
    {
        function makeTextRight()
        {
            if (pageLoaded() && textRef.current)
            {
                const text = textRef.current
                const textSlide = textSlideRef.current
                const {scrollWidth, clientWidth} = text || {}
                if (!scrollWidthRef.current) scrollWidthRef.current = scrollWidth
                if (scrollWidthRef.current > clientWidth)
                {
                    setShowAddedText(true)
                    textSlide.style.transition = `transform linear ${scrollWidthRef.current * 20}ms`
                    textSlide.style.transform = `translate3d(${multiple * (scrollWidthRef.current + 16)}px,0,0)`
                    setTimeout(() =>
                    {
                        textSlide.style.transition = `transform linear 0ms`
                        textSlide.style.transform = `translate3d(0,0,0)`
                        if (infinite) setTimeout(makeTextRight, 2500)
                    }, scrollWidthRef.current * 20)
                }
            }
            else
            {
                window.addEventListener("load", makeTextRight)
            }
        }

        setTimeout(makeTextRight, 1000)

        return () => window.removeEventListener("load", makeTextRight)
        // eslint-disable-next-line
    }, [])

    return (
        <div className={`text-overflow ${showAddedText ? "added" : ""} ${className}`} ref={textRef}>
            {
                showAddedText &&
                <>
                    <div className="text-overflow-shadow"
                         style={{background: `linear-gradient(to right, ${createMaterialColor({variable: "--first-background-color", alpha: "1"})}, ${createMaterialColor({variable: "--second-background-color", alpha: "0"})})`}}
                    />
                    <div className="text-overflow-shadow right"
                         style={{background: `linear-gradient(to left, ${createMaterialColor({variable: "--first-background-color", alpha: "1"})}, ${createMaterialColor({variable: "--second-background-color", alpha: "0"})})`}}
                    />
                </>
            }
            <div ref={textSlideRef}>
                {children}
                {showAddedText && <div className="text-overflow-slide-span">{children}</div>}
            </div>
        </div>
    )
}

export default TextOverflow