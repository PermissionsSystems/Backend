import Log from 'simpl-loggar';
import { ETableNames } from '../../enums/index.js';
import { hashPassword } from '../../modules/users/subModules/add/utils.js';
import { generateRandomName } from '../../utils/index.js';
import type knex from 'knex';

export const up = async (knex: knex.Knex): Promise<void> => {
  const password = generateRandomName(15);
  Log.log(
    'Migrations',
    `Created new admin user with password ${password}. Please change this password. This will be shown only once`,
  );

  return knex(ETableNames.Users).insert({
    login: 'admin',
    password: hashPassword(password),
  });
};

export const down = async (knex: knex.Knex): Promise<void> => {
  return knex(ETableNames.Users).where('login', 'admin').delete();
};
