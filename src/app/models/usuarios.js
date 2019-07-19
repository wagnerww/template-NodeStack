const knex = require("../../config/database");

const { Model } = require("objection");
Model.knex(knex);

const Enderecos = require("./enderecosUsuario");

class Usuarios extends Model {
  static get tableName() {
    return "usuarios";
  }

  async $beforeInsert(Ctx) {
    await super.$beforeInsert(Ctx);
    const senha = await hashSenha(this);
    this.senha = senha;
  }

  async $beforeUpdate(Ctx) {
    await super.$beforeUpdate(Ctx);
    const senha = await hashSenha(this);
    this.senha = senha;
  }

  static get relationMappings() {
    return {
      enderecos: {
        relation: Model.HasManyRelation,
        modelClass: Enderecos,
        join: {
          from: "usuarios.id",
          to: "usuario_enderecos.usr_id"
        }
      }
    };
  }
}

async function hashSenha({ senha }) {
  const hash = await bcrypt.hash(senha, 8);
  return hash;
}

module.exports = Usuarios;
