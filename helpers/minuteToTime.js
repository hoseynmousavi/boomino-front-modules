import fixTimeFormat from "./fixTimeFormat"

function minuteToTime({timeMinutes, timeSeconds, withLetter})
{
    const hour = Math.floor(timeMinutes / 60)
    const minute = Math.floor(timeMinutes % 60)
    const second = timeSeconds
    if (withLetter)
    {
        let time = `${hour ? hour + " ساعت" : ""}${hour && minute ? " و " : ""}${minute ? minute + " دقیقه" : ""}${(hour || minute) && second ? " و " : ""}${second ? second + " ثانیه" : ""}`
        if (time === "15 دقیقه") time = "یک ربع ساعت"
        else if (time === "30 دقیقه") time = "نیم ساعت"
        if (time) return time
        else return "0 ساعت"
    }
    else return fixTimeFormat({hour, minute})
}

export default minuteToTime