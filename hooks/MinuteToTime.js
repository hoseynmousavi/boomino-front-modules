import fixTimeFormat from "../helpers/fixTimeFormat"
import GetTextConstant from "./GetTextConstant"

function MinuteToTime(input)
{
    const {textConstant} = GetTextConstant()
    const temp = input && typeof input === "object" ? input : {}
    const {timeMinutes, timeSeconds, withLetter} = temp
    if (timeMinutes || timeMinutes === 0 || timeSeconds || timeSeconds === 0)
    {
        const hour = +Math.floor(timeMinutes / 60)
        const minute = +Math.floor(timeMinutes % 60)
        const second = +timeSeconds
        if (withLetter)
        {
            if (!hour && !second && minute === 15) return textConstant.oneQuarter
            else if (!hour && !second && minute === 30) return textConstant.halfHour
            else
            {
                let time = []
                if (hour) time.push(hour + textConstant.spaceHour)
                if (minute) time.push(minute + textConstant.spaceMinute)
                if (second) time.push(second + textConstant.spaceSecond)

                if (time.length) return time.join(textConstant.and)
                else return textConstant.emptyTime
            }
        }
        else return fixTimeFormat({hour, minute})
    }
    else return input
}

export default MinuteToTime