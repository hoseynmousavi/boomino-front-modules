import fixTimeFormat from "../helpers/fixTimeFormat"
import GetTextConstant from "./GetTextConstant"

function MinuteToTime(input)
{
    const {textConstant} = GetTextConstant()
    const temp = input && typeof input === "object" ? input : {}
    const {timeMinutes, timeSeconds, withLetter} = temp
    if (timeMinutes || timeMinutes === 0 || timeSeconds || timeSeconds === 0)
    {
        const hour = Math.floor(timeMinutes / 60)
        const minute = Math.floor(timeMinutes % 60)
        const second = timeSeconds
        if (withLetter)
        {
            let time = `${hour ? hour + textConstant.spaceHour : ""}${hour && minute ? textConstant.and : ""}${minute ? minute + textConstant.spaceMinute : ""}${(hour || minute) && second ? textConstant.and : ""}${second ? second + textConstant.spaceSecond : ""}`
            if (!hour && !second && +minute === 15) time = textConstant.oneQuarter
            else if (!hour && !second && +minute === 30) time = textConstant.halfHour
            if (time) return time
            else return textConstant.emptyTime
        }
        else return fixTimeFormat({hour, minute})
    }
    else return input
}

export default MinuteToTime