import {useEffect, useState} from "react"

function RangeSlider({defaultValue, onChange})
{
    const [value, setValue] = useState(50)

    useEffect(() =>
    {
        if (defaultValue) setValue(defaultValue)
        // eslint-disable-next-line
    }, [])

    function onSliderChange(e)
    {
        setValue(e.target.value)
        onChange(e.target.value)
    }

    return (
        <div className="range-slider-cont dont-gesture">
            <input type="range" min="1" max="100" className="range-slider" value={value} onChange={onSliderChange}/>
            <div className="range-slider-fill" style={{width: value + "%"}}/>
        </div>
    )
}

export default RangeSlider