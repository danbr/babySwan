import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (t) => {
        t.increments('id').primary().notNullable();
        t.string('username').notNullable().unique();
        t.string('password').notNullable();
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}

