exports.up = function(knex) {
  return knex.schema.createTable("usuarios", table => {
    table.increments("id").primary();
    table.string("nome", 80).notNullable();
    table.string("email", 80).notNullable();
    table.string("senha", 80).notNullable();
    table.string("avatar", 1000);
    table.string("telefone", 50);
    table.integer("perfil", 1);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("usuarios");
};
