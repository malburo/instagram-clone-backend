module.exports = (req, res, next) => {
  try {
    if (!req.file && !req.files) {
      next({
        status: 400,
        message: 'file is empty!!',
      });
    }
    next();
  } catch (err) {
    return next(err);
  }
};
