import {useEffect, useState} from "react"
import verifyCodeConstant from "../constant/verifyCodeConstant"
import Material from "../../seyed-modules/components/Material"

function TimerCode({onEndRetry, disable, timeInSeconds = verifyCodeConstant.secondsForResend})
{
    const [remain, setRemain] = useState(fixFormat(timeInSeconds))

    function fixFormat(seconds)
    {
        return `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`
    }

    useEffect(() =>
    {
        const start = new Date()
        const timer = setInterval(() =>
        {
            const remainSeconds = Math.floor(timeInSeconds + ((start - new Date()) / 1000))
            if (remainSeconds >= 0) setRemain(fixFormat(remainSeconds))
            if (remainSeconds <= 0) clearInterval(timer)
        }, 900)
        return () => clearInterval(timer)
        // eslint-disable-next-line
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