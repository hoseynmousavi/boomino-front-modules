import {useEffect, useRef, useState} from "react"
import RadioItem from "./RadioItem"
import TimePicker from "./TimePicker"
import ManualTimeDayItem from "./ManualTimeDayItem"
import dateConstant from "../constant/dateConstant"
import GetTextConstant from "../hooks/GetTextConstant"
import MinuteToTime from "../hooks/MinuteToTime"

function ManualTimeSetting({parent, setWeekTimes, weekTimes, disabled})
{
    const {textConstant} = GetTextConstant()
    const choiceNum = MinuteToTime({timeMinutes: 15})
    const choiceLetter = MinuteToTime({timeMinutes: 15, withLetter: true})
    const allChoice = [choiceNum, choiceNum, choiceNum, choiceNum, choiceNum, choiceNum, choiceNum]

    const choiceNum2 = MinuteToTime({timeMinutes: 30})
    const choiceLetter2 = MinuteToTime({timeMinutes: 30, withLetter: true})
    const allChoice2 = [choiceNum2, choiceNum2, choiceNum2, choiceNum2, choiceNum2, choiceNum2, choiceNum2]

    const allRecommended = [choiceNum, choiceNum, choiceNum, choiceNum, choiceNum, choiceNum, choiceNum]

    const [weekMode, setWeekMode] = useState("same")
    const [times, setTimes] = useState([...allRecommended])
    const [showTimer, setShowTimer] = useState("")
    const contRef = useRef(null)

    const timeActive = times.every(item => item === choiceNum) ? choiceNum : times.every(item => item === choiceNum2) ? choiceNum2 : "other"

    useEffect(() =>
    {
        if (!weekTimes) setWeekTimes(times)
        else
        {
            setTimes([...weekTimes])
            if (weekTimes.every(item => item === dateConstant.noLimitTime)) setWeekMode("free")
            else if (!weekTimes.every(item => item === weekTimes[0])) setWeekMode("different")
        }
        // eslint-disable-next-line
    }, [])

    function onModeChange(mode)
    {
        return () =>
        {
            if (weekMode !== mode && !disabled)
            {
                contRef?.current?.animate?.(
                    [{opacity: "1", transform: "scale(1) translate3d(0, 0, 0)"}, {opacity: "0", transform: "scale(0.98) translate3d(0, 5px, 0)"}, {opacity: "0", transform: "scale(0.98) translate3d(0, 5px, 0)"}, {opacity: "1", transform: "scale(1) translate3d(0, 0, 0)"}],
                    {duration: 450, easing: "ease-in-out"},
                )
                setTimeout(() =>
                {
                    setWeekMode(mode)
                    if (mode === "free")
                    {
                        const tempTimes = [dateConstant.noLimitTime, dateConstant.noLimitTime, dateConstant.noLimitTime, dateConstant.noLimitTime, dateConstant.noLimitTime, dateConstant.noLimitTime, dateConstant.noLimitTime]
                        setTimes(tempTimes)
                        setWeekTimes(tempTimes)
                    }
                    else
                    {
                        const value = times[0] === dateConstant.noLimitTime ? choiceNum : times[0]
                        const tempTimes = [value, value, value, value, value, value, value]
                        setTimes(tempTimes)
                        setWeekTimes(tempTimes)
                    }
                }, contRef?.current?.animate ? 160 : 0)
            }
        }
    }

    function onTimeChange(times)
    {
        return () =>
        {
            if (!disabled)
            {
                const tempTimes = [...times]
                setTimes(tempTimes)
                setWeekTimes(tempTimes)
            }
        }
    }

    function openTimer(mode)
    {
        return () =>
        {
            if (!disabled) setShowTimer(mode)
        }
    }

    function closeTimer()
    {
        setShowTimer("")
    }

    function setTime({index, value})
    {
        if (showTimer === "same")
        {
            const tempTimes = [value, value, value, value, value, value, value]
            setTimes(tempTimes)
            setWeekTimes(tempTimes)
        }
        else
        {
            const tempTimes = [...times]
            tempTimes[showTimer !== "" ? showTimer : index] = value
            setTimes(tempTimes)
            setWeekTimes(tempTimes)
        }
    }

    return (
        <>
            <div className="manual-time-mode">
                <RadioItem name={textConstant.sameTimeForWeek} isActive={weekMode === "same"} onClick={onModeChange("same")} isRtl/>
                <div className="manual-time-line"/>
                <RadioItem name={textConstant.differentTimeForWeek} isActive={weekMode === "different"} onClick={onModeChange("different")} isRtl/>
                <div className="manual-time-line"/>
                <RadioItem name={textConstant.noLimit} isActive={weekMode === "free"} onClick={onModeChange("free")} isRtl/>
            </div>
            {
                weekMode !== "free" &&
                <div className="manual-time-mode" ref={contRef}>
                    {
                        weekMode === "same" ?
                            <>
                                <RadioItem name={choiceLetter} isActive={timeActive === choiceNum} onClick={onTimeChange(allChoice)} isRtl/>
                                <div className="manual-time-line"/>
                                <RadioItem name={choiceLetter2} isActive={timeActive === choiceNum2} onClick={onTimeChange(allChoice2)} isRtl/>
                                <div className="manual-time-line"/>
                                <RadioItem name={textConstant.manualSelect}
                                           isActive={timeActive === "other"}
                                           onClick={openTimer("same")}
                                           isRtl
                                           rtlExtraContent={<div className="manual-time-set">{times[0] === dateConstant.noLimitTime ? textConstant.noLimit : times[0]}</div>}
                                />
                            </>
                            :
                            <>
                                <ManualTimeDayItem day={textConstant.saturday} time={times[0]} index={0} onChangeRequest={openTimer(0)} onChange={setTime} recommendedTimeLetter={choiceLetter} recommendedTimeNum={choiceNum}/>
                                <ManualTimeDayItem day={textConstant.sunday} time={times[1]} index={1} onChangeRequest={openTimer(1)} onChange={setTime} recommendedTimeLetter={choiceLetter} recommendedTimeNum={choiceNum}/>
                                <ManualTimeDayItem day={textConstant.monday} time={times[2]} index={2} onChangeRequest={openTimer(2)} onChange={setTime} recommendedTimeLetter={choiceLetter} recommendedTimeNum={choiceNum}/>
                                <ManualTimeDayItem day={textConstant.tuesday} time={times[3]} index={3} onChangeRequest={openTimer(3)} onChange={setTime} recommendedTimeLetter={choiceLetter} recommendedTimeNum={choiceNum}/>
                                <ManualTimeDayItem day={textConstant.wednesday} time={times[4]} index={4} onChangeRequest={openTimer(4)} onChange={setTime} recommendedTimeLetter={choiceLetter} recommendedTimeNum={choiceNum}/>
                                <ManualTimeDayItem day={textConstant.thursday} time={times[5]} index={5} onChangeRequest={openTimer(5)} onChange={setTime} recommendedTimeLetter={choiceLetter} recommendedTimeNum={choiceNum}/>
                                <ManualTimeDayItem day={textConstant.friday} time={times[6]} index={6} onChangeRequest={openTimer(6)} onChange={setTime} recommendedTimeLetter={choiceLetter} recommendedTimeNum={choiceNum} isLast/>
                            </>
                    }
                </div>
            }

            {
                showTimer !== "" &&
                <TimePicker parent={parent} defaultValue={weekMode === "same" ? times[0] : times[showTimer]} full_title={textConstant.manualSelectTitle} onChange={setTime} justShowPanel={closeTimer}/>
            }

        </>
    )
}

export default ManualTimeSetting