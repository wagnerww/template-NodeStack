const redis = require("../../config/redis");
const emailService = require("../services/mail");
const schedule = require("node-schedule");

let exec = 0;
enviarEmail = async () => {
  await redis.smembers("sendEmail", async function(err, values) {
    if (!err)
      for (i in values) {
        let value = values[i];
        let jsonEmail = JSON.parse(value);
        const { assunto, destinatario, corpoEmail } = jsonEmail;
        //envia o email

        await emailService(assunto, destinatario, corpoEmail);
        redis.SREM("sendEmail", value);
      }
  });
};

const job = schedule.scheduleJob("0-59/5 * * * * *", async date => {
  exec += 1;
  await enviarEmail();

  console.log(`execução número:${exec}, hora:${date}`);
});
