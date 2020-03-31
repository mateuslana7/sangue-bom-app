exports.up = function(knex) {
  return knex.schema.createTable('usuario', function(table){
    table.string('id').primary();
    table.string('nome').notNullable();
    table.date('dataNasc').notNullable();
    table.decimal('peso').notNullable();
    table.char('sexo').notNullable();
    table.string('tipoSang').notNullable();
    table.string('nomeUsuario').notNullable();
    table.string('email').notNullable();
    table.string('senha').notNullable();
  });
};

exports.down = function(knex) {
    return knex.schema.dropTable('usuario');
};
