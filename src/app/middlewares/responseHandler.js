function responseHandler(ret, req, res, next) {
  const msgResponse = {
    isSuccess: false,
    statusCode: ret.statusCode
  };

  switch (ret.statusCode) {
    case 200:
      msgResponse.isSuccess = true;
      msgResponse.data = ret.data;
      msgResponse.details = ret.details;
      break;

    default:
      msgResponse.message = ret.message;
      break;
  }

  res.status(ret.statusCode).send(msgResponse);
  next();
}

module.exports = responseHandler;
