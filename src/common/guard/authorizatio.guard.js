require('../../configs/env.loader')
console.log(process.env.DB_TYPE)
const createHttpError = require("http-errors");
const { AuthorizationMessages } = require("./authorization.messages");
const { verifyJwtToken } = require("../utils/functions");
const { Profile } = require("../../modules/user/user.model");
const { Roles } = require("../constant/role.constant");
const Authorization = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const [bearer, token] = authorization.split(" ");
      if (bearer.toLowerCase() === "bearer" && token) {
        const { id } = verifyJwtToken(
          token,
          process.env.ACCESS_TOKEN_SECRET_KEY,
        );
        const profile = await Profile.findByPk(id, {
          attributes: ["role", "isActive", "id", "phone"],
        });
        if (!profile)
          throw new createHttpError.NotFound(AuthorizationMessages.NotFound);
        const userRole = profile.role;
        if (!Object.values(Roles).includes(userRole))
          throw new createHttpError.Forbidden(AuthorizationMessages.Forbidden);
        req.user = profile;
        return next();
      }
      throw new createHttpError.BadRequest(
        AuthorizationMessages.AuthorizationNotValid,
      );
    }
    throw new createHttpError.Unauthorized(AuthorizationMessages.Unauthorized);
  } catch (err) {
    next(err);
  }
};
module.exports = { Authorization };
