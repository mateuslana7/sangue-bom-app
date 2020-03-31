
exports.up = function(knex) {
    return knex.schema.createTable('exame', function(table){
        table.increments();

        table.date('dataExame').notNullable();
        table.decimal('valorHdl').notNullable();
        table.decimal('valorLdl').notNullable();
        table.string('consultorio').notNullable();

        table.string('usuario_id').notNullable();

        table.foreign('usuario_id').references('id').inTable('usuario');
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable('exame');
};
