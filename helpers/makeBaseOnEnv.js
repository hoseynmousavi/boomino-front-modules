function makeBaseOnEnv(base)
{
    const {hostname} = window.location
    if (process.env.NODE_ENV === "development" || hostname.includes("dev"))
    {
        return base.replace(`.${process.env.REACT_APP_DOMAIN}`, `-dev.${process.env.REACT_APP_DOMAIN}`)
    }
    else if (hostname.includes("uat"))
    {
        return base.replace(`.${process.env.REACT_APP_DOMAIN}`, `-uat.${process.env.REACT_APP_DOMAIN}`)
    }
    else
    {
        return base
    }
}

export default makeBaseOnEnv