function getUserFixName({user, short = false})
{
    if (!short && user?.firstName && user?.lastName) return `${user.firstName} ${user.lastName}`
    else if (user?.firstName) return user.firstName
    else if (user?.lastName) return user.lastName
    else return "کاربر"
}

export default getUserFixName