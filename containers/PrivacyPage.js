import WizardBack from "../components/WizardBack"
import GetTextConstant from "../hooks/GetTextConstant"
import parseQueryString from "../../seyed-modules/helpers/parseQueryString"
import getDomain from "../../seyed-modules/helpers/getDomain"

function PrivacyPage()
{
    const {textConstant} = GetTextConstant()
    const {source} = parseQueryString()
    const isFromAndroid = source?.replace("/", "") === "android"
    const domain = getDomain()
    return (
        <div className="privacy">
            <WizardBack link={isFromAndroid && `https://${domain}/#back`} title={textConstant.privacyTitle}/>
            <div className="privacy-text">{textConstant.privacyText}</div>
        </div>
    )
}

export default PrivacyPage