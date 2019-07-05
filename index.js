require("dotenv").config({});
const server = require("./src/server");

server.listen(process.env.APP_PORT || 3001);

if (process.env.NODE_ENV === "development") {
  const BgBlack = "\x1b[32m";
  console.log(
    BgBlack,
    `  🚀      ${process.env.APP_URL}:${process.env.APP_PORT}`
  );
}
