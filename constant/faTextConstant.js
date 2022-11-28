import verifyCodeConstant from "./verifyCodeConstant"

const faTextConstant = {
    back: "بازگشت",

    submitBtn: "ثبت",

    chooseGallery: "انتخاب از گالری",
    chooseCamera: "باز کردن دوربین",
    removeAvatar: "حذف تصویر",

    next: "بعدی",
    letsGo: "برو بریم",

    sendCodeAgain: "ارسال مجدد کد",

    continueBtn: "ادامه",
    submitAndContinueBtn: "ثبت و ادامه",
    closeBtn: "بستن",

    entering: `ورود به ${process.env.REACT_APP_NAME}`,
    enterPhone: "پدر مادر عزیز! شماره موبایلتان را وارد کنید!",

    onBoardingTitle1: "بهمون بگو چند سالشه؟",
    onBoardingTitle2: "هر چی بخوای این جا هست",
    onBoardingTitle3: `با آبنبات خیالتون راحته`,
    onBoardingDesc1: "تا بهتون بگیم محتوای مناسب سنش چیه",
    onBoardingDesc2: "بازی، فیلم، انیمیشن، موسیقی و دیدنی های آموزشی برای بچه‌ها",
    onBoardingDesc3: "چون با مدیریت سطح دسترسی‌های کودک، می‌تونید ازش مراقبت کنید",

    enterCode: "کد تاييد را وارد کنید",
    enterVerifyCode: `کد تاييد ${verifyCodeConstant.numberOfDigits} رقمی که به شماره همراه `,
    enterVerifyCodeEnd: " ارسال شد را در زیر وارد کنید.",
    editPhone: "ویرایش شماره",

    completeProfile: "تکمیل اطلاعات کاربری",
    completeProfileAfterSignup: "حساب شما با موفقیت ساخته شد، اطلاعات خود را کامل کنید.",
    childAccountInfo: "اطلاعات حساب فرزند",
    accountInfo: "اطلاعات حساب کاربری",
    editAvatar: "ویرایش تصویر پروفایل",
    lastName: "نام خانوادگی",
    fullName: "نام",
    email: "ایمیل",
    enterEmail: "ایمیل خود را وارد کنید",
    mobilePhone: "شماره همراه",
    nationalCode: "کدملی",
    enterNationalCode: "کد ملی 10 رقمی",
    gender: "جنسیت",
    chooseGender: "جنسیت خود را انتخاب کنید",
    birthDate: "تاریخ تولد",

    chooseChildGender: "جنسیت فرزند خود را انتخاب کنید",
    chooseChildBirthDate: "تاریخ تولد فرزند خود را انتخاب کنید",

    saveBtn: "ذخیره",
    skipBtn: "رد کردن",

    boy: "پسر",
    girl: "دختر",
    male: "مرد",
    female: "زن",

    hour: "ساعت",
    minute: "دقیقه",

    and: " و ",

    proposedPack: "بسته پیشنهادی",

    spaceHour: " ساعت",
    spaceMinute: " دقیقه",
    spaceSecond: " ثانیه",
    oneQuarter: "یک ربع ساعت",
    halfHour: "نیم ساعت",
    emptyTime: "0 دقیقه",

    noLimit: "بدون محدودیت",
    sameTimeForWeek: "زمان یکسان برای کل هفته",
    differentTimeForWeek: "زمان متفاوت برای هر روز هفته",
    manualSelect: "تنظیم دستی",
    manualSelectTitle: "تعیین زمان دستی",

    saturday: "شنبه",
    sunday: "یکشنبه",
    monday: "دوشنبه",
    tuesday: "سه‌شنبه",
    wednesday: "چهارشنبه",
    thursday: "پنجشنبه",
    friday: "جمعه",

    selectTimeRestriction: "مقدار فعالیت",
    selectTimeRestrictionDesc: "مقدار زمان فعالیت فرزند خود را مشخص کنید.",

    recommended: "پیشنهادی",
    manageApps: "مدیریت نرم‌افزارها",
    searchInApps: "جستجو در لیست اپلیکیشن‌ها",

    choosePackFirst: "لطفا ابتدا بسته فرزند خود را مشخص کنید.",

    noItemsFound: "موردی یافت نشد.",

    manageWeb: "مدیریت وبسایت‌ها",
    webAccessed: length => `دسترسی داده شده (${length})`,
    newWebAccess: "وبسایت جدید",

    addWeb: "وبسایت جدید",
    addWebDesc: "آدرس وبسایت جدید را وارد کنید",

    iRead: "خواندم",

    privacyIntro: "ورود شما به معنای پذیرش",
    privacyTitle: "قوانین حریم خصوصی",
    privacyEnd: "است.",
    privacyText: `ما وسط دنیای نامحدود اینترنت که از زمین و آسمانش محتوای خوب، بد، سالم و ناسالم می‌بارد به کمک اینترنت کودک یک دنیای پاک و قشنگ ساخته‌ایم مخصوص بچه‌ها و اسمش را گذاشته‌ایم: آبنبات!
آبنبات یعنی دیگر لازم نیست نگران گشت‌وگذارهای کودک در دنیای اینترنت باشید. با استفاده از آبنبات همه‌ چیز مناسب سن، درک و نگاه بچه‌های شما مناسب‌سازی شده است. شما می‌توانید با انتخاب بسته‌های آبنباتی اینترنت کودک، میزان دسترسی کودکتان به محتواهای مختلف را انتخاب و مدیریت کنید و به کودکتان اجازه بدهید در محیطی سالم، رشد و تجربه کند.
با آبنبات هم شما خیالتان راحت است که بچه‌ها فقط و فقط به محتوای مناسب سن خودشان دسترسی دارند و هم بچه‌ها می‌توانند آزادانه از اینترنت کودک که حق طبیعی‌شان است، استفاده کنند.`,
}

export default faTextConstant