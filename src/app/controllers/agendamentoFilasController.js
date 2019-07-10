const filasModel = require("../models/filas");
const redisEmail = require("./redis/redisEmail");
const response = require("../../config/responsePattern");

class enderecosUsuarioController {
  async index(req, res, next) {
    try {
      const filas = await filasModel.query().select();

      response.statusCode = 200;
      response.data = filas;
      next(response);
      return;
    } catch (error) {
      response.statusCode = 500;
      response.message = error.message;
      next(response);
      return;
    }
  }

  async show(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        response.statusCode = 400;
        response.message = "É necessário informar o id";
        next(response);
        return;
      }

      const fila = await filasModel.query().findById(id);

      response.statusCode = 200;
      response.data = fila;
      next(response);
      return;
    } catch (error) {
      response.statusCode = 500;
      response.message = error.message;
      next(response);
      return;
    }
  }

  async store(req, res, next) {
    try {
      const { body } = req;
      const isOk = await redisEmail.store(body.conteudoJson);
      let fila = {};
      if (!isOk) {
        body.status = 1;
        fila = await filasModel.query().insert(body);
      }

      response.statusCode = 200;
      response.data = fila;
      next(response);
      return;
    } catch (error) {
      response.statusCode = 500;
      response.message = error.message;
      next(response);
      return;
    }
  }

  async update(req, res, next) {
    try {
      const { body, params } = req;
      const { id } = params;

      if (!id) {
        response.statusCode = 400;
        response.message = "É necessário informar o id!";
        next(response);
        return;
      }

      const fila = await filasModel.query().updateAndFetchById(id);

      response.statusCode = 200;
      response.data = fila;
      next(response);
      return;
    } catch (error) {
      response.statusCode = 500;
      response.message = error.message;
      next(response);
      return;
    }
  }

  async destroy(req, res, next) {
    try {
      const { params } = req;
      const { id } = params;

      if (!id) {
        response.statusCode = 400;
        response.message = "É necessário informar o id e o usuário!";
        next(response);
        return;
      }

      const fila = await filasModel
        .query()
        .delete()
        .where({ id });

      response.statusCode = 200;
      response.data = fila;
      next(response);
      return;
    } catch (error) {
      response.statusCode = 500;
      response.message = error.message;
      next(response);
      return;
    }
  }
}

module.exports = new enderecosUsuarioController();
