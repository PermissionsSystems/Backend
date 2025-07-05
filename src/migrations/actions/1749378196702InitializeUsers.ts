import { ETableNames } from '../../enums/index.js';
import type knex from 'knex';

export const up = async (knex: knex.Knex): Promise<void> => {
  return knex.schema.createTable(ETableNames.Users, (table) => {
    table.increments('id').primary();
    table.string('login').unique();
    table.string('password');
  });
};

export const down = async (knex: knex.Knex): Promise<void> => {
  return knex.schema.dropTableIfExists(ETableNames.Users);
};
