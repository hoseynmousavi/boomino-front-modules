import LogoSvg from "../media/svg/LogoSvg"
import PhoneInput from "../components/PhoneInput"
import {useState} from "react"
import urlConstant from "../constant/urlConstant"
import Button from "../../seyed-modules/components/Button"
import parseQueryString from "../../seyed-modules/helpers/parseQueryString"
import BtnBottomFullScreen from "../components/BtnBottomFullScreen"
import GetTextConstant from "../hooks/GetTextConstant"
import Link from "../../seyed-modules/components/Link"
import Material from "../../seyed-modules/components/Material"
import createMaterialColor from "../../seyed-modules/helpers/createMaterialColor"

function LoginInputPhone()
{
    const {textConstant} = GetTextConstant()
    const [phone, setPhone] = useState(null)
    const isDisable = !phone

    function onPhoneChange(phone)
    {
        setPhone(phone)
    }

    function goToCode()
    {
        const {returnTo} = parseQueryString()
        window.history.pushState("", "", `${urlConstant.loginVerifyCode(phone)}${returnTo ? `?returnTo=${returnTo}` : ""}`)
    }

    return (
        <div className="login">
            <div/>
            <div className="login-content">
                <LogoSvg className="login-logo"/>
                <h1 className="login-title">{textConstant.entering}</h1>
                <p className="login-desc">{textConstant.enterPhone}</p>
                <PhoneInput onChange={onPhoneChange} onSubmit={goToCode} disableSubmit={isDisable}/>
            </div>
            <div className="login-bottom">
                <div className="login-privacy">
                    {textConstant.privacyIntro}
                    <Link to={urlConstant.privacy}>
                        <Material className="login-privacy-link" backgroundColor={createMaterialColor({variable: "--link-color"})}>
                            {textConstant.privacyTitle}
                        </Material>
                    </Link>
                    {textConstant.privacyEnd}
                </div>
                <BtnBottomFullScreen>
                    <Button type="first" disable={isDisable} onClick={goToCode}>{textConstant.submitBtn}</Button>
                </BtnBottomFullScreen>
            </div>
        </div>
    )
}

export default LoginInputPhone