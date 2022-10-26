import {useEffect, useState} from "react"
import Material from "../../seyed-modules/components/Material"
import KeyboardArrowSvg from "../media/svg/KeyboardArrowSvg"
import goBack from "../../seyed-modules/helpers/goBack"
import ShowValidationError from "./ShowValidationError"
import validationConstant from "../constant/validationConstant"
import GetTextConstant from "../hooks/GetTextConstant"
import SelectChoose from "./SelectChoose"
import popOnPopState from "../../seyed-modules/helpers/popOnPopState"

function Select({name, full_title, placeholder, title, items, defaultValue, onChange, disabled, required, noSpace})
{
    const {language} = GetTextConstant()
    const [isShowPanel, setIsShowPanel] = useState(false)
    const [value, setValue] = useState(null)
    const [haveOpened, setHaveOpened] = useState(false)
    const error = required && haveOpened && !isShowPanel && !value && validationConstant[language].requiredField

    useEffect(() =>
    {
        if (defaultValue) setValue(items.filter(item => item.id === defaultValue)[0])
        // eslint-disable-next-line
    }, [])

    function hidePanel()
    {
        setIsShowPanel(false)
    }

    function showPanel()
    {
        popOnPopState({key: null, dontChangeOverflow: true})
        setHaveOpened(true)
        setIsShowPanel(true)
    }

    function onItemSelect(item)
    {
        return function ()
        {
            setValue(item)
            onChange({name, value: item.id})
            goBack()
        }
    }

    return (
        <label className="select-label">
            <p className="select-label-text">{title}</p>
            <div className="select-desktop-cont">
                <Material className={`select-main ${error ? "err" : ""}`} onClick={showPanel} disable={disabled}>
                    <div className={`select-main-text ${value ? "active" : ""}`}>
                        {value?.name || placeholder || full_title || title}
                    </div>
                    <KeyboardArrowSvg isDown className={`select-main-svg ${isShowPanel ? "show" : ""}`}/>
                </Material>
                <SelectChoose items={items} isVisible={isShowPanel} close={hidePanel} onChange={onItemSelect} title={full_title || title} value={value}/>
            </div>
            <ShowValidationError error={error} noSpace={noSpace}/>
        </label>
    )
}

export default Select