function normalizePhone(phone)
{
    if (phone) return phone.replace("+98", "0")
    else return phone
}

export default normalizePhone