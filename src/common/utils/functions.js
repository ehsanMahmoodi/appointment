const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
const { AuthorizationMessages } = require("../guard/authorization.messages");
const { PublicMessages } = require("./public.messages");
const { parse, isAfter, isBefore, format } = require("date-fns");
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
  if (typeof time !== "string") return false;
  const parsedTime = parse(time, "HH:mm", new Date());
  return format(parsedTime, "HH:mm") === time;
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
const isTimeBetween = (target, start, end) => {
  const t = parse(target, "HH:mm", new Date());
  const s = parse(start, "HH:mm", new Date());
  const e = parse(end, "HH:mm", new Date());
  return isAfter(t, s) && isBefore(t, e);
};
const updateTimeSlot = (
  schedule,
  dayId,
  currentStart,
  newStart = null,
  newEnd = null,
) => {
  let slot = schedule.find(
    (slot) => slot.dayId === dayId && slot.start === currentStart,
  );
  if (!slot) throw new Error("Time slot not found");
  let sameDaySlots = schedule.filter((s) => s.dayId === dayId && s !== slot);
  if (newStart) {
    if (!isValidTime(newStart)) throw new Error("Invalid start format");
    if (sameDaySlots.some((s) => isTimeBetween(newStart, s.start, s.end))) {
      throw new Error(`Start time ${newStart} overlaps with another slot`);
    }
    slot.start = newStart;
  }
  if (newEnd) {
    if (!isValidTime(newEnd)) throw new Error("Invalid end format");
    if (
      !isAfter(
        parse(newEnd, "HH:mm", new Date()),
        parse(slot.start, "HH:mm", new Date()),
      )
    ) {
      throw new Error("End time must be after start time");
    }
    if (sameDaySlots.some((s) => isTimeBetween(newEnd, s.start, s.end))) {
      throw new Error(`End time ${newEnd} overlaps with another slot`);
    }
    slot.end = newEnd;
  }
  return schedule;
};
module.exports = {
  verifyJwtToken,
  isValidTime,
  isTimeAfter,
  canAddTimeSlot,
  updateTimeSlot,
};
