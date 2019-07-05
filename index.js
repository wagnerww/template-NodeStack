require("dotenv").config({});
const server = require("./src/server");

server.listen(process.env.APP_PORT || 3001);

if (process.env.NODE_ENV === "development") {
  console.log({ Executando: `${process.env.APP_URL}:${process.env.APP_PORT}` });
}
