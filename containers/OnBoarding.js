import onboarding1 from "../media/images/onboarding1.webp"
import onboarding2 from "../media/images/onboarding2.webp"
import onboarding3 from "../media/images/onboarding3.webp"
import SlideDots from "../components/SlideDots"
import SlideGesture from "../../seyed-modules/hooks/SlideGesture"
import OnBoardingBtn from "../components/OnBoardingBtn"
import textConstant from "../constant/textConstant"
import OnBoardingItem from "../components/OnBoardingItem"
import OnBoardingSvg from "../media/svg/OnBoardingSvg"
import GetTheme from "../../seyed-modules/hooks/GetTheme"

function OnBoarding()
{
    const {slideIndex, onTouchEnd, onTouchStart, onTouchMove, slideRef, setSlide} = SlideGesture({slideNumbers: 3, rightToLeft: false, mainSlideAnime: true})
    const {isDark} = GetTheme()
    return (
        <div className="on-boarding" onMouseDown={onTouchStart} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            <div className="on-boarding-slide" style={{transform: "translate3d(0,0,0)"}} ref={slideRef}>
                <OnBoardingItem Icon={isDark && OnBoardingSvg} src={onboarding1} title={textConstant.onBoardingTitle1} desc={textConstant.onBoardingDesc1}/>
                <OnBoardingItem Icon={isDark && OnBoardingSvg} src={onboarding2} title={textConstant.onBoardingTitle2} desc={textConstant.onBoardingDesc2}/>
                <OnBoardingItem Icon={isDark && OnBoardingSvg} src={onboarding3} title={textConstant.onBoardingTitle3} desc={textConstant.onBoardingDesc3}/>
            </div>
            <SlideDots dotClassName="on-boarding-dot" slideIndex={slideIndex} slideNumbers={3}/>
            <OnBoardingBtn slideIndex={slideIndex} setSlide={setSlide}/>
        </div>
    )
}

export default OnBoarding