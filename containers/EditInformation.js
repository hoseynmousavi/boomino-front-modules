import Input from "../../boomino-front-modules/components/Input"
import Select from "../../boomino-front-modules/components/Select"
import {useContext, useRef, useState} from "react"
import Button from "../../seyed-modules/components/Button"
import DatePicker from "../components/DatePicker"
import ShieldSvg from "../media/svg/ShieldSvg"
import AuthActions from "../../boomino-front-modules/context/auth/AuthActions"
import {AuthContext} from "../context/auth/AuthReducer"
import urlConstant from "../constant/urlConstant"
import EditAvatar from "../components/EditAvatar"
import toastManager from "../../seyed-modules/helpers/toastManager"
import {FAIL_TOAST, SUCCESS_TOAST} from "../../seyed-modules/constant/toastTypes"
import BtnBottomFullScreen from "../components/BtnBottomFullScreen"
import CheckIfChildExists from "../../boomino-front-modules/hooks/CheckIfChildExists"
import LoadingWrapper from "../../seyed-modules/components/LoadingWrapper"
import {FamilyContext} from "../context/family/FamilyReducer"
import getImageLink from "../../boomino-front-modules/helpers/getImageLink"
import showPhoneNumber from "../../seyed-modules/helpers/showPhoneNumber"
import WizardBack from "../../boomino-front-modules/components/WizardBack"
import parseQueryString from "../../seyed-modules/helpers/parseQueryString"
import closeAndToast from "../../seyed-modules/helpers/closeAndToast"
import GetTextConstant from "../hooks/GetTextConstant"
import ChildHavePhone from "../components/ChildHavePhone"
import getMainRender from "../../seyed-modules/helpers/getMainRender"
import normalizePhone from "../helpers/normalizePhone"

