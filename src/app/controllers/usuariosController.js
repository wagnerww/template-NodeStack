const usuarios = require("../models/usuarios");
const bcrypt = require("bcryptjs");

const response = require("../../config/responsePattern");
const urlApp = require("../Utils/baseurlApp");
const { usuarioStore } = require("../validators/usuarioValidator");

class usuariosController {
  async index(req, res, next) {
    try {
      const users = await usuarios.select("*");

      await users.map(async user => {
        user.url_avatar = await showAvatar(user.url_avatar);
      });

      response.statusCode = 200;
      response.data = users;
      next(response);
      return;
    } catch (error) {
      response.statusCode = 401;
      response.message = error.message;
      next(response);
      return;
    }
  }

  async show(req, res, next) {}

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
      const isExiste = await usuarios.where({ email }).first();

      if (isExiste) {
        response.statusCode = 400;
        response.message = "Já existe um usuário com este e-mail!";
        next(response);
        return;
      }

      body.senha = await bcrypt.hash(body.senha, 8);

      const user = await usuarios.insert(body).returning("*");

      response.statusCode = 200;
      response.data = user[0];
      next(response);
      return;
    } catch (error) {
      response.statusCode = 401;
      response.message = error.message;
      next(response);
      return;
    }
  }

  async update(req, res, next) {}

  async destroy(req, res, next) {}

  async storeAvatar(req, res, next) {
    try {
      const pathAvatar = req.file.key;
      const { id } = req.params;
      const usuarioUpd = await usuarios
        .update({ url_avatar: pathAvatar })
        .where({ id })
        .returning("*");

      const usuario = usuarioUpd[0];
      usuario.url_avatar = req.file.location;

      response.statusCode = 200;
      response.data = usuario;
      next(response);
    } catch (error) {
      response.statusCode = 401;
      response.message = error.message;
      next(response);
      return;
    }

    return;
  }
}

function showAvatar(avatar) {
  const url = `${urlApp}/files/${encodeURIComponent(avatar)}`;
  return url;
}

module.exports = new usuariosController();
