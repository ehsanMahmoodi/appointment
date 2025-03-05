const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
const { AuthorizationMessages } = require("../guard/authorization.messages");
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
module.exports = { verifyJwtToken };
