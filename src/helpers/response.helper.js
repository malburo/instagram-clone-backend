function success(res, data, status = 200) {
  return res.status(status).json({
    status: 'success',
    data,
  });
}
function error(res, error, status = 400) {
  return res.status(status).json({
    status: 'failed',
    error,
  });
}
module.exports = {
  success,
  error,
};
