function getTimezone()
{
    return Intl?.DateTimeFormat?.()?.resolvedOptions?.()
}

export default getTimezone