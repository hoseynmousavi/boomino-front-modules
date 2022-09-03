import {useEffect, useState} from "react"
import verifyCodeConstant from "../constant/verifyCodeConstant"
import Material from "../../seyed-modules/components/Material"

function TimerCode({onEndRetry, disable})
{
    const [remain, setRemain] = useState(`0${verifyCodeConstant.minutesForResend}:00`)

    useEffect(() =>
    {
        const start = new Date()
        const timer = setInterval(() =>
        {
            const remainSeconds = Math.floor((verifyCodeConstant.minutesForResend * 60) + ((start - new Date()) / 1000))
            const remain = `${Math.floor(remainSeconds / 60) > 9 ? Math.floor(remainSeconds / 60) : "0" + Math.floor(remainSeconds / 60)}:${remainSeconds % 60 > 9 ? remainSeconds % 60 : "0" + remainSeconds % 60}`
            if (remainSeconds >= 0) setRemain(remain)
            if (remainSeconds <= 0) clearInterval(timer)
        }, 900)
        return () => clearInterval(timer)
    }, [])

    return (
        <Material className={`login-code-timer ${disable ? "disable" : remain !== "00:00" ? "" : "pointer"}`} disable={remain !== "00:00" || disable} onClick={onEndRetry}>
            ارسال مجدد کد
            {
                remain !== "00:00" &&
                <>
                    <span> (</span>
                    <div className="login-code-timer-remain">{remain}</div>
                    <span>)</span>
                </>
            }
        </Material>
    )
}

export default TimerCode