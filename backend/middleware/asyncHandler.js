//This is an async handler meant to handle asynchronous requests
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
