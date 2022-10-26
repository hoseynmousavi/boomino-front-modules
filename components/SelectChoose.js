import VerticalPanel from "./VerticalPanel"
import RadioItem from "./RadioItem"
import DesktopSelect from "./DesktopSelect"
import Resize from "../../seyed-modules/hooks/Resize"

function SelectChoose({close, items, isVisible, title, value, onChange})
{
    const {clientWidth} = Resize()
    const isMobile = clientWidth < 480

    const allItems = (
        <div className="select-items-cont">
            {
                items.map(item =>
                    <RadioItem key={item.name} onClick={onChange(item)} name={item.name} isActive={value?.id === item.id}/>,
                )
            }
        </div>
    )

    if (isVisible)
    {
        if (isMobile)
        {
            return (
                <VerticalPanel dontPush close={close}>
                    <div className="select-title">{title}</div>
                    {allItems}
                </VerticalPanel>
            )
        }
        else
        {
            return (
                <DesktopSelect close={close}>
                    {allItems}
                </DesktopSelect>
            )
        }
    }

}

export default SelectChoose