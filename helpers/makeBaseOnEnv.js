import checkEnv from "./checkEnv"

function makeBaseOnEnv(base)
{
    const env = checkEnv()
    if (env === "dev") return base.replace(`.${process.env.REACT_APP_DOMAIN}`, `-dev.${process.env.REACT_APP_DOMAIN}`)
    else if (env === "uat") return base.replace(`.${process.env.REACT_APP_DOMAIN}`, `-uat.${process.env.REACT_APP_DOMAIN}`)
    else return base
}

export default makeBaseOnEnv