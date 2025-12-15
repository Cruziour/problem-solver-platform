const asyncHandler = (cb) => {
  return (req, res, next) => {
    Promise.resolve(cb(req, res, next)).catch((error) => next(error));
  };
};

export default asyncHandler;
