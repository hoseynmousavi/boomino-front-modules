import AlertModalButtons from "./AlertModalButtons"

function AlertModalContent({title, desc, cancelBtn, onSubmit, submitBtn, isLoading})
{
    return (
        <>
            <div className="alert-title">
                {title}
            </div>
            <div className="alert-desc">
                {desc}
            </div>
            <AlertModalButtons isLoading={isLoading} cancelBtn={cancelBtn} submitBtn={submitBtn} onSubmit={onSubmit} isOk/>
        </>
    )
}

export default AlertModalContent