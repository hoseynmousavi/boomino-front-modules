function inputKeyDownEnter({disableSubmit, onSubmit, onSubmitDisable, checkValidation})
{
    return function (e)
    {
        if (e.key === "Enter")
        {
            if (!disableSubmit)
            {
                onSubmit?.()
            }
            else
            {
                checkValidation?.()
                onSubmitDisable?.()
            }
        }
    }
}

export default inputKeyDownEnter