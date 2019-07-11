require("dotenv").config();
const nodemailer = require("nodemailer");

//send("Atleta vc está quase lá...🕵", "wagnerricardonet@gmail.com");

async function send(assunto, paraQuem, corpoEmail) {
  let isEnviado;
  errorDescription = "";
  /* MAIL GUN
 var api_key = "";
  var domain = "";
  var mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });

  var data = {
    from: "Excited User <wagnerricardonet@gmail.com>",
    to: "wagnerricardonet@gmail.com",
    subject: "Hello",
    text: "vai"
  };

  mailgun.messages().send(data, function(error, body) {
    console.log(body);
  });*/

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_AUTH_USER,
      pass: process.env.MAIL_AUTH_SENHA
    }
  });

  try {
    let info = await transporter.sendMail({
      from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_EMAIL}>`, //De quem
      to: paraQuem,
      subject: assunto,
      /* text: corpoEmail, //texto html, isso é um escape se o email bloquear o body do html*/
      html: corpoEmail //corpo do html
    });
    isEnviado = true;
  } catch (error) {
    errorDescription = `Erro ao enviar o email: ${error}`;
    isEnviado = false;
  }

  return { isEnviado, errorDescription };
}

module.exports = send;
