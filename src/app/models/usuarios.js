const knex = require("../../config/database");

const usuarios = knex("usuarios");

module.exports = usuarios;
