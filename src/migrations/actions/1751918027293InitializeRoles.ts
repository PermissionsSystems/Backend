import { ETableNames } from '../../enums/index.js';
import type knex from 'knex';

export const up = async (knex: knex.Knex): Promise<void> => {
  return knex.schema.createTable(ETableNames.Roles, (table) => {
    table.increments('id').primary();
    table.string('name');
    table.integer('level');
    table.boolean('inheritance');
    table.string('tags');
    table.string('subId');
  });
};

export const down = async (knex: knex.Knex): Promise<void> => {
  return knex.schema.dropTableIfExists(ETableNames.Roles);
};
