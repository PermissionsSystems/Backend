import { ETableNames } from '../../enums/index.js';
import type knex from 'knex';

export const up = async (knex: knex.Knex): Promise<void> => {
  await knex.schema.createTable(ETableNames.Keys, (table) => {
    table.increments('id').primary();
    table.string('kty');
    table.string('n', 350);
    table.string('e', 350);
    table.string('d', 350);
    table.string('p', 350);
    table.string('q', 350);
    table.string('dp', 350);
    table.string('dq', 350);
    table.string('qi', 350);
    table.date('createdAt').defaultTo(new Date().toISOString());
  });
};

export const down = async (knex: knex.Knex): Promise<void> => {
  return knex.schema.dropTableIfExists(ETableNames.Keys);
};
