import AvatarTemplate from "../media/svg/AvatarTemplate"

function MaskRound({isChild, havePadding, isActive, haveBorder, className, children, childLoadingOpacity, childLoading})
{
    return (
        <div className={`avatar-img-cont ${isChild ? "" : `parent ${isActive ? "parent-active" : ""}`} ${className}`}>
            {children}
            {
                isChild &&
                <AvatarTemplate childLoadingOpacity={childLoadingOpacity} childLoading={childLoading} className={`avatar-img-frame ${havePadding ? "have-padding" : ""} ${isActive ? "active" : haveBorder ? "have-border" : ""}`}/>
            }
        </div>
    )
}

export default MaskRound