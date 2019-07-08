const enderecosModel = require("../models/enderecosUsuario");
const response = require("../../config/responsePattern");

class enderecosUsuarioController {
  async index(req, res, next) {
    try {
      const { usr_id } = req;

      if (!usr_id) {
        response.statusCode = 400;
        response.message = "É necessário informar o usuário";
        next(response);
        return;
      }

      const enderecos = await enderecosModel.query().where({ usr_id });

      response.statusCode = 200;
      response.data = enderecos;
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
      const { params, usr_id } = req;
      const { id } = params;

      if (!id || !usr_id) {
        response.statusCode = 400;
        response.message = "É necessário informar o id e o usuário";
        next(response);
        return;
      }

      const endereco = await enderecosModel
        .query()
        .where({ id, usr_id })
        .first();

      response.statusCode = 200;
      response.data = endereco;
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
      const { body, usr_id } = req;

      if (!usr_id) {
        response.statusCode = 400;
        response.message = "É necessário informar o usuário";
        next(response);
        return;
      }

      body.usr_id = usr_id;
      /*
      const { error } = usuarioStore.validate(body);

      if (error) {
        response.statusCode = 400;
        response.message = error.message;
        next(response);
        return;
      }*/

      const endereco = await enderecosModel.query().insert(body);

      response.statusCode = 200;
      response.data = endereco;
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
      const { body, params, usr_id } = req;
      const { id } = params;

      if (!id || !usr_id) {
        response.statusCode = 400;
        response.message = "É necessário informar o id e o usuário!";
        next(response);
        return;
      }

      const enderecoSelect = await enderecosModel
        .query()
        .findOne({ id, usr_id });

      const endereco = await enderecoSelect.$query().updateAndFetch(body);

      response.statusCode = 200;
      response.data = endereco;
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
      const { params, usr_id } = req;
      const { id } = params;

      if (!id || !usr_id) {
        response.statusCode = 400;
        response.message = "É necessário informar o id e o usuário!";
        next(response);
        return;
      }

      const endereco = await enderecosModel
        .query()
        .delete()
        .where({ id, usr_id });

      response.statusCode = 200;
      response.data = endereco;
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
