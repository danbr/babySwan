import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('usersbalance', (t) => {
        t.increments('id').primary().notNullable();
        t.integer('userid').notNullable().unique().references('id').inTable('users');
        t.decimal('amount', 8, 8).defaultTo(0);
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('usersbalance');
}

