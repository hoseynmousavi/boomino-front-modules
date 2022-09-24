import checkOs from "../../seyed-modules/helpers/checkOs"

function fixInputScroll({inputRef, halfHeight = 40})
{
    if (checkOs() === "android")
    {
        setTimeout(() =>
        {
            const root = document.getElementById("main-render")
            const rect = inputRef.current.getBoundingClientRect()
            const should = root.clientHeight / 2
            const scroll = root.scrollTop
            const now = rect.top
            root.scroll({top: scroll - (should - now - halfHeight), behavior: "smooth"})
        }, 800)
    }
}

export default fixInputScroll