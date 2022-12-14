import RadioItem from "./RadioItem"
import CheckSvg from "../../seyed-modules/media/svg/CheckSvg"
import Input from "./Input"
import GetTextConstant from "../../seyed-modules/hooks/GetTextConstant"
import {forwardRef} from "react"

const ChildHavePhone = forwardRef(({isActive, toggle, changeField, defaultValue, disableSubmit, onSubmit, onSubmitDisable, disabled}, ref) =>
{
    const {textConstant} = GetTextConstant()
    return (
        <>
            <RadioItem className="add-child-phone-check"
                       isRtl
                       name={textConstant.childHavePhone}
                       isActive={isActive}
                       FillIcon={CheckSvg}
                       FillProps={{isFilled: true}}
                       onClick={toggle}
            />
            <Input className={`add-child-phone-input ${isActive ? "show" : ""}`}
                   autoComplete="off"
                   name="phone_number"
                   validation="phone"
                   ltr
                   placeholder={textConstant.childPhone}
                   onChange={changeField}
                   defaultValue={defaultValue}
                   required
                   disableSubmit={disableSubmit}
                   onSubmit={onSubmit}
                   onSubmitDisable={onSubmitDisable}
                   disabled={disabled}
                   fixScroll
                   ref={ref}
            />
        </>
    )
})

export default ChildHavePhone