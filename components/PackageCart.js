import CheckSvg from "../../seyed-modules/media/svg/CheckSvg"
import Material from "../../seyed-modules/components/Material"
import createMaterialColor from "../../seyed-modules/helpers/createMaterialColor"
import ImageShow from "../../seyed-modules/components/ImageShow"
import getImageLink from "../helpers/getImageLink"
import GetTextConstant from "../hooks/GetTextConstant"

function PackageCart({data: {id, name, description, icon_fid, is_suggested}, selectedPack, onSelect})
{
    const {textConstant} = GetTextConstant()
    const isSelected = selectedPack === id
    return (
        <Material className={`package ${isSelected ? "selected" : ""}`}
                  style={{
                      border: `1px solid ${isSelected ? createMaterialColor({variable: "--first-color", alpha: "0.5"}) : "transparent"}`,
                      backgroundColor: isSelected ? createMaterialColor({variable: "--first-color", alpha: "0.1"}) : "var(--first-background-color)",
                  }}
                  backgroundColor={createMaterialColor({variable: "--first-color"})} onClick={onSelect}>
            <ImageShow src={getImageLink(icon_fid)} className="package-icon" alt={name}/>
            <div className="package-content">
                <div className="package-content-title">
                    <div>{name}</div>
                    {is_suggested && <div className="package-content-title-recommend">{textConstant.proposedPack}</div>}
                </div>
                <div className="package-content-desc">{description}</div>
                {isSelected && <CheckSvg className="package-content-check"/>}
            </div>
        </Material>
    )
}

export default PackageCart