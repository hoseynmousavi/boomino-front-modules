function getSortedChildren(family)
{
    return family ? Object.values(family.members).filter(item => item.role === "Child").sort((a, b) => new Date(a.birthDate) - new Date(b.birthDate)) : []
}

export default getSortedChildren