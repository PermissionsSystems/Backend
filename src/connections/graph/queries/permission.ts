import { GraphQLList, GraphQLInt } from 'graphql';
import * as schemas from '../schemas/index.js';
import { filterError } from '../utils/errors.js';
import type { IPermissionEntity } from '../../../modules/permissions/entity.js';
import type { IGetAllPermissionsDto } from '../../../modules/permissions/subModules/getAll/types.js';
import type { IFullError, IFullRawError } from '../../../types/errors.js';

// eslint-disable-next-line import/prefer-default-export
export const permissions = {
  type: new GraphQLList(schemas.PermissionType),
  args: {
    page: { type: GraphQLInt },
  },
  resolve: async (_: unknown, _args: IGetAllPermissionsDto): Promise<IPermissionEntity[]> => {
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
