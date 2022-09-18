function ShowValidationError({error, noSpace})
{
    return (
        <div className={`validation-err ${noSpace ? "no-space" : ""} ${error ? "show" : ""}`}>{error}</div>
    )
}

export default ShowValidationError