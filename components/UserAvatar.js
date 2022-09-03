import {useContext} from "react"
import {AuthContext} from "../context/auth/AuthReducer"
import ImageShow from "../../seyed-modules/components/ImageShow"
import UserSvg from "../media/svg/UserSvg"
import getImageLink from "../../boomino-front-modules/helpers/getImageLink"
import MaskRound from "./MaskRound"

function UserAvatar({className, showLoginUser, avatar, isLoading, zoomable = true, isChild, isActive, havePadding, haveBorder, childLoadingOpacity, childLoading})
{
    const {state: {user}} = useContext(AuthContext)
    const avatarShow = showLoginUser ? getImageLink(user?.data?.avatar_fid) : avatar

    return (
        <MaskRound isChild={isChild} havePadding={havePadding} isActive={isActive} className={className} haveBorder={haveBorder} childLoadingOpacity={childLoadingOpacity} childLoading={childLoading}>
            {
                isLoading ?
                    <div className="image-loading"/>
                    :
                    avatarShow ?
                        <ImageShow zoomable={zoomable} className={`avatar-img ${isChild ? "" : "parent"} ${havePadding ? "padding" : ""}`} src={avatarShow}/>
                        :
                        <UserSvg className={`avatar-img default ${havePadding ? "padding" : ""}`}/>
            }
        </MaskRound>
    )
}

export default UserAvatar