import WizardBack from "../components/WizardBack"
import GetTextConstant from "../hooks/GetTextConstant"
import parseQueryString from "../../seyed-modules/helpers/parseQueryString"
import getDomain from "../../seyed-modules/helpers/getDomain"
import BtnBottomFullScreen from "../components/BtnBottomFullScreen"
import LogoSvg from "../media/svg/LogoSvg"

function PrivacyPage()
{
    const {textConstant} = GetTextConstant()
    const {source} = parseQueryString()
    const isFromAndroid = source?.replace("/", "") === "android"
    const domain = getDomain()
    return (
        <div className="privacy">
            <WizardBack link={isFromAndroid && `https://${domain}/#back`}
                        title={
                            <div className="about-privacy-header">
                                <LogoSvg className="about-privacy-header-logo"/>
                                <div>{textConstant.privacyTitle}</div>
                            </div>
                        }
            />
            <div className="privacy-text">{textConstant.privacyText}</div>
            <BtnBottomFullScreen>
                {textConstant.iRead}
            </BtnBottomFullScreen>
        </div>
    )
}

export default PrivacyPage