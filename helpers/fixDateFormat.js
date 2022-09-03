function fixDateFormat({year, month, day, separator})
{
    return `${year}${separator}${month < 10 ? "0" + month : month}${separator}${day < 10 ? "0" + day : day}`
}

export default fixDateFormat