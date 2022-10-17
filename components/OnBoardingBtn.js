import createMaterialColor from "../../seyed-modules/helpers/createMaterialColor"
import Material from "../../seyed-modules/components/Material"
import KeyboardArrowSvg from "../../boomino-front-modules/media/svg/KeyboardArrowSvg"
import urlConstant from "../constant/urlConstant"
import parseQueryString from "../../seyed-modules/helpers/parseQueryString"
import GetTextConstant from "../hooks/GetTextConstant"

function OnBoardingBtn({slideIndex, setSlide})
{
    const {textConstant} = GetTextConstant()

    function goNext()
    {
        if (slideIndex > 1)
        {
            setSlide(slideIndex === 3 ? 2 : 3)
        }
        else
        {
            const {returnTo} = parseQueryString()
            window.history.replaceState("", "", `${urlConstant.loginPhone}${returnTo ? `?returnTo=${returnTo}` : ""}`)
        }
    }

    return (
        <Material className={`on-boarding-next-cont ${slideIndex === 1 ? "done" : ""}`} backgroundColor={createMaterialColor({variable: slideIndex === 1 ? "--solid-light" : "--first-color"})} onClick={goNext}>
            <KeyboardArrowSvg isDown className={`on-boarding-next ${slideIndex === 1 ? "hide" : ""}`}/>
            <div className={`on-boarding-next-text ${slideIndex === 1 ? "hide" : ""}`}>{textConstant.next}</div>
            <div className={`on-boarding-done ${slideIndex === 1 ? "show" : ""}`}>{textConstant.letsGo}</div>
        </Material>
    )
}

export default OnBoardingBtn