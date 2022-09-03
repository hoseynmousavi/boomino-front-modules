import ImageShow from "../../seyed-modules/components/ImageShow"

function OnBoardingItem({Icon, src, title, desc})
{
    return (
        <div className="on-boarding-page">
            {
                Icon ?
                    <Icon className="on-boarding-img"/>
                    :
                    <ImageShow src={src} className="on-boarding-img" alt={title} loading="eager"/>
            }
            <div className="on-boarding-title">{title}</div>
            <div className="on-boarding-desc">{desc}</div>
        </div>
    )
}

export default OnBoardingItem