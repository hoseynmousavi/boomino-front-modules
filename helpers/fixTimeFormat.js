function fixTimeFormat({hour, minute})
{
    return `${fixPad(hour)}:${fixPad(minute)}`
}

function fixPad(input)
{
    return input.toString().padStart(2, "0")
}

export default fixTimeFormat