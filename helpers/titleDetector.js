function titleDetector(ref)
{
    const boldExp = new RegExp("\\*{2}((.|\\n)*?)\\*{2}")
    ref.innerHTML = ref.innerText
        .replace(new RegExp(boldExp, "g"), (a, b) => `<span style="font-family: my-font-bold, serif; margin-bottom: 8px">${b}</span>`)
}

export default titleDetector