const { isCelebrateError } = require('celebrate');
const Response = require('./response.helper');

function handleError(err, req, res, next) {
  if (isCelebrateError(err)) {
    const joi = err.details.get('body');
    return Response.error(res, {
      type: 'Validate error',
      message: 'celebrate request validation failed',
      errors: joi.details.map(({ message, context }) => {
        const { key, label } = context;
        return {
          message: message.replace(/['"]/g, ''),
          key,
          label,
        };
      }),
    });
  }
  console.log(err);
  Response.error(res, {
    type: err.type,
    message: err.message,
  });
}

module.exports = handleError;
