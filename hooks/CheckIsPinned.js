import {useEffect} from "react"

function CheckIsPinned({ref})
{
    useEffect(() =>
    {
        const observer = new IntersectionObserver(
            ([e]) => e.target.classList.toggle("is-pinned", e.intersectionRatio < 1),
            {threshold: [1]},
        )

        observer.observe(ref.current)
        // eslint-disable-next-line
    }, [])
}

export default CheckIsPinned