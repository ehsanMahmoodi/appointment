const AuthMessages = Object.freeze({
  OtpSend: "رمزیکبارمصرف به شماره تلفن شماارسال شد.",
  CreatedError: "مشکلی در ایجاد کاربر پیش آمده لطفا مجددا امتحان کنید.",
  OtpCreateError: "مشکلی در ارسال otp پیش آمده  لطفا مجددا امتحان کنید.",
  OtpNotExpired: "رمزیکبارمصرف هنوز مهلت دارد.",
  OtpExpired: "رمزیکبارمصرف منقضی شده لطفا مجددا نسبت به دریافت آن اقدام کنید.",
  OtpNotMatch: "کد وارد شده صحیح  نمی‌باشد.",
  NotFound: "کاربر یافت نشد.",
  OtpNotFound: "رمزیکبارمصرف یافت نشد لطفا مجددا نسبت به دریافت آن اقدام کنید.",
  Login: "باموفقیت وارد شدید",
  RegisterConflict: "شما قبلا ثبت نام کرده‌اید.",
  RefreshTokenExpired: "refreshToken منقضی شده است",
});
module.exports = { AuthMessages };
