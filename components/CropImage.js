import Material from "../../seyed-modules/components/Material"
import MyLoader from "../../seyed-modules/components/MyLoader"
import compressImage from "../helpers/compressImage"
import {useLayoutEffect, useRef, useState} from "react"
import b64ToFile from "../helpers/b64ToFile"
import goBack from "../../seyed-modules/helpers/goBack"
import VerticalPanel from "../../boomino-front-modules/components/VerticalPanel"
import RangeSlider from "./RangeSlider"
import getComputedStyleHelper from "../../seyed-modules/helpers/getComputedStyleHelper"

function CropImage({file, onChange, closeCrop})
{
    const [width, setWidth] = useState(null)
    const [size, setSize] = useState(0)
    const circleRatio = 0.75
    const circleRatioUpside = 1 / circleRatio
    const marginRatio = (1 - circleRatio) / 2
    const distanceRatio = marginRatio + circleRatio
    const defaultWidth = useRef(0)
    const [selectedAvatar, setSelectedAvatar] = useState(null)
    const avatarRef = useRef(null)
    const circleRef = useRef(null)
    const contRef = useRef(null)
    const preX = useRef(0)
    const preY = useRef(0)
    const posX = useRef(null)
    const posY = useRef(null)

    useLayoutEffect(() =>
    {
        const size = contRef.current.clientWidth
        setSize(size)
        compressImage(file, "cropImage").then(file =>
        {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () =>
            {
                const selectedAvatar = reader.result
                const temp = new Image()
                temp.src = selectedAvatar
                temp.onload = () =>
                {
                    setSelectedAvatar(selectedAvatar)
                    const extra = (temp.naturalWidth - temp.naturalHeight * circleRatioUpside) / (temp.naturalHeight * circleRatioUpside / size)
                    const width = temp.naturalWidth / temp.naturalHeight <= circleRatioUpside ? size : size + extra
                    setWidth(width)
                    defaultWidth.current = width
                }
            }
        })
        // eslint-disable-next-line
    }, [])

    function submitCrop()
    {
        if (selectedAvatar)
        {
            const canvas = document.createElement("canvas")
            canvas.width = avatarRef.current.naturalWidth * (circleRatio * size) / avatarRef.current.width
            canvas.height = avatarRef.current.naturalHeight * (circleRatio * size) / avatarRef.current.height
            const context = canvas.getContext("2d")
            context.drawImage(
                avatarRef.current,
                avatarRef.current.naturalWidth * ((marginRatio * size) - avatarRef.current.offsetLeft - (preX.current || 0)) / avatarRef.current.width,
                avatarRef.current.naturalHeight * ((marginRatio * size) - avatarRef.current.offsetTop - (preY.current || 0)) / avatarRef.current.height,
                avatarRef.current.naturalWidth * (circleRatio * size) / avatarRef.current.width,
                avatarRef.current.naturalHeight * (circleRatio * size) / avatarRef.current.height,
                0,
                0,
                avatarRef.current.naturalWidth * (circleRatio * size) / avatarRef.current.width,
                avatarRef.current.naturalHeight * (circleRatio * size) / avatarRef.current.height,
            )
            const preview = canvas.toDataURL("image/png")
            const block = preview.split(";")
            const contentType = block[0].split(":")[1]
            const realData = block[1].split(",")[1]
            const file = b64ToFile(realData, contentType)
            compressImage(file, "profileImage").then(img =>
            {
                onChange(img)
                goBack()
            })
        }
    }

    function onMouseDown(e)
    {
        if (selectedAvatar)
        {
            posX.current = e.touches?.[0].clientX || e.clientX
            posY.current = e.touches?.[0].clientY || e.clientY

            if (!e.touches?.[0].clientX)
            {
                document.addEventListener("mousemove", elementDrag, {passive: true})
                document.addEventListener("mouseup", closeDragElement, {passive: true})
            }
        }
    }

    function elementDrag(e)
    {
        if (selectedAvatar)
        {
            const deltaX = posX.current - (e.touches?.[0].clientX || e.clientX)
            const deltaY = posY.current - (e.touches?.[0].clientY || e.clientY)
            posX.current = e.touches?.[0].clientX || e.clientX
            posY.current = e.touches?.[0].clientY || e.clientY
            preX.current = preX.current - deltaX
            preY.current = preY.current - deltaY
            if (avatarRef.current) avatarRef.current.style.transform = `translate3d(${preX.current}px, ${preY.current}px, 0)`
        }
    }

    function closeDragElement()
    {
        document.removeEventListener("mousemove", elementDrag)
        document.removeEventListener("mouseup", closeDragElement)
        makeItRight()
    }

    function makeItRight()
    {
        if (selectedAvatar && avatarRef.current)
        {
            if (
                (avatarRef.current.offsetLeft + preX.current > (marginRatio * size)) &&
                (avatarRef.current.offsetLeft + preX.current + avatarRef.current.width > (distanceRatio * size))
            )
            {
                if (avatarRef.current.width > (circleRatio * size)) preX.current = preX.current - (avatarRef.current.offsetLeft + preX.current - (marginRatio * size))
                else preX.current = preX.current + ((distanceRatio * size) - (avatarRef.current.offsetLeft + preX.current + avatarRef.current.width))
            }
            else if (
                (avatarRef.current.offsetLeft + preX.current + avatarRef.current.width < (distanceRatio * size)) &&
                (avatarRef.current.offsetLeft + preX.current < (marginRatio * size))
            )
            {
                if (avatarRef.current.width > (circleRatio * size)) preX.current = preX.current + ((distanceRatio * size) - (avatarRef.current.offsetLeft + preX.current + avatarRef.current.width))
                else preX.current = preX.current - (avatarRef.current.offsetLeft + preX.current - (marginRatio * size))
            }

            if (
                (avatarRef.current.offsetTop + preY.current > (marginRatio * size)) &&
                (avatarRef.current.offsetTop + preY.current + avatarRef.current.height > (distanceRatio * size))
            )
            {
                if (avatarRef.current.width > (circleRatio * size)) preY.current = preY.current - (avatarRef.current.offsetTop + preY.current - (marginRatio * size))
                else preY.current = preY.current + ((distanceRatio * size) - (avatarRef.current.offsetTop + preY.current + avatarRef.current.height))
            }
            else if (
                (avatarRef.current.offsetTop + preY.current + avatarRef.current.height < (distanceRatio * size)) &&
                (avatarRef.current.offsetTop + preY.current < (marginRatio * size))
            )
            {
                if (avatarRef.current.width > (circleRatio * size)) preY.current = preY.current + ((distanceRatio * size) - (avatarRef.current.offsetTop + preY.current + avatarRef.current.height))
                else preY.current = preY.current = preY.current - (avatarRef.current.offsetTop + preY.current - (marginRatio * size))
            }

            avatarRef.current.style.transition = "transform ease 0.1s"
            avatarRef.current.style.transform = `translate3d(${preX.current}px, ${preY.current}px, 0)`
            setTimeout(() =>
            {
                if (avatarRef.current) avatarRef.current.style.transition = "none"
            }, 200)
        }
    }

    function setZoom(zoom)
    {
        if (selectedAvatar && avatarRef.current) setWidth(defaultWidth.current - ((50 - zoom) * 5))
    }

    return (
        <VerticalPanel close={closeCrop} statusBarColor={getComputedStyleHelper("--first-background-color")}>
            <div className="crop-cont" ref={contRef}>
                <div className="crop-relative dont-gesture"
                     style={{width: size + "px", height: size + "px"}}
                     onMouseDown={onMouseDown}
                     onTouchStart={onMouseDown}
                     onTouchMove={elementDrag}
                     onTouchEnd={makeItRight}>
                    {
                        selectedAvatar ?
                            <>
                                <div className="crop-circle" ref={circleRef} style={{width: circleRatio * size + "px", height: circleRatio * size + "px", top: marginRatio * size + "px", left: marginRatio * size + "px"}}/>
                                <img className="crop-cropping" ref={avatarRef} src={selectedAvatar} style={{width: width + "px"}} alt=""/>
                            </>
                            :
                            <MyLoader className="crop-cropping" width={40}/>
                    }
                </div>
                <div className="crop-zoom-cont dont-gesture">
                    <RangeSlider onChange={setZoom}/>
                </div>
            </div>
            <div className="crop-cropping-btn-cont">
                <Material className="crop-cropping-btn cancel" onClick={goBack}>بستن</Material>
                <Material className="crop-cropping-btn submit" disable={!selectedAvatar} onClick={submitCrop}>ثبت و ادامه</Material>
            </div>
        </VerticalPanel>
    )
}

export default CropImage