const apiUrlsConstant = {
    sendOtp: "auth/login",
    logout: "auth/logout",
    refreshToken: "auth/login/refresh",
    getProfile: "auth/profile",
    editProfile: "auth/profile/edit",
    sendAvatar: "auth/profile/avatar/edit",
    removeAvatar: "auth/profile/avatar/remove",
    checkEmail: "auth/get-user-by-email",
    deactivateAccount: "auth/deactivate-account",

    getFamily: "family/get-family",
    addMember: "family/add-member",
    removeMember: "family/remove-member",
}

export default apiUrlsConstant