import { ETableNames } from '../../enums/index.js';
import type knex from 'knex';

export const up = async (knex: knex.Knex): Promise<void> => {
  await knex.schema.createTable(ETableNames.Clients, (table) => {
    table.increments('id').primary();
    table.string('name').unique();
    table.string('redirectUrl');
    table.string('failRedirectUrl');
  });

  await knex(ETableNames.Clients).insert({
    name: 'test',
    redirectUrl: 'http://localhost:5002/login/success',
    failRedirectUrl: 'http://localhost:5002/login/fail',
  });
};

export const down = async (knex: knex.Knex): Promise<void> => {
  return knex.schema.dropTableIfExists(ETableNames.Clients);
};
