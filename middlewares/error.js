// Global error handler
const errorHandler = (err, req, res, next) => {
  console.log("Calling the global error handler@@@@@@@@@@@@@");
  // Log error
  console.error(err.message);

  // Mongoose bad objectId
  if (err.name === "CastError") {
    return res.status(400).send({
      status: false,
      statusCode: 400,
      message: "Resource not found",
    });
  }

  // Mongoose duplicate key value
  if (err.code === 11000) {
    const keyVal = Object.keys(err.keyValue)[0];
    const message = `${keyVal} already exists. Please, use a different ${keyVal}`;
    return res.status(400).send({
      status: false,
      statusCode: 400,
      message,
    });
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messageArr = Object.values(err.errors).map((value) => value.message);
    const message = `Invalid input data: ${messageArr.join(", ")}`;
    return res.status(400).send({
      status: false,
      statusCode: 400,
      message,
    });
  }

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const message = `${statusCode}`.startsWith("4")
    ? err.message
    : "Something went wrong!";

  res.status(statusCode).send({
    status: false,
    statusCode,
    message,
  });
};

// Unhandled routes [NB: app.all('*', (req, res, next) => {}) works as well]
const unhandledRoutes = (req, res, next) => {
  const error = new Error(
    `${req.method} request to: ${req.originalUrl} not available on this server!`
  );
  res.status(404);
  next(error);
};

module.exports = { errorHandler, unhandledRoutes };
