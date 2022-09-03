import LogoSvg from "../media/svg/LogoSvg"
import PhoneInput from "../components/PhoneInput"
import {useState} from "react"
import urlConstant from "../constant/urlConstant"
import OnKeyDown from "../../seyed-modules/hooks/OnKeyDown"
import Button from "../../seyed-modules/components/Button"
import textConstant from "../constant/textConstant"
import parseQueryString from "../../seyed-modules/helpers/parseQueryString"

function LoginInputPhone()
{
    const [phone, setPhone] = useState(null)

    OnKeyDown({key: "Enter", callback: goToCode})

    function onPhoneChange(phone)
    {
        setPhone(phone)
    }

    function goToCode()
    {
        if (phone)
        {
            const {returnTo} = parseQueryString()
            window.history.pushState("", "", `${urlConstant.loginVerifyCode(phone)}${returnTo ? `?returnTo=${returnTo}` : ""}`)
        }
    }

    return (
        <div className="login">
            <LogoSvg className="login-logo"/>
            <h1 className="login-title">{textConstant.entering}{process.env.REACT_APP_NAME}</h1>
            <p className="login-desc">{textConstant.enterPhone}</p>
            <PhoneInput onChange={onPhoneChange}/>
            <div className="login-submit">
                <Button type="first" disable={!phone} onClick={goToCode}>{textConstant.continueBtn}</Button>
            </div>
        </div>
    )
}

export default LoginInputPhone