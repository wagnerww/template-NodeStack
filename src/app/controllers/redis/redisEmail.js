const redis = require("../../../config/redis");

class redisEmailController {
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

  async store(conteudo) {
    const value = JSON.stringify(conteudo);
    const redisError = await redis.SADD("sendEmail", value, function(
      err,
      success
    ) {
      if (err) {
        const retorno = {
          mensagem: `Falha ao enviar email para a fila: ${err}`
        };
      } else {
        console.log("sucesso", success);
      }
    });

    return redisError;
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

module.exports = new redisEmailController();