function EditInformation({route: {location: {pathname}, match: {params: {childId}}}, link})
{
    const {textConstant, toastConstant} = GetTextConstant()
    const {state: {user}, dispatch} = useContext(AuthContext)
    const {dispatch: familyDispatch} = useContext(FamilyContext)
    const [values, setValues] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const isAfterSignUp = pathname === urlConstant.editInformationAfterSignup
    const [havePhone, setHavePhone] = useState(false)
    const phoneRef = useRef(null)
    const {child, isLoading: isChildLoading, notFound} = CheckIfChildExists({childId, doAfterGet})

    const {fullName, firstName, lastName, email, birthDate, nationalCode, gender, phone_number} = values
    let data = {}

    function doAfterGet(child)
    {
        if (child)
        {
            const {phone_number} = child
            if (phone_number) setHavePhone(true)
        }
    }

    if (child && (fullName || fullName === "") && fullName !== (child.fullName || "")) data.fullName = fullName
    if ((firstName || firstName === "") && firstName !== (user.firstName || "")) data.firstName = firstName
    if ((lastName || lastName === "") && lastName !== (user.lastName || "")) data.lastName = lastName
    if ((email || email === "") && email !== (user.email || "")) data.email = email || null
    if ((nationalCode || nationalCode === "") && nationalCode !== (user.data?.nationalCode || "")) data.data = {...data.data, nationalCode}
    if (birthDate && birthDate !== (childId ? child.birthDate : user.birthDate)) data.birthDate = birthDate
    if (gender && gender !== (childId ? child.gender : user.data?.gender)) data.data = {...data.data, gender}
    if (child)
    {
        if (havePhone && phone_number)
        {
            if (normalizePhone(child.phone_number) !== phone_number) data.data = {...data.data, phone_number}
        }
        else if (child.phone_number) data.data = {...data.data, phone_number: null}
    }

    const validationError = Object.keys(values).some(item => item === "phone_number" ? havePhone && values[item] === null : values[item] === null)

    function toggleChildPhone()
    {
        const havePhoneTemp = !havePhone
        setHavePhone(havePhoneTemp)
        if (havePhoneTemp) setTimeout(() =>
        {
            const root = getMainRender()
            root.scrollTo({top: root.clientHeight, behavior: "smooth"})
            setTimeout(() => phoneRef.current.focus(), 300)
        }, 400)
    }

    function changeField({name, value})
    {
        setValues(values => ({...values, [name]: value}))
    }

    function goToHome()
    {
        const {returnTo} = parseQueryString()
        window.history.replaceState("", "", returnTo ? returnTo : urlConstant.home)
    }

    function saveInformation()
    {
        if (!validationError)
        {
            if (Object.values(data).length > 0)
            {
                setIsLoading(true)
                AuthActions.editProfile({
                    data,
                    dispatch,
                    childId,
                    familyDispatch,
                })
                    .then(() =>
                    {
                        if (isAfterSignUp) goToHome()
                        else
                        {
                            setIsLoading(false)
                            closeAndToast({toast: {message: toastConstant[childId ? "editChildProfileSuccess" : "editProfileSuccess"], type: SUCCESS_TOAST}})
                        }
                    })
                    .catch(() => setIsLoading(false))
            }
            else
            {
                setIsLoading(false)
                closeAndToast({toast: {message: toastConstant[childId ? "editChildProfileSuccess" : "editProfileSuccess"], type: SUCCESS_TOAST}})
            }
        }
        else onDisableSaveClick()
    }

    function onDisableSaveClick()
    {
        if (validationError) toastManager.addToast({message: toastConstant.validationError, type: FAIL_TOAST})
    }

    if (!childId || child)
    {
        return (
            <div className="login edit">
                <WizardBack title={isAfterSignUp ? textConstant.completeProfile : childId ? textConstant.childAccountInfo : textConstant.accountInfo}
                            desc={isAfterSignUp && textConstant.completeProfileAfterSignup}
                            dontShowBack={isAfterSignUp}
                />
                <div className="login-edit-form">
                    {
                        !isAfterSignUp &&
                        <EditAvatar showLoginUser={!childId}
                                    avatar={getImageLink(child?.avatar_fid)}
                                    avatarClassName="login-image-edit-crop"
                                    label={textConstant.editAvatar}
                                    link={link?.(childId)}
                                    isChild={!!childId}
                        />
                    }
                    <Input name={childId ? "fullName" : "firstName"}
                           label={textConstant.firstName}
                           placeholder={textConstant.firstNamePlaceholder}
                           defaultValue={childId ? child.fullName || "" : user.firstName || ""}
                           onChange={changeField}
                           focusOnMountDesktop
                           disableSubmit={validationError}
                           onSubmit={saveInformation}
                           onSubmitDisable={onDisableSaveClick}
                           disabled={isLoading}
                           required={!!childId}
                           fixScroll
                    />
                    {
                        !childId &&
                        <Input name="lastName"
                               label={textConstant.lastName}
                               placeholder={textConstant.lastNamePlaceholder}
                               defaultValue={user.lastName || ""}
                               onChange={changeField}
                               disableSubmit={validationError}
                               onSubmit={saveInformation}
                               onSubmitDisable={onDisableSaveClick}
                               disabled={isLoading}
                               fixScroll
                        />
                    }
                    {
                        !isAfterSignUp && !childId &&
                        <>
                            <Input name="email"
                                   validation="email"
                                   label={textConstant.email}
                                   placeholder={textConstant.enterEmail}
                                   defaultValue={user.email || ""}
                                   onChange={changeField}
                                   ltr
                                   disableSubmit={validationError}
                                   onSubmit={saveInformation}
                                   onSubmitDisable={onDisableSaveClick}
                                   disabled={isLoading}
                                   type="email"
                                   fixScroll
                            />
                            <Input name="mobilePhone"
                                   label={textConstant.mobilePhone}
                                   disabled
                                   defaultValue={showPhoneNumber.showPhone(user.mobilePhone)}
                                   onChange={changeField}
                                   ltr
                                   Icon={ShieldSvg}
                                   disableSubmit={validationError}
                                   onSubmit={saveInformation}
                                   onSubmitDisable={onDisableSaveClick}
                                   type="tel"
                                   fixScroll
                            />
                            <Input name="nationalCode"
                                   validation="national_code"
                                   label={textConstant.nationalCode}
                                   placeholder={textConstant.enterNationalCode}
                                   defaultValue={user.data?.nationalCode || ""}
                                   onChange={changeField}
                                   ltr
                                   disableSubmit={validationError}
                                   onSubmit={saveInformation}
                                   onSubmitDisable={onDisableSaveClick}
                                   disabled={isLoading}
                                   type="tel"
                                   fixScroll
                            />
                        </>
                    }
                    <Select name="gender"
                            full_title={textConstant[childId ? "chooseChildGender" : "chooseGender"]}
                            title={textConstant.gender}
                            items={[{id: "male", name: childId ? textConstant.boy : textConstant.male}, {id: "female", name: childId ? textConstant.girl : textConstant.female}]}
                            defaultValue={childId ? child.gender : user.data?.gender}
                            onChange={changeField}
                            disabled={isLoading}
                    />
                    {
                        !isAfterSignUp &&
                        <DatePicker name="birthDate"
                                    full_title={textConstant[childId ? "chooseChildBirthDate" : "chooseBirthDate"]}
                                    title={textConstant.birthDate}
                                    defaultValue={childId ? child.birthDate : user.birthDate}
                                    onChange={changeField}
                                    disabled={isLoading}
                        />
                    }
                    {
                        child &&
                        <ChildHavePhone ref={phoneRef}
                                        disabled={isLoading}
                                        defaultValue={normalizePhone(child.phone_number)}
                                        isActive={havePhone}
                                        changeField={changeField}
                                        onSubmit={saveInformation}
                                        onSubmitDisable={onDisableSaveClick}
                                        disableSubmit={validationError}
                                        toggle={toggleChildPhone}
                        />
                    }
                </div>
                <BtnBottomFullScreen className="login-edit-buttons" delayCheckPin={false}>
                    {isAfterSignUp && <Button className="login-edit-button skip" type="skip" disable={isLoading} onClick={goToHome}>{textConstant.skipBtn}</Button>}
                    <Button className="login-edit-button" type="first" disable={validationError} loading={isLoading} onClick={saveInformation} onDisableClick={onDisableSaveClick}>{isAfterSignUp ? textConstant.continueBtn : textConstant.saveBtn}</Button>
                </BtnBottomFullScreen>
            </div>
        )
    }
    else if (isChildLoading) return <LoadingWrapper/>
    else if (notFound) return "NOT FOUND!"
    else return null
}

export default EditInformation