import onboarding1 from "../media/images/onboarding1.webp"
import onboarding2 from "../media/images/onboarding2.webp"
import onboarding3 from "../media/images/onboarding3.webp"
import SlideDots from "../components/SlideDots"
import SlideGesture from "../../seyed-modules/hooks/SlideGesture"
import OnBoardingBtn from "../components/OnBoardingBtn"
import OnBoardingItem from "../components/OnBoardingItem"
import GetTextConstant from "../hooks/GetTextConstant"

function OnBoarding()
{
    const {textConstant} = GetTextConstant()
    const {slideIndex, onTouchEnd, onTouchStart, onTouchMove, slideRef, setSlide} = SlideGesture({slideNumbers: 3, rightToLeft: false, mainSlideAnime: true})
    return (
        <div className="on-boarding" onMouseDown={onTouchStart} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            <div className="on-boarding-slide" style={{transform: "translate3d(0,0,0)"}} ref={slideRef}>
                <OnBoardingItem src={onboarding1} title={textConstant.onBoardingTitle1} desc={textConstant.onBoardingDesc1}/>
                <OnBoardingItem src={onboarding2} title={textConstant.onBoardingTitle2} desc={textConstant.onBoardingDesc2}/>
                <OnBoardingItem src={onboarding3} title={textConstant.onBoardingTitle3} desc={textConstant.onBoardingDesc3}/>
            </div>
            <SlideDots dotClassName="on-boarding-dot" slideIndex={slideIndex} slideNumbers={3}/>
            <OnBoardingBtn slideIndex={slideIndex} setSlide={setSlide}/>
        </div>
    )
}

export default OnBoarding