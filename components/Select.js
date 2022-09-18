import {useEffect, useState} from "react"
import Material from "../../seyed-modules/components/Material"
import KeyboardArrowSvg from "../media/svg/KeyboardArrowSvg"
import goBack from "../../seyed-modules/helpers/goBack"
import RadioItem from "./RadioItem"
import VerticalPanel from "./VerticalPanel"
import ShowValidationError from "./ShowValidationError"
import validationConstant from "../constant/validationConstant"

function Select({name, full_title, placeholder, title, items, defaultValue, onChange, disabled, required, noSpace})
{
    const [isShowPanel, setIsShowPanel] = useState(false)
    const [value, setValue] = useState(null)
    const [haveOpened, setHaveOpened] = useState(false)

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
                <Material className="select-main" onClick={showPanel} disable={disabled}>
                    <div className={`select-main-text ${value ? "active" : ""}`}>
                        {value?.name || placeholder || full_title || title}
                    </div>
                    <KeyboardArrowSvg className={`select-main-svg ${isShowPanel ? "show" : ""}`}/>
                </Material>
                <ShowValidationError error={haveOpened && !isShowPanel && validationConstant.requiredField} noSpace={noSpace}/>
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