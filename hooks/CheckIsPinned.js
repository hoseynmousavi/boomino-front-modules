import {useEffect} from "react"

function CheckIsPinned({ref, threshold = 1})
{
    useEffect(() =>
    {
        const observer = new IntersectionObserver(
            ([e]) => e.target.classList.toggle("is-pinned", e.intersectionRatio < threshold),
            {threshold: [threshold]},
        )

        observer.observe(ref.current)
        // eslint-disable-next-line
    }, [])
}

export default CheckIsPinned