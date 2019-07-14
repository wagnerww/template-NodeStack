const usuariosModel = require("../models/usuarios");
const bcrypt = require("bcryptjs");

const agendamentoFilasController = require("./agendamentoFilasController");
const response = require("../../config/responsePattern");
const urlApp = require("../Utils/baseurlApp");
const {
  usuarioStore,
  recuperarSenha
} = require("../validators/usuarioValidator");

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
      const { usr_id } = req;
      const id = usr_id;

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
      const { body, params, usr_id } = req;
      const id = usr_id;

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
      const { body, usr_id } = req;

      const id = usr_id;

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
      const { usr_id } = req;
      const id = usr_id;

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

  async recuperarSenha(req, res, next) {
    try {
      const { body } = req;
      const { error } = recuperarSenha.validate(body);

      if (error) {
        response.statusCode = 400;
        response.message = error.message;
        next(response);
        return;
      }

      const recuperacaoSenha = {
        body: {
          tipo: 1,
          conteudoJson: {
            destinatario: body.email,
            assunto: `'Rcuperação de senha...🕵', 'wagnerricardonet@gmail.com'`,
            corpoEmail: "<br>Recuperação de senha<br>"
          }
        }
      };

      const retorno = {
        menssagem: "Tente novamente mais tarde."
      };

      await agendamentoFilasController.store(recuperacaoSenha, res, function(
        nextFilas
      ) {
        if (nextFilas.statusCode === 200) {
          retorno.menssagem =
            "Foi enviado uma solicitação de troca de senha para o seu e-mail";
        }
      });

      response.statusCode = 200;
      response.data = retorno;
      next(response);
    } catch (error) {
      response.statusCode = 500;
      response.message = error.message;
      next(response);
      return;
    }
  }
}

function showAvatar(avatar) {
  const url = avatar ? `${urlApp}/files/${encodeURIComponent(avatar)}` : "";
  return url;
}

module.exports = new usuariosController();
