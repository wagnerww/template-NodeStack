const response = require("../../config/responsePattern");

class SessionController {
  async store(req, res, next) {
    console.log("req", req.file);
    response.statusCode = 200;
    response.data = {};
    next(response);
    return;
  }
}

module.exports = new SessionController();
