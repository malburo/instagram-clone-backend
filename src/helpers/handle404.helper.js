const Response = require('./response.helper');

function handle404(req, res, next) {
  return Response.error(
    res,
    {
      type: 'Not found',
      message: 'API not found',
    },
    404
  );
}

module.exports = handle404;
