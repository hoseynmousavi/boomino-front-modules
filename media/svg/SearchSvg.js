function SearchSvg({className, haveBorder})
{
    return (
        <svg className={className} viewBox={haveBorder ? "-1 -1 20.5 20.5" : "-1 -1 22 22"}>
            <path fill="var(--second-text-color)"
                  d="M3.316 13.781l.73-.171zm0-5.457l.73.171zm15.474 0l.73-.171zm0 5.457l.73.171zm-5.008 5.008l-.171-.73zm-5.457 0l-.171.73zm0-15.474l-.171-.73zm5.457 0l.171-.73zM20.47 21.53a.75.75 0 0 0 1.06-1.06zM4.046 13.61a11.2 11.2 0 0 1 0-5.115l-1.46-.343a12.7 12.7 0 0 0 0 5.8zM18.059 8.5a11.2 11.2 0 0 1 0 5.115l1.46.342a12.7 12.7 0 0 0 0-5.8zm-4.449 9.559a11.2 11.2 0 0 1-5.115 0l-.343 1.46a12.7 12.7 0 0 0 5.8 0zM8.5 4.046a11.2 11.2 0 0 1 5.115 0l.342-1.46a12.7 12.7 0 0 0-5.8 0zm0 14.013a5.971 5.971 0 0 1-4.454-4.449l-1.46.342a7.471 7.471 0 0 0 5.567 5.568zm5.457 1.46a7.471 7.471 0 0 0 5.567-5.567l-1.46-.342a5.97 5.97 0 0 1-4.449 4.449zM13.61 4.046A5.971 5.971 0 0 1 18.059 8.5l1.46-.343a7.471 7.471 0 0 0-5.567-5.567zm-5.457-1.46a7.471 7.471 0 0 0-5.567 5.567l1.46.343A5.971 5.971 0 0 1 8.5 4.046zM16.8 17.865l3.67 3.665 1.06-1.06-3.665-3.67z"
                  transform="translate(-2.25 -2.25)" strokeWidth="0"/>
        </svg>
    )
}

export default SearchSvg