import GetTextConstant from "../../../seyed-modules/hooks/GetTextConstant"

function BackSvg({className})
{
    const {direction} = GetTextConstant()
    return (
        <svg className={className} style={{transform: `rotate(${direction === "ltr" ? "180" : "0"}deg)`}} viewBox="0 0 24 24" fill="none">
            <path d="M6.5 12H17.5M17.5 12L12.9118 8M17.5 12L12.9118 16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export default BackSvg