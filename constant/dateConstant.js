import numberCorrection from "../../seyed-modules/helpers/numberCorrection"

const dateConstant = {
    months: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"],
    defaultYear: 1390,
    thisYear: numberCorrection(new Date().toLocaleString("fa-ir", {year: "numeric"})),
    defaultDay: 15,
    defaultMonth: 6,
    defaultHour: 0,
    defaultMinute: 15,
    noLimitTime: "24:00",
}

export default dateConstant