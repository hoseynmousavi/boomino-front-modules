import RadioBtnFillSvg from "../media/svg/RadioBtnFillSvg"
import RadioBtnSvg from "../media/svg/RadioBtnSvg"
import Material from "../../seyed-modules/components/Material"

function RadioItem({onClick, className, name, isActive, isRtl, rtlExtraContent, disable})
{
    return (
        <Material className={`select-item ${className}`} disable={disable} onClick={onClick}>
            <div className={`select-item-title ${isRtl ? "rtl" : ""}`}>{name}</div>
            <RadioBtnFillSvg className={`select-item-radio ${isRtl ? "rtl" : ""} ${isActive ? "show" : ""}`}/>
            <RadioBtnSvg className={`select-item-radio ${isRtl ? "rtl" : ""} ${isActive ? "" : "show"}`}/>
            {
                isRtl && isActive && rtlExtraContent ?
                    rtlExtraContent
                    :
                    null
            }
        </Material>
    )
}

export default RadioItem