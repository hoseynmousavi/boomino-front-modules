import {useEffect, useState} from "react"
import Material from "../../seyed-modules/components/Material"
import KeyboardArrowSvg from "../media/svg/KeyboardArrowSvg"
import goBack from "../../seyed-modules/helpers/goBack"
import RadioItem from "./RadioItem"
import VerticalPanel from "./VerticalPanel"
import ShowValidationError from "./ShowValidationError"
import validationConstant from "../constant/validationConstant"
import GetTextConstant from "../hooks/GetTextConstant"

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
        <>
            <label className="select-label">
                <p className="select-label-text">{title}</p>
                <Material className={`select-main ${error ? "err" : ""}`} onClick={showPanel} disable={disabled}>
                    <div className={`select-main-text ${value ? "active" : ""}`}>
                        {value?.name || placeholder || full_title || title}
                    </div>
                    <KeyboardArrowSvg isDown className={`select-main-svg ${isShowPanel ? "show" : ""}`}/>
                </Material>
                <ShowValidationError error={error} noSpace={noSpace}/>
            </label>

            {
                isShowPanel &&
                <VerticalPanel close={hidePanel}>
                    <div className="select-title">{full_title || title}</div>
                    <div className="select-items-cont">
                        {
                            items.map(item =>
                                <RadioItem key={item.name} onClick={onItemSelect(item)} name={item.name} isActive={value?.id === item.id}/>,
                            )
                        }
                    </div>
                </VerticalPanel>
            }
        </>
    )
}

export default Select