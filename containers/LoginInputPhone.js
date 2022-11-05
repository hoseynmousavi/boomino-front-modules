import LogoSvg from "../media/svg/LogoSvg"
import PhoneInput from "../components/PhoneInput"
import {useState} from "react"
import urlConstant from "../constant/urlConstant"
import Button from "../../seyed-modules/components/Button"
import parseQueryString from "../../seyed-modules/helpers/parseQueryString"
import BtnBottomFullScreen from "../components/BtnBottomFullScreen"
import GetTextConstant from "../hooks/GetTextConstant"

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
            <BtnBottomFullScreen>
                <Button type="first" disable={isDisable} onClick={goToCode}>{textConstant.continueBtn}</Button>
            </BtnBottomFullScreen>
        </div>
    )
}

export default LoginInputPhone