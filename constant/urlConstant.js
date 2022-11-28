const urlConstant = {
    home: "/",
    login: "/login",

    loginPhone: "/login/phone",
    loginVerifyCode: parameter => `/login/enter-code/${parameter}`,

    editInformation: "/parent/profile",
    editInformationAfterSignup: "/parent/profile/after-signup",

    privacy: "/privacy",
}

export default urlConstant