import numberCorrection from "../../seyed-modules/helpers/numberCorrection"
import verifyCodeConstant from "../constant/verifyCodeConstant"

function showPhoneNumber(phone)
{
    if (phone)
    {
        const input = numberCorrection(phone.replace(/ /g, "").replace("+98", "0"))
        return input && !isNaN(input) ?
            input.length >= 8 ?
                input.slice(0, 4) + verifyCodeConstant.phoneSeparator + input.slice(4, 7) + verifyCodeConstant.phoneSeparator + input.slice(7, input.length)
                :
                input.length >= 5 ?
                    input.slice(0, 4) + verifyCodeConstant.phoneSeparator + input.slice(4, input.length)
                    :
                    input
            :
            input
    }
    else return phone
}

export default showPhoneNumber