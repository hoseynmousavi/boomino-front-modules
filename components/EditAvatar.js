import Material from "../../seyed-modules/components/Material"
import createMaterialColor from "../../seyed-modules/helpers/createMaterialColor"
import AuthActions from "../../boomino-front-modules/context/auth/AuthActions"
import {useContext, useEffect, useState} from "react"
import {AuthContext} from "../context/auth/AuthReducer"
import UserAvatar from "../../boomino-front-modules/components/UserAvatar"
import CircleProgress from "./CircleProgress"
import toastManager from "../../seyed-modules/helpers/toastManager"
import {SUCCESS_TOAST} from "../../seyed-modules/constant/toastTypes"
import toastConstant from "../constant/toastConstant"
import TrashSvg from "../media/svg/TrashSvg"
import goBack from "../../seyed-modules/helpers/goBack"
import GallerySvg from "../media/svg/GallerySvg"
import CameraSvg from "../media/svg/CameraSvg"
import CheckUserMedia from "../hooks/CheckUserMedia"
import getImageLink from "../../boomino-front-modules/helpers/getImageLink"
import ParentalActions from "../context/parental/ParentalActions"
import GetTheme from "../../seyed-modules/hooks/GetTheme"
import CropImage from "./CropImage"
import VerticalPanel from "../../boomino-front-modules/components/VerticalPanel"
import GetTextConstant from "../hooks/GetTextConstant"

function EditAvatar({showLoginUser, avatar, avatarClassName, label, icon, onChange, removeButton, link, getRef, isChild})
{
    const {textConstant} = GetTextConstant()
    const {isDark} = GetTheme()
    const {state: {user}, dispatch} = useContext(AuthContext)
    const [avatarTemp, setAvatarTemp] = useState(null)
    const [isShowMenu, setIsShowMenu] = useState(null)
    const [uploadLoading, setUploadLoading] = useState(0)
    const showLoading = uploadLoading < 100 && uploadLoading > 0

    useEffect(() =>
    {
        if (getRef) getRef(uploadAvatar)
        // eslint-disable-next-line
    }, [])

    function onFileChange(e)
    {
        const avatar = e.target.files[0]
        e.target.value = ""
        goBack()
        setTimeout(() => setAvatarTemp(avatar), 10)
    }

    function closeCrop()
    {
        setAvatarTemp(null)
    }

    function showMenu()
    {
        setIsShowMenu(true)
    }

    function hideMenu()
    {
        setIsShowMenu(false)
    }

    function uploadAvatar(avatar, childId, familyDispatch, onSuccess, onFail, contactPhone, contactLabel, parentalDispatch)
    {
        if (showLoginUser || (childId && familyDispatch && onSuccess && onFail) || (childId && contactPhone && contactLabel && onSuccess && onFail))
        {
            setUploadLoading(1)
            if (childId && contactPhone && contactLabel && onSuccess && onFail)
            {
                ParentalActions.addChildWhiteContact({contact_avatar_file: avatar, child_id: childId, contact_phone_no: contactPhone, contact_label: contactLabel, dispatch: parentalDispatch, progress: percent => percent < 100 && setUploadLoading(percent)})
                    .then(() =>
                    {
                        onSuccess()
                        setUploadLoading(100)
                    })
                    .catch(() =>
                    {
                        setUploadLoading(0)
                        onFail()
                    })
            }
            else if (childId && familyDispatch && onSuccess && onFail)
            {
                AuthActions.changeAvatar({avatar, child_id: childId, familyDispatch, progress: percent => percent < 100 && setUploadLoading(percent)})
                    .then(() =>
                    {
                        onSuccess()
                        setUploadLoading(100)
                    })
                    .catch(() =>
                    {
                        setUploadLoading(0)
                        onFail()
                    })
            }
            else
            {
                AuthActions.changeAvatar({avatar, dispatch, progress: percent => percent < 100 && setUploadLoading(percent)})
                    .then(avatar_fid =>
                    {
                        toastManager.addToast({message: toastConstant.editAvatarSuccess, type: SUCCESS_TOAST})
                        const img = new Image()
                        img.src = getImageLink(avatar_fid)
                        img.onload = () =>
                        {
                            setUploadLoading(100)
                            setTimeout(() => setUploadLoading(0), 250)
                        }
                    })
                    .catch(() =>
                    {
                        setUploadLoading(0)
                    })
            }
        }
        else if (onChange) onChange(avatar)
    }

    function removeAvatar()
    {
        goBack()
        setTimeout(() =>
        {
            AuthActions.removeAvatar({dispatch}).then(() => toastManager.addToast({message: toastConstant.removeAvatarSuccess, type: SUCCESS_TOAST}))
        }, 10)
    }

    function onBtnClick()
    {
        if (removeButton) removeButton()
        else if (link) window.history.pushState("", "", link)
        else showMenu()
    }

    return (
        <>
            <div className={`login-image-edit-cont ${avatarClassName}`}>
                <UserAvatar havePadding={showLoading} isActive={isChild && showLoading} childLoadingOpacity={showLoading ? "1" : "0"} childLoading={uploadLoading} isChild={isChild} className={`login-image-edit ${isDark ? "dark" : ""} ${showLoading ? isChild ? "child-loading" : "parent-loading" : ""}`} showLoginUser={showLoginUser} avatar={avatar}/>
                {!isChild && <CircleProgress opacity={showLoading ? "1" : "0"} percent={uploadLoading}/>}
            </div>
            <Material disable={showLoading} className="login-image-edit-btn" backgroundColor={createMaterialColor({variable: removeButton ? "--toast-fail-text" : "--link-color"})} onClick={onBtnClick}>
                {
                    removeButton ?
                        <>
                            <TrashSvg className="login-image-edit-remove"/>
                            <div className="login-image-edit-title-remove">{textConstant.removeAvatar}</div>
                        </>
                        :
                        <>
                            {icon && icon}
                            {label}
                        </>
                }
            </Material>
            {
                avatarTemp &&
                <CropImage file={avatarTemp} onChange={uploadAvatar} closeCrop={closeCrop}/>
            }
            {
                isShowMenu &&
                <VerticalPanel close={hideMenu}>
                    <div className="select-title">{label}</div>
                    <div className="select-items-cont">
                        <label>
                            <Material isDiv className="select-item have-icon">
                                <GallerySvg className="select-item-svg gallery"/>
                                <div>{textConstant.chooseGallery}</div>
                            </Material>
                            <input hidden type="file" accept="image/*" onChange={onFileChange}/>
                        </label>
                        <CheckUserMedia>
                            <label>
                                <Material isDiv className="select-item have-icon">
                                    <CameraSvg className="select-item-svg camera"/>
                                    <div>{textConstant.chooseCamera}</div>
                                </Material>
                                <input hidden type="file" accept="image/*" capture="user" onChange={onFileChange}/>
                            </label>
                        </CheckUserMedia>
                        {
                            showLoginUser && user.data?.avatar_fid &&
                            <Material className="select-item have-icon remove" backgroundColor={createMaterialColor({variable: "--toast-fail-text"})} onClick={removeAvatar}>
                                <TrashSvg className="select-item-svg"/>
                                <div>{textConstant.removeAvatar}</div>
                            </Material>
                        }
                    </div>
                </VerticalPanel>
            }
        </>
    )
}

export default EditAvatar