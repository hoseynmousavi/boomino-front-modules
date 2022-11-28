import {useState} from "react"
import ImageShow from "../../seyed-modules/components/ImageShow"
import Material from "../../seyed-modules/components/Material"
import CheckSvg from "../../seyed-modules/media/svg/CheckSvg"
import CloseSvg from "../../seyed-modules/media/svg/CloseSvg"
import TextOverflow from "./TextOverflow"
import createMaterialColor from "../../seyed-modules/helpers/createMaterialColor"
import TrashSvg from "../media/svg/TrashSvg"
import PlusBorderSvg from "../media/svg/PlusBorderSvg"
import UserSvg from "../media/svg/UserSvg"
import MyLoader from "../../seyed-modules/components/MyLoader"
import EditSvg from "../media/svg/EditSvg"
import Icon2Svg from "../media/svg/Icon2Svg"
import GetTextConstant from "../hooks/GetTextConstant"

function ChildPermissionRequest({title, desc, ltrDesc, favicon, isAccessible, notWeb, isContact, url, isSuggested, removeItem, addItem, editItem, isHidden})
{
    const {textConstant} = GetTextConstant()
    const [isLoading, setIsLoading] = useState(false)

    function edit()
    {
        if (editItem)
        {
            setIsLoading(true)
            editItem()
                .then(() => setIsLoading(false))
                .catch(() => setIsLoading(false))
        }
    }

    function remove()
    {
        if (removeItem)
        {
            setIsLoading(true)
            removeItem()
                .then(() => setIsLoading(false))
                .catch(() => setIsLoading(false))
        }
    }

    function add()
    {
        if (addItem)
        {
            setIsLoading(true)
            addItem()
                .then(() => setIsLoading(false))
                .catch(() => setIsLoading(false))
        }
    }

    return (
        <div className={`edit-child-content-item permission ${isHidden ? "hide" : ""}`} style={{animationDuration: isHidden || !notWeb ? "0s" : "0.2s"}}>
            {
                notWeb ?
                    favicon ?
                        <ImageShow className={`edit-child-request-web-img permission ${isContact ? "contact" : ""}`} src={favicon} alt={title}/>
                        :
                        isContact ?
                            <UserSvg className="edit-child-request-web-svg"/>
                            :
                            <Icon2Svg className="edit-child-request-web-img"/>
                    :
                    <ImageShow className="edit-child-request-web-img permission" src={favicon ? favicon : `${url.includes("http") ? url : "https://" + url}/favicon.ico`} alt={title}/>
            }
            {isAccessible && <CheckSvg className="edit-child-request-web-check"/>}
            <div className="edit-child-request-web-content">
                <div className={`edit-child-request-web-content-text ${notWeb && !isContact ? "longer" : ""}`}>
                    <TextOverflow key={title} className="edit-child-content-item-text-main-title">
                        {title}{isSuggested && <div className="edit-child-content-item-text-main-title-suggest">{textConstant.recommended}</div>}
                    </TextOverflow>
                    {
                        (desc || url) &&
                        <TextOverflow key={desc || url} className={`edit-child-content-item-text-main-desc ${ltrDesc ? "ltr" : ""}`}>
                            {desc || url}
                        </TextOverflow>
                    }
                </div>
                <div className="edit-child-request-web-content-btn">
                    {
                        isLoading ?
                            <MyLoader width={25} className="edit-child-request-web-icon loading"/>
                            :
                            isAccessible ?
                                <>
                                    {
                                        editItem &&
                                        <Material className="edit-child-request-web-icon" backgroundColor={createMaterialColor({variable: "--second-text-color"})} onClick={edit}>
                                            <EditSvg className="edit-child-request-web-icon-svg edit"/>
                                        </Material>
                                    }
                                    <Material className="edit-child-request-web-icon remove" backgroundColor={createMaterialColor({variable: "--danger-color"})} onClick={remove}>
                                        <TrashSvg className="edit-child-request-web-icon-svg remove"/>
                                    </Material>
                                </>
                                :
                                notWeb ?
                                    <Material className="edit-child-request-web-icon remove" backgroundColor={createMaterialColor({variable: "--first-color"})} onClick={add}>
                                        <PlusBorderSvg className="edit-child-request-web-icon-svg add"/>
                                    </Material>
                                    :
                                    <>
                                        <Material className="edit-child-request-web-icon" backgroundColor={createMaterialColor({variable: "--first-color"})}>
                                            <CheckSvg className="edit-child-request-web-icon-svg accept"/>
                                        </Material>
                                        <Material className="edit-child-request-web-icon last" backgroundColor={createMaterialColor({variable: "--danger-color"})}>
                                            <CloseSvg className="edit-child-request-web-icon-svg reject"/>
                                        </Material>
                                    </>
                    }
                </div>
            </div>
        </div>
    )
}

export default ChildPermissionRequest