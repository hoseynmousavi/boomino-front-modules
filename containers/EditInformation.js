import Input from "../../boomino-front-modules/components/Input"
import Select from "../../boomino-front-modules/components/Select"
import {useContext, useState} from "react"
import Button from "../../seyed-modules/components/Button"
import DatePicker from "../components/DatePicker"
import ShieldSvg from "../media/svg/ShieldSvg"
import AuthActions from "../../boomino-front-modules/context/auth/AuthActions"
import {AuthContext} from "../context/auth/AuthReducer"
import urlConstant from "../constant/urlConstant"
import EditAvatar from "../components/EditAvatar"
import toastManager from "../../seyed-modules/helpers/toastManager"
import toastConstant from "../constant/toastConstant"
import {FAIL_TOAST, SUCCESS_TOAST} from "../../seyed-modules/constant/toastTypes"
import BtnBottomFullScreen from "../components/BtnBottomFullScreen"
import CheckIfChildExists from "../../boomino-front-modules/hooks/CheckIfChildExists"
import LoadingWrapper from "../../seyed-modules/components/LoadingWrapper"
import {FamilyContext} from "../context/family/FamilyReducer"
import getImageLink from "../../boomino-front-modules/helpers/getImageLink"
import showPhoneNumber from "../../seyed-modules/helpers/showPhoneNumber"
import WizardBack from "../../boomino-front-modules/components/WizardBack"
import goBack from "../../seyed-modules/helpers/goBack"
import textConstant from "../constant/textConstant"
import GetTheme from "../../seyed-modules/hooks/GetTheme"
import parseQueryString from "../../seyed-modules/helpers/parseQueryString"

function EditInformation({route: {location: {pathname}, match: {params: {childId}}}, link})
{
    const {isDark} = GetTheme()
    const {state: {user}, dispatch} = useContext(AuthContext)
    const {dispatch: familyDispatch} = useContext(FamilyContext)
    const [values, setValues] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const isAfterSignUp = pathname === urlConstant.editInformationAfterSignup

    const {child, isLoading: isChildLoading, notFound} = CheckIfChildExists({childId})

    const {fullName, firstName, lastName, email, birthDate, nationalCode, gender} = values
    let data = {}

    if (child && (fullName || fullName === "") && fullName !== (child.fullName || "")) data.fullName = fullName
    if ((firstName || firstName === "") && firstName !== (user.firstName || "")) data.firstName = firstName
    if ((lastName || lastName === "") && lastName !== (user.lastName || "")) data.lastName = lastName
    if ((email || email === "") && email !== (user.email || "")) data.email = email || null
    if ((nationalCode || nationalCode === "") && nationalCode !== (user.data?.nationalCode || "")) data.data = {...data.data, nationalCode}
    if (birthDate && birthDate !== (childId ? child.birthDate : user.birthDate)) data.birthDate = birthDate
    if (gender && gender !== (childId ? child.gender : user.data?.gender)) data.data = {...data.data, gender}

    const validationError = Object.values(values).some(item => item === null)

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
                            goBack()
                            setTimeout(() => toastManager.addToast({message: toastConstant[childId ? "editChildProfileSuccess" : "editProfileSuccess"], type: SUCCESS_TOAST}), 150)
                        }
                    })
                    .catch(() => setIsLoading(false))
            }
            else
            {
                goBack()
                setTimeout(() => toastManager.addToast({message: toastConstant[childId ? "editChildProfileSuccess" : "editProfileSuccess"], type: SUCCESS_TOAST}), 150)
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
            <div className={`login edit ${isDark ? "dark" : ""}`}>
                <WizardBack title={isAfterSignUp ? textConstant.completeProfile : childId ? textConstant.childAccountInfo : textConstant.accountInfo}
                            desc={isAfterSignUp && textConstant.completeProfileAfterSignup}
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
                           label={textConstant.fullName}
                           placeholder={textConstant.fullName}
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
                               placeholder={textConstant.lastName}
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
                            items={[{id: "male", name: childId ? "پسر" : "مرد"}, {id: "female", name: childId ? "دختر" : "زن"}]}
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
                </div>
                <BtnBottomFullScreen className="login-edit-buttons">
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