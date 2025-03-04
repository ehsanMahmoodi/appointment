const AllExceptionHandler = (app) => {
  app.use((err, req, res, next) => {
    const isSequelizeError =
      err.name &&
      (err.name.includes("Sequelize") ||
        err.name === "ValidationError" ||
        err.name === "ForeignKeyConstraintError");
    let status = err.status || err.code || err.statusCode;
    if (!status || isNaN(+status) || status > 511 || status < 200) {
      if (isSequelizeError) {
        switch (err.name) {
          case "SequelizeValidationError":
          case "SequelizeUniqueConstraintError":
            status = 400;
            break;
          case "SequelizeForeignKeyConstraintError":
            status = 409;
            break;
          case "SequelizeConnectionError":
            status = 503;
            break;
          default:
            status = 500;
        }
      } else {
        status = 500;
      }
    }
    let errorMessage = err.message || "خطای داخلی سرور";
    let errorDetails = null;
    if (isSequelizeError) {
      if (err.errors && Array.isArray(err.errors)) {
        errorDetails = err.errors.map((error) => ({
          message: error.message,
          type: error.type,
          path: error.path,
          value: error.value,
        }));
      }
    }
    return res.status(status).send({
      statusCode: status,
      error: {
        name: err.name || "Error",
        message: errorMessage,
        path: err?.path,
        ...(errorDetails && { details: errorDetails }),
      },
    });
  });
};
module.exports = { AllExceptionHandler };
