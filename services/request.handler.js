const { AppError } = require("../utils/types");

// closure solution
function requestHandler(controller) {
  return async function (req, res, next) {
    try {
      if (!!controller) await controller(req, res, next);
      else next();
    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        return next(error);
      }
      next(new AppError("Something went wrong.", 500));
    }
  }
}

// bind solution
// const requestHandler = async function (req, res, next) {
//   try {
//     if (!!this.controller) await this.controller(req, res, next);
//     else next();
//   } catch (error) {
//     if (error instanceof AppError) {
//       return next(error);
//     }
//     next(new AppError("Something went wrong.", 500));
//   }
// };

module.exports = { requestHandler };
