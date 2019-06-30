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

    case 403:
      // Autenticação
      msgResponse.message = ret.message;
      break;

    case 400:
      // Validação
      msgResponse.message = ret.message;
      break;

    case 401:
      // Pau geral
      msgResponse.message = ret.message;
      break;

    default:
      break;
  }

  res.status(ret.statusCode).send(msgResponse);
  next();
}

module.exports = responseHandler;
