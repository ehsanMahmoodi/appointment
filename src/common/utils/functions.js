const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
const { AuthorizationMessages } = require("../guard/authorization.messages");
const { PublicMessages } = require("./public.messages");
const { parse, isAfter } = require("date-fns");
const verifyJwtToken = (token, secretKey) => {
  let data;
  jwt.verify(token, secretKey, function (err, decode) {
    if (err) {
      if (/.*expire.*/i.exec(err?.name)) {
        throw new createHttpError.BadRequest("توکن وارد شده منقضی شده است.");
      } else {
        throw new createHttpError.BadRequest("توکن وارد شده اشتباه است.");
      }
    }
    data = decode;
  });
  if (!data)
    throw new createHttpError.Unauthorized(AuthorizationMessages.Unauthorized);
  return data;
};
const isValidTime = (time = "") => {
  let [hour, min] = time.split(":");
  if (hour && min) {
    if (hour == "24" || hour == "0" || hour == "00" || +hour > 23 || +hour < 1)
      throw new createHttpError.BadRequest(PublicMessages.InvalidTime);
    if (min == "24" || +min > 59 || +min < 0)
      throw new createHttpError.BadRequest(PublicMessages.InvalidTime);
    return true;
  }
  throw new createHttpError.BadRequest(PublicMessages.InvalidTime);
};
const isTimeAfter = (time1, time2) => {
  const t1 = parse(time1, "HH:mm", new Date());
  const t2 = parse(time2, "HH:mm", new Date());
  return isAfter(t1, t2);
};
const canAddTimeSlot = (slots, newSlot) => {
  const parseTime = (time) => {
    if (!time) return null; // در صورت نبود مقدار، مقدار null برگرداند
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m; // تبدیل به دقیقه
  };
  const newStart = parseTime(newSlot.start);
  const newEnd = parseTime(newSlot.end);
  // بررسی اینکه start جدید داخل بازه‌های موجود نباشد
  for (const slot of slots) {
    const slotStart = parseTime(slot.start);
    const slotEnd = parseTime(slot.end);
    if (newStart >= slotStart && newStart < slotEnd) {
      // تداخل پیدا شد
      throw new createHttpError.BadRequest(PublicMessages.ConflictTime);
    }
    if (newEnd !== null) {
      // بررسی اینکه end معتبر باشد
      if (newEnd <= newStart) {
        // مقدار end نباید کوچکتر یا مساوی start باشد
        throw new createHttpError.BadRequest(PublicMessages.StartTimeError);
      }
      // بررسی اینکه end جدید داخل بازه‌های موجود نباشد
      if (newEnd > slotStart && newEnd <= slotEnd) {
        throw new createHttpError.BadRequest(PublicMessages.ConflictTime);
      }
    }
  }
  return true;
};
module.exports = { verifyJwtToken, isValidTime, isTimeAfter, canAddTimeSlot };
