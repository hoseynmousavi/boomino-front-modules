import BackSvg from "../media/svg/BackSvg"
import Material from "../../seyed-modules/components/Material"
import goBack from "../../seyed-modules/helpers/goBack"
import ScrollY from "../../seyed-modules/hooks/ScrollY"
import {useRef, useState} from "react"
import TextOverflow from "./TextOverflow"
import Link from "../../seyed-modules/components/Link"
import GetTheme from "../../seyed-modules/hooks/GetTheme"
import createSafariBlurNav from "../../seyed-modules/helpers/createSafariBlurNav"
import GetTextConstant from "../hooks/GetTextConstant"

function WizardBack({secondPadding, title, headerTile, desc, dontFix, link, isDisable, dontShowBack})
{
    const {textConstant} = GetTextConstant()
    const [isFix, setIsFix] = useState(false)
    const {isDark} = GetTheme()
    const [showFixTitle, setShowFixTitle] = useState(false)
    const contRef = useRef(null)
    const titleRef = useRef(null)

    function condition({scrollTop})
    {
        if (!dontFix)
        {
            if (scrollTop > contRef.current.offsetTop) setIsFix(true)
            else setIsFix(false)

            if (titleRef?.current)
            {
                if (scrollTop + 62 > titleRef.current.offsetTop + titleRef.current.scrollHeight) setShowFixTitle(true)
                else setShowFixTitle(false)
            }
        }
    }

    ScrollY({condition})

    return (
        <div className="wizard-back-cont" ref={contRef}>
            <div
                className={`wizard-back-fixer ${isFix ? `fix ${isDark ? "dark" : ""}` : ""} ${secondPadding ? "second-padding" : dontFix ? "no-padding" : ""}`}
                style={
                    createSafariBlurNav({
                        color: !isFix && "transparent",
                        variable: isDark ? "--second-background-color" : "--first-background-color",
                        blur: isFix,
                    })
                }
            >
                {
                    !dontShowBack ?
                        link ?
                            <Link href={link}>
                                <Material className="wizard-back">
                                    <BackSvg className="wizard-back-svg"/>
                                    <div className={`wizard-back-title ${isFix ? "hide" : ""}`}>{textConstant.back}</div>
                                </Material>
                            </Link>
                            :
                            <Material className="wizard-back" onClick={isDisable ? undefined : goBack}>
                                <BackSvg className="wizard-back-svg"/>
                                <div className={`wizard-back-title ${isFix ? "hide" : ""}`}>{textConstant.back}</div>
                            </Material>
                        :
                        null
                }
                {(title || headerTile) && <div className={`wizard-back-text-title fix ${showFixTitle || (isFix && !title && headerTile) ? "" : "hide"}`}>{title || headerTile}</div>}
                <div className="wizard-back-end"/>
            </div>
            {title && <div ref={titleRef}><TextOverflow className={`wizard-back-text-title not-fix ${secondPadding ? "second-padding" : dontFix ? "no-padding" : ""}`}>{title}</TextOverflow></div>}
            {desc && <div className={`wizard-back-text-desc ${secondPadding ? "second-padding" : dontFix ? "no-padding" : ""}`}>{desc}</div>}
        </div>
    )
}

export default WizardBack