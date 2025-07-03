import { ETableNames } from '../../enums/index.js';
import type knex from 'knex';

export const up = async (knex: knex.Knex): Promise<void> => {
  await knex.schema.createTable(ETableNames.Clients, (table) => {
    table.increments('id').primary();
    table.string('name').unique();
    table.string('redirectUrl');
    table.string('failRedirectUrl');
  });

  knex.schema.raw(
    `INSERT INTO \`${ETableNames.Clients}\` VALUES (NULL, 'test', 'http://localhost:5002/login/success', 'http://localhost:5002/login/fail');`,
  );
};

export const down = async (knex: knex.Knex): Promise<void> => {
  return knex.schema.dropTableIfExists(ETableNames.Clients);
};
