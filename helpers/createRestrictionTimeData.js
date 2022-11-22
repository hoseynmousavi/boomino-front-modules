import timeToMinute from "./timeToMinute"

function createRestrictionTimeData({timeMode, weekTimes, recommended})
{
    return timeMode === "recommended" ?
        {times: recommended}
        :
        {
            times: {
                saturday: timeToMinute({time: weekTimes[0]}),
                sunday: timeToMinute({time: weekTimes[1]}),
                monday: timeToMinute({time: weekTimes[2]}),
                tuesday: timeToMinute({time: weekTimes[3]}),
                wednesday: timeToMinute({time: weekTimes[4]}),
                thursday: timeToMinute({time: weekTimes[5]}),
                friday: timeToMinute({time: weekTimes[6]}),
            },
        }
}

export default createRestrictionTimeData