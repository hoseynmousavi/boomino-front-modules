import checkEnv from "./checkEnv"
import getDomain from "../../seyed-modules/helpers/getDomain"

function makeBaseOnEnv(base)
{
    const env = checkEnv()
    const domain = getDomain()
    if (env === "dev") return base.replace(`.${domain}`, `-dev.${domain}`)
    else if (env === "uat") return base.replace(`.${domain}`, `-uat.${domain}`)
    else return base
}

export default makeBaseOnEnv