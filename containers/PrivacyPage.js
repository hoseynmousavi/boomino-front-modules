import WizardBack from "../components/WizardBack"
import GetTextConstant from "../hooks/GetTextConstant"
import parseQueryString from "../../seyed-modules/helpers/parseQueryString"
import getDomain from "../../seyed-modules/helpers/getDomain"
import BtnBottomFullScreen from "../components/BtnBottomFullScreen"
import LogoSvg from "../media/svg/LogoSvg"
import Button from "../../seyed-modules/components/Button"
import goBack from "../../seyed-modules/helpers/goBack"
import {useLayoutEffect, useRef} from "react"
import titleDetector from "../helpers/titleDetector"

function PrivacyPage()
{
    const {textConstant} = GetTextConstant()
    const {source} = parseQueryString()
    const isFromAndroid = source?.replace("/", "") === "android"
    const domain = getDomain()
    const contRef = useRef(null)

    useLayoutEffect(() =>
    {
        titleDetector(contRef.current)
    }, [])

    return (
        <div className="about-privacy">
            <WizardBack link={isFromAndroid && `https://${domain}/#back`}
                        title={
                            <div className="about-privacy-header">
                                <LogoSvg className="about-privacy-header-logo"/>
                                <div>{textConstant.privacyTitle}</div>
                            </div>
                        }
            />
            <div className="about-privacy-text" ref={contRef}>
                {textConstant.privacyText}
            </div>
            <BtnBottomFullScreen>
                <Button onClick={goBack}>
                    {textConstant.iRead}
                </Button>
            </BtnBottomFullScreen>
        </div>
    )
}

export default PrivacyPage