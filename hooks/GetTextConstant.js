import {useContext} from "react"
import {LanguageContext} from "../../seyed-modules/context/language/LanguageReducer"
import faTextConstant from "../constant/faTextConstant"
import enTextConstant from "../constant/enTextConstant"
import faToastConstant from "../constant/faToastConstant"
import enToastConstant from "../constant/enToastConstant"

function GetTextConstant()
{
    const {state: {language}} = useContext(LanguageContext)
    const textConstant = language === "fa" ? faTextConstant : enTextConstant
    const toastConstant = language === "fa" ? faToastConstant : enToastConstant
    const direction = language === "fa" ? "rtl" : "ltr"
    return {textConstant, toastConstant, language, direction}
}

export default GetTextConstant