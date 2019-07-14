const redis = require("../../config/redis");
const filasModel = require("../models/filas");
const emailService = require("../services/mail");
const schedule = require("node-schedule");

let exec = 0;
enviarEmailRedis = async () => {
  await redis.smembers("sendEmail", async function(err, values) {
    if (!err)
      for (i in values) {
        let value = values[i];
        let jsonEmail = JSON.parse(value);

        //Envia o email
        const { isEnviado, errorDescription } = await enviaEmail(jsonEmail);

        if (isEnviado) redis.SREM("sendEmail", value);
      }
  });
};

enivarEmailFilas = async () => {
  const filas = await filasModel.query().where({ tipo: 1, status: 1 });
  const envio = await Promise.all(
    await filas.map(async fila => {
      const jsonEmail = JSON.parse(fila.conteudoJson);
      let qtdExecucao = fila.qtdExecucao + 1;
      //Envia o email
      const { isEnviado, errorDescription } = await enviaEmail(jsonEmail);
      if (isEnviado) {
        await fila.$query().update({ status: 3, qtdExecucao });
      } else {
        await fila
          .$query()
          .update({ qtdExecucao, observacao: errorDescription });
      }
    })
  );
};

enviaEmail = async jsonEmail => {
  const { assunto, destinatario, corpoEmail } = jsonEmail;

  //envia o email
  const resEmail = await emailService(
    assunto,
    destinatario,
    corpoEmail,
    "recuperacaoSenha"
  );
  const { isEnviado, errorDescription } = resEmail;
  return { isEnviado, errorDescription };
};

const job = schedule.scheduleJob("0-59/5 * * * * *", async date => {
  exec += 1;
  await enviarEmailRedis();
  await enivarEmailFilas();

  console.log(`execução número:${exec}, hora:${date}`);
});
