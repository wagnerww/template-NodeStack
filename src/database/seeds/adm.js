//const db = require("../../config/database");
const bcrypt = require("bcryptjs");

exports.seed = async function(knex) {
  const senha = await bcrypt.hash("123", 8);
  return knex("usuarios").insert([
    {
      nome: "Administador",
      email: "wagnerricardonet@gmail.com",
      senha,
      perfil: 1
    }
  ]);
};
