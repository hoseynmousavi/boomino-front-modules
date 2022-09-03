function SlideDots({className, dotClassName, slideNumbers, slideIndex})
{
    return (
        <div className={`slide-dots ${className}`}>
            {
                Array(slideNumbers).fill(0).map((_, index) =>
                    <div key={index}
                         className={`slide-dot ${dotClassName} ${index ? "" : "active"} ${index && slideIndex >= index + 1 ? "right" : ""}`}
                         style={index ? {} : {transform: `scale(1) translate3d(-${(slideIndex - 1) * 20}px, 0, 0)`}}
                    />,
                )
            }
        </div>
    )
}

export default SlideDots