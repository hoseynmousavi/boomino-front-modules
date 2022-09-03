function AvatarTemplate({className, childLoadingOpacity = "1", childLoading = 100})
{
    return (
        <svg className={className} viewBox="0 0 84.001 84.001">
            <g transform="translate(-58.999 -510)">
                <path className="avatar-padding-border" d="M4.566,29.4A33.324,33.324,0,0,1,29.4,4.566a59.243,59.243,0,0,1,27.059,0A33.324,33.324,0,0,1,81.291,29.4a59.245,59.245,0,0,1,0,27.059A33.324,33.324,0,0,1,56.458,81.291a59.245,59.245,0,0,1-27.059,0A33.324,33.324,0,0,1,4.566,56.458,59.243,59.243,0,0,1,4.566,29.4Z" transform="translate(58 509)" style={{fill: "none"}} stroke="transparent" strokeWidth="0"/>
                <path className="avatar-active-border" style={{fill: "none", opacity: childLoadingOpacity}} strokeDasharray={`${childLoading * 2.57}, 257`} strokeDashoffset="0" d="M4.566,29.4A33.324,33.324,0,0,1,29.4,4.566a59.243,59.243,0,0,1,27.059,0A33.324,33.324,0,0,1,81.291,29.4a59.245,59.245,0,0,1,0,27.059A33.324,33.324,0,0,1,56.458,81.291a59.245,59.245,0,0,1-27.059,0A33.324,33.324,0,0,1,4.566,56.458,59.243,59.243,0,0,1,4.566,29.4Z" transform="translate(58 509)" stroke="transparent" strokeWidth="0"/>
                {childLoading && childLoading !== 100 && <path className="avatar-loading-border" style={{fill: "none", strokeWidth: "5px", stroke: "var(--first-color)", opacity: 0.5}} strokeDasharray={`${100 * 2.57}, 257`} strokeDashoffset="0" d="M4.566,29.4A33.324,33.324,0,0,1,29.4,4.566a59.243,59.243,0,0,1,27.059,0A33.324,33.324,0,0,1,81.291,29.4a59.245,59.245,0,0,1,0,27.059A33.324,33.324,0,0,1,56.458,81.291a59.245,59.245,0,0,1-27.059,0A33.324,33.324,0,0,1,4.566,56.458,59.243,59.243,0,0,1,4.566,29.4Z" transform="translate(58 509)" stroke="transparent" strokeWidth="0"/>}
                <path d="M-1421,7390h-84v-84h84v84Zm-42-81.93a59.36,59.36,0,0,0-13.53,1.565,33.13,33.13,0,0,0-24.832,24.834,59.532,59.532,0,0,0,0,27.059,33.129,33.129,0,0,0,24.832,24.833,59.341,59.341,0,0,0,13.53,1.565,59.324,59.324,0,0,0,13.529-1.565,33.129,33.129,0,0,0,24.834-24.833,59.532,59.532,0,0,0,0-27.059,33.131,33.131,0,0,0-24.834-24.834A59.341,59.341,0,0,0-1463,7308.072Z" transform="translate(1564 -6796)"/>
            </g>
        </svg>
    )
}

export default AvatarTemplate