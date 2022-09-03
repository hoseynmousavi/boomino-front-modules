import imageCompression from "browser-image-compression"
import compressConstant from "../constant/compressConstant"

const compressImage = (img, quality = "profileImage") =>
{
    return new Promise(resolve =>
    {
        if (img)
        {
            if (img.type.includes("svg") || img.type.includes("gif")) resolve(img)
            else
            {
                imageCompression(img, compressConstant[quality]).then(compressedFile =>
                {
                    let file = new File([compressedFile], compressedFile.name)
                    if (file.size > img.size) resolve(img)
                    else resolve(file)
                })
            }
        }
        else resolve(img)
    })
}

export default compressImage