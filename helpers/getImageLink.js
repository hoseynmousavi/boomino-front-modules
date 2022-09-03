import makeBaseOnEnv from "./makeBaseOnEnv"

function getImageLink(fid)
{
    if (fid)
    {
        const base = makeBaseOnEnv(process.env.REACT_APP_FILE_URL)
        return base + fid
    }
    else return fid
}

export default getImageLink