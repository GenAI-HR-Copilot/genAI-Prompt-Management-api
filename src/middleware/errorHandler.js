import { Constants } from '../utils/constant.js';

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : Constants.HTTPINTERNALSERVERERROR;

  switch (statusCode) {
    case Constants.HTTPBADREQUEST:
      res.json({
        title: 'Validation Error',
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case Constants.HTTPNOCONTENT:
      res.json({
        title: 'Not Found',
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case Constants.UNAUTHORIZED:
      res.json({
        title: 'Unauthorized Error',
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case Constants.FORBIDDEN:
      res.json({
        title: 'Forbidden Error',
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case Constants.HTTPINTERNALSERVERERROR:
      res.json({
        title: 'Server Error',
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    default:
      console.log('No Error, All Good');
      break;
  }
};

export default errorHandler;
