//const db = require("../../config/database");
exports.up = function(knex) {
  return knex.schema.createTable("filas", table => {
    table.increments("id").notNullable();
    table.integer("tipo").notNullable();
    table.integer("status").notNullable();
    table.string("conteudoJson", 10000).notNullable();
    table.integer("qtdExecucao");
    table.string("observacao");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("filas");
};
