const { AppError } = require("../utils/types");

function validator(validationSchema, field = "body") {
  return (req, res, next) => {
    if (!field?.trim()) return next();
    if (!validationSchema?.validate) return next();
    const { error } = validationSchema.validate(req[field]);
    if (!!error) return next(new AppError(error, 400));
    next();
  };
}

module.exports = { validator };
