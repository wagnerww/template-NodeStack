//const db = require("../../config/database");
exports.up = function(knex) {
  return knex.schema.createTable("usuario_enderecos", table => {
    table.increments("id").notNullable();
    table.integer("usr_id").notNullable();
    table
      .foreign("usr_id")
      .references("id")
      .inTable("usuarios");
    table.string("endereco").notNullable();
    table.string("numero").notNullable();
    table.string("bairro").notNullable();
    table.string("cidade").notNullable();
    table.dropPrimary();
    table.primary(["id", "usr_id"]);
  });
};

exports.down = function(knex) {
  knex.schema.dropTable("usuario_enderecos");
};
