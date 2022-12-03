import {useEffect, useRef, useState} from "react"
import dateConstant from "../constant/dateConstant"
import scrollWithDragDrop from "../../seyed-modules/helpers/scrollWithDragDrop"
import vibrate from "../../seyed-modules/helpers/vibrate"
import checkParentClass from "../../seyed-modules/helpers/checkParentClass"
import createMaterialColor from "../../seyed-modules/helpers/createMaterialColor"

function Scroll({type, selectedMonth, selectedYear, onChange, defaultValue})
{
    const [activeIndex, setActiveIndex] = useState(0)
    const scrollHeight = 250
    const scrollItem = 50
    const scrollCont = useRef(null)
    const timerScroll = useRef(null)
    const isTouching = useRef(false)
    const leastYear = dateConstant.thisYear - 18

    useEffect(() =>
    {
        if (defaultValue || defaultValue === 0)
        {
            if (type === "year")
            {
                setActiveIndex(defaultValue - leastYear)
                fixScroll(defaultValue - leastYear, true)
            }
            else if (type === "hour" || type === "minute")
            {
                setActiveIndex(defaultValue)
                fixScroll(defaultValue, true)
            }
            else
            {
                setActiveIndex(defaultValue - 1)
                fixScroll(defaultValue - 1, true)
            }
        }
        scrollWithDragDrop({ref: scrollCont.current})

        return () => clearTimeout(timerScroll.current)
        // eslint-disable-next-line
    }, [])

    function onScroll(e)
    {
        const scrollTop = Math.max(0, Math.min(e.target.scrollTop, e.target.scrollHeight - e.target.clientHeight))
        const index = Math.floor((scrollTop + scrollItem / 2) / scrollItem)
        if (activeIndex && index !== activeIndex) vibrate(15)
        setActiveIndex(index)
        fixScroll()
    }

    function fixScroll(index, isDefault)
    {
        clearTimeout(timerScroll.current)
        timerScroll.current = setTimeout(() =>
        {
            const activeIndex = index !== undefined ? index : Math.floor((scrollCont.current.scrollTop + scrollItem / 2) / scrollItem)
            if (isTouching.current === false)
            {
                scrollCont.current.scrollTo({top: activeIndex * scrollItem, behavior: isDefault ? "auto" : "smooth"})
                if (type === "year") onChange(activeIndex + leastYear)
                else if (type === "hour" || type === "minute") onChange(activeIndex)
                else onChange(activeIndex + 1)
            }
        }, isDefault ? 0 : 250)
    }

    function startTouch()
    {
        isTouching.current = true
    }

    function endTouch()
    {
        isTouching.current = false
        fixScroll()
    }

    function onItemClick(index)
    {
        return function (e)
        {
            if (!checkParentClass(e.target, "dragging")) fixScroll(index, false)
        }
    }

    return (
        <div className="select-birth-items dont-gesture">
            <div className="select-birth-items-shadow" style={{background: `linear-gradient(to bottom, ${createMaterialColor({variable: "--first-background-color", alpha: "1"})}, ${createMaterialColor({variable: "--first-background-color", alpha: "0"})})`}}/>
            <div className="select-birth-items-shadow bottom" style={{background: `linear-gradient(to top, ${createMaterialColor({variable: "--first-background-color", alpha: "1"})}, ${createMaterialColor({variable: "--first-background-color", alpha: "0"})})`}}/>
            <div className="select-birth-row" style={{height: scrollItem + "px"}}/>
            <div className="select-birth-items-scroll hide-scroll"
                 tabIndex="0"
                 style={{height: scrollHeight + "px"}}
                 onScroll={onScroll}
                 ref={scrollCont}
                 onTouchStart={startTouch}
                 onTouchEnd={endTouch}
            >
                <div style={{height: scrollHeight / 2 - scrollItem / 2 + "px"}}/>
                {
                    type === "month" ?
                        dateConstant.months.map((item, index) =>
                            <div key={index} className={`select-birth-item ${activeIndex === index ? "active" : ""}`} style={{height: scrollItem + "px"}} onClick={onItemClick(index)}>
                                {item}
                            </div>,
                        )
                        :
                        type === "day" ?
                            Array(selectedMonth <= 6 ? 31 : selectedMonth === 12 && selectedYear % 4 !== 3 ? 29 : 30).fill(0).map((_, index) =>
                                <div key={index} className={`select-birth-item ${activeIndex === index ? "active" : ""}`} style={{height: scrollItem + "px"}} onClick={onItemClick(index)}>
                                    {index + 1}
                                </div>,
                            )
                            :
                            type === "year" ?
                                Array(dateConstant.thisYear - leastYear + 1).fill(0).map((_, index) =>
                                    <div key={index} className={`select-birth-item ${activeIndex === index ? "active" : ""}`} style={{height: scrollItem + "px"}} onClick={onItemClick(index)}>
                                        {index + leastYear}
                                    </div>,
                                )
                                :
                                type === "hour" ?
                                    Array(24).fill(0).map((_, index) =>
                                        <div key={index} className={`select-birth-item ${activeIndex === index ? "active" : ""}`} style={{height: scrollItem + "px"}} onClick={onItemClick(index)}>
                                            {index < 10 ? "0" + index : index}
                                        </div>,
                                    )
                                    :
                                    Array(60).fill(0).map((_, index) =>
                                        <div key={index} className={`select-birth-item ${activeIndex === index ? "active" : ""}`} style={{height: scrollItem + "px"}} onClick={onItemClick(index)}>
                                            {index < 10 ? "0" + index : index}
                                        </div>,
                                    )
                }
                <div style={{height: scrollHeight / 2 - scrollItem / 2 + "px"}}/>
            </div>
        </div>
    )
}

export default Scroll