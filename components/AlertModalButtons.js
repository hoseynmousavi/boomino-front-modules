import Material from "../../seyed-modules/components/Material"
import goBack from "../../seyed-modules/helpers/goBack"
import createMaterialColor from "../../seyed-modules/helpers/createMaterialColor"
import MyLoader from "../../seyed-modules/components/MyLoader"

function AlertModalButtons({isLoading, cancelBtn, onSubmit, submitBtn, isOk = true, submitDisable, onDisableClick})
{
    return (
        <div className="alert-buttons">
            <Material className="alert-button nope" disable={isLoading} onClick={goBack}>
                {cancelBtn}
            </Material>
            <Material className={`alert-button ${submitDisable ? "disable" : ""} ${isOk ? "ok" : "yes"}`} disable={submitDisable || isLoading} backgroundColor={createMaterialColor({variable: isOk ? "--danger-color" : "--first-color"})} onDisableClick={onDisableClick} onClick={onSubmit}>
                {
                    isLoading ?
                        <MyLoader width={20}/>
                        :
                        submitBtn
                }
            </Material>
        </div>
    )
}

export default AlertModalButtons