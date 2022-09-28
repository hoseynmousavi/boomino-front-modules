import toastManager from "../../seyed-modules/helpers/toastManager"
import {FAIL_TOAST, INFO_TOAST} from "../../seyed-modules/constant/toastTypes"

function copyPageLink({successMessage, failMessage})
{
    if (navigator.clipboard)
    {
        navigator.clipboard.writeText(window.location.href)
            .then(() => toastManager.addToast({type: INFO_TOAST, message: successMessage}))
            .catch(() => toastManager.addToast({type: FAIL_TOAST, message: failMessage}))
    }
    else toastManager.addToast({type: FAIL_TOAST, message: failMessage})
}

export default copyPageLink