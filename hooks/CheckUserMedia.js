let md = navigator.mediaDevices
let haveCam = false
if (md && md.enumerateDevices)
{
    md.enumerateDevices().then(devices =>
    {
        if (devices.some(device => "videoinput" === device.kind)) haveCam = true
    })
}

function CheckUserMedia({children})
{
    if (haveCam) return children
    else return null
}

export default CheckUserMedia