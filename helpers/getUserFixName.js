import cookieHelper from "../../seyed-modules/helpers/cookieHelper"

function getUserFixName({user, short = false})
{
    if (!short && user?.firstName && user?.lastName) return `${user.firstName} ${user.lastName}`
    else if (user?.firstName) return user.firstName
    else if (user?.lastName) return user.lastName
    else
    {
        const lang = cookieHelper.getItem("language") || "fa"
        return lang === "fa" ? "کاربر" : "user"
    }
}

export default getUserFixName