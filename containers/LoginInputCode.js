import Material from "../../seyed-modules/components/Material"
import {useContext, useEffect, useRef, useState} from "react"
import CodeInput from "../components/CodeInput"
import regexConstant from "../constant/regexConstant"
import TimerCode from "../components/TimerCode"
import goBack from "../../seyed-modules/helpers/goBack"
import MyLoader from "../../seyed-modules/components/MyLoader"
import Button from "../../seyed-modules/components/Button"
import AuthActions from "../context/auth/AuthActions"
import {AuthContext} from "../context/auth/AuthReducer"
import urlConstant from "../constant/urlConstant"
import errorConstant from "../../seyed-modules/constant/errorConstant"
import showPhoneNumber from "../../seyed-modules/helpers/showPhoneNumber"
import parseQueryString from "../../seyed-modules/helpers/parseQueryString"
import {INFO_TOAST, REQUEST_CANCEL} from "../../seyed-modules/constant/toastTypes"
import toastManager from "../../seyed-modules/helpers/toastManager"
import GetTextConstant from "../hooks/GetTextConstant"
import createMaterialColor from "../../seyed-modules/helpers/createMaterialColor"

function LoginInputCode({route: {match: {params: {phone}}}})
{
    const phoneRef = useRef(phone)
    const {textConstant} = GetTextConstant()
    const {dispatch} = useContext(AuthContext)
    const [timerId, setTimerId] = useState(null)
    const [remainingTime, setRemainingTime] = useState(null)
    const [showError, setShowError] = useState(null)
    const [verifyLoading, setVerifyLoading] = useState(false)
    const [code, setCode] = useState(null)
    const errorTimer = useRef(null)
    const disable = !timerId || verifyLoading
    const inputRef = useRef(null)
    const request = useRef(null)

    useEffect(() =>
    {
        if (!regexConstant.PHONE_REGEX.test(phoneRef.current || "")) window.history.replaceState("", "", urlConstant.home)
        else sendCode()

        return () =>
        {
            clearTimeout(errorTimer.current)
            request?.current?.cancel?.(REQUEST_CANCEL)
        }
        // eslint-disable-next-line
    }, [])

    function sendCode()
    {
        setTimerId(null)
        setRemainingTime(null)
        setShowError(null)
        clearTimeout(errorTimer.current)

        AuthActions.sendOtp({mobile: phoneRef.current, cancel: cancelSource => request.current = cancelSource})
            .then(res =>
            {
                const {already_sent, status, ttl} = res || {}
                if (already_sent) toastManager.addToast({message: status, type: INFO_TOAST})
                if (ttl) setRemainingTime(ttl)
                setTimerId(new Date().toISOString())
                inputRef?.current?.focus?.()
            })
            .catch(err =>
            {
                setTimerId(new Date().toISOString())
                setRemainingTime(0)
                showErrorFunc(err)
            })
    }

    function onCodeChange(code, resetInput)
    {
        setCode(code)
        if (code)
        {
            setVerifyLoading(true)
            AuthActions.loginOrSignup({mobile: phoneRef.current, code, dispatch})
                .then(({isSignUp}) =>
                {
                    const {returnTo} = parseQueryString()
                    if (isSignUp)
                    {
                        window.history.replaceState("", "", `${urlConstant.editInformationAfterSignup}${returnTo ? `?returnTo=${returnTo}` : ""}`)
                    }
                    else
                    {
                        window.history.replaceState("", "", returnTo ? returnTo : urlConstant.home)
                    }
                })
                .catch(err =>
                {
                    setVerifyLoading(false)
                    resetInput()
                    showErrorFunc(err)
                })
        }
    }

    function showErrorFunc(err)
    {
        setShowError(errorConstant(err))
        clearTimeout(errorTimer.current)
        errorTimer.current = setTimeout(() => setShowError(null), 2500)
    }

    return (
        <div className="login">
            <div/>
            <div className="login-content">
                <h1 className="login-title">{textConstant.enterCode}</h1>
                <div className="login-code-desc">
                    {textConstant.enterVerifyCode}
                    <div className="login-code-desc-phone">{showPhoneNumber.showPhone(phoneRef.current)}</div>
                    {textConstant.enterVerifyCodeEnd}
                </div>
                <Material className={`login-code-edit ${verifyLoading ? "disable" : ""}`} disable={verifyLoading} backgroundColor={createMaterialColor({variable: "--link-color"})} onClick={goBack}>
                    {textConstant.editPhone}
                </Material>
                <CodeInput error={!!showError} disable={disable} onChange={onCodeChange} ref={inputRef}/>
                <div className={`login-code-err ${!!showError ? "show" : ""}`}>{showError}</div>
                {
                    timerId ?
                        <TimerCode key={timerId} disable={disable} onEndRetry={sendCode} timeInSeconds={remainingTime}/>
                        :
                        <MyLoader className="login-code-loading" width={32}/>
                }
            </div>
            <div className="login-code-submit">
                <Button type="first" disable={!code} loading={verifyLoading}>{textConstant.submitBtn}</Button>
            </div>
        </div>
    )
}

export default LoginInputCode