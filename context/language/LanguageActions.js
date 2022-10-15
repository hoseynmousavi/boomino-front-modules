import {CHANGE_LANGUAGE} from "./LanguageTypes"

function changeLanguage({language, dispatch})
{
    dispatch({
        type: CHANGE_LANGUAGE,
        language,
    })
}

const LanguageActions = {
    changeLanguage,
}

export default LanguageActions