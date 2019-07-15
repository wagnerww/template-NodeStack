const usuariosModel = require("../models/usuarios");
const bcrypt = require("bcryptjs");

const agendamentoFilasController = require("./agendamentoFilasController");
const response = require("../../config/responsePattern");
const urlApp = require("../Utils/baseurlApp");
const encryptDecrypt = require("../Utils/encryptDecryptHash");
const {
  recuperarSenha,
  trocarSenha
} = require("../validators/usuarioValidator");

class senhaUsuarioController {
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

      const { email } = body;
      const usuario = await usuariosModel
        .query()
        .where({ email })
        .first();

      if (!usuario) {
        response.statusCode = 400;
        response.message = "E-mail não encontrado";
        next(response);
        return;
      }

      const hash = await encryptDecrypt.encrypt(usuario.id);

      const recuperacaoSenha = {
        body: {
          tipo: 1,
          conteudoJson: {
            destinatario: body.email,
            assunto: "Recuperação de senha...🕵",
            corpoEmail: {
              nome: usuario.nome,
              link: `http://localhost:3000/trocarsenha/${hash}`
            }
          }
        }
      };

      const retorno = {
        mensagem: "Tente novamente mais tarde."
      };

      await agendamentoFilasController.store(recuperacaoSenha, res, function(
        nextFilas
      ) {
        if (nextFilas.statusCode === 200) {
          retorno.mensagem =
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

  async trocarSenha(req, res, next) {
    try {
      const { body, params } = req;

      const { error } = trocarSenha.validate(body);

      if (error) {
        response.statusCode = 400;
        response.message = error.message;
        next(response);
        return;
      }

      const { hash } = params;

      if (!hash) {
        response.statusCode = 400;
        response.message =
          "A troca de senha expirou, faça uma nova solicitação";
        next(response);
        return;
      }

      const { isDecrypt, textDecrypt: id } = await encryptDecrypt.decrypt(hash);

      if (!isDecrypt) {
        response.statusCode = 400;
        response.message =
          "Houve uma falha na troca da sua senha. Tente solicitar uma nova troca.";
        next(response);
        return;
      }

      body.senha = await bcrypt.hash(body.senha, 8);

      await usuariosModel
        .query()
        .update(body)
        .where({ id });

      const retorno = {
        mensagem: "Troca de senha realizada com sucesso"
      };

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

module.exports = new senhaUsuarioController();
