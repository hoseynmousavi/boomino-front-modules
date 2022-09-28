function checkIsPinned({ref, threshold = 1})
{
    const observer = new IntersectionObserver(
        ([e]) => e.target.classList.toggle("is-pinned", e.intersectionRatio < threshold),
        {threshold: [threshold]},
    )

    observer.observe(ref.current)
}

export default checkIsPinned