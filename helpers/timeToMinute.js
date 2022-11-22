function timeToMinute({time})
{
    if (time)
    {
        const split = time.split(":")
        const hour = +split[0]
        const minute = +split[1]
        return hour * 60 + minute
    }
    else return time
}

export default timeToMinute