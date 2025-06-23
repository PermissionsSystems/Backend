import { GraphQLList, GraphQLInt } from 'graphql';
import * as schemas from '../schemas/index.js';
import { filterError } from '../utils/errors.js';
import type { IRoleEntity } from '../../../modules/roles/entity.js';
import type { IGetAllRolesDto } from '../../../modules/roles/subModules/getAll/types.js';
import type { IFullError, IFullRawError } from '../../../types/errors.js';

// eslint-disable-next-line import/prefer-default-export
export const roles = {
  type: new GraphQLList(schemas.RoleType),
  args: {
    page: { type: GraphQLInt },
  },
  resolve: async (_: unknown, _args: IGetAllRolesDto): Promise<IRoleEntity[]> => {
    try {
      // This is just a placeholder
      return new Promise((resolve) => {
        resolve([]);
      });
    } catch (err) {
      filterError(err as IFullError | IFullRawError);

      return [];
    }
  },
};
