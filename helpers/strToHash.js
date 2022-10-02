function strToHash(str)
{
    if (str)
    {
        let hash = 0
        for (let i = 0; i < str.length; i++)
        {
            const char = str.charCodeAt(i)
            hash = ((hash << 5) - hash) + char
            hash = hash & hash
        }
        return hash
    }
    else return str
}

export default strToHash