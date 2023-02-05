import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('usersaddresses', (t) => {
        t.increments('id').primary().notNullable();
        t.integer('userid')
        .notNullable()
        .unique()
        .references('id')
        .inTable('users');
        t.text('receiveaddress').notNullable().unique();
        t.text('changeaddress').notNullable().unique();
  });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('usersaddresses');
}

