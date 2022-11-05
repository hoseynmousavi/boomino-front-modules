function checkEnv()
{
    if (window.location.protocol === "file:")
    {
        const env = localStorage.getItem("env")
        switch (env)
        {
            case "prd":
                return "prd"
            case "uat":
                return "uat"
            default:
                return "dev"
        }
    }
    else
    {
        const {hostname} = window.location
        if (process.env.NODE_ENV === "development" || hostname.includes("dev")) return "dev"
        else if (hostname.includes("uat")) return "uat"
        else return "prd"
    }
}

export default checkEnv