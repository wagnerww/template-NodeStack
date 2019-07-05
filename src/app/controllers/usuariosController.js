const usuariosModel = require("../models/usuarios");
const bcrypt = require("bcryptjs");

const response = require("../../config/responsePattern");
const urlApp = require("../Utils/baseurlApp");
const { usuarioStore } = require("../validators/usuarioValidator");

class usuariosController {
  async index(req, res, next) {
    try {
      const usuarios = await usuariosModel.query().select();

      await usuarios.map(async usuario => {
        usuario.url_avatar = url_avatar
          ? await showAvatar(usuario.url_avatar)
          : "";
      });

      response.statusCode = 200;
      response.data = usuarios;
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

      const usuario = await usuariosModel
        .query()
        .eager("enderecos")
        .findById(id);

      usuario.url_avatar = await showAvatar(usuario.url_avatar);

      response.statusCode = 200;
      response.data = usuario;
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

      const { error } = usuarioStore.validate(body);

      if (error) {
        response.statusCode = 400;
        response.message = error.message;
        next(response);
        return;
      }

      const { email } = body;
      const isExiste = await usuariosModel
        .query()
        .where({ email })
        .first();

      if (isExiste) {
        response.statusCode = 400;
        response.message = "Já existe um usuário com este e-mail!";
        next(response);
        return;
      }

      body.senha = await bcrypt.hash(body.senha, 8);

      const usuario = await usuariosModel.query().insert(body);

      response.statusCode = 200;
      response.data = usuario;
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

      if (body.senha) {
        body.senha = await bcrypt.hash(body.senha, 8);
      }

      const usuario = await usuariosModel.query().updateAndFetchById(id, body);

      response.statusCode = 200;
      response.data = usuario;
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
      const { body, params } = req;

      const { id } = params;

      if (!id) {
        response.statusCode = 400;
        response.message = "É necessário informar o id!";
        next(response);
        return;
      }

      const usuario = await usuariosModel.query().deleteById(id);

      response.statusCode = 200;
      response.data = usuario;
      next(response);
      return;
    } catch (error) {
      response.statusCode = 500;
      response.message = error.message;
      next(response);
      return;
    }
  }

  async storeAvatar(req, res, next) {
    try {
      const pathAvatar = req.file.key;
      const { id } = req.params;
      const usuario = await usuariosModel
        .query()
        .updateAndFetchById(id, { url_avatar: pathAvatar });

      usuario.url_avatar = req.file.location;

      response.statusCode = 200;
      response.data = usuario;
      next(response);
    } catch (error) {
      response.statusCode = 500;
      response.message = error.message;
      next(response);
      return;
    }

    return;
  }
}

function showAvatar(avatar) {
  const url = avatar ? `${urlApp}/files/${encodeURIComponent(avatar)}` : "";
  return url;
}

module.exports = new usuariosController();
