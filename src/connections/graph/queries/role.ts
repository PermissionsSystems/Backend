import { GraphQLList, GraphQLInt, GraphQLString } from 'graphql';
import { EControllers, ERoleActions } from '../../../enums/controllers.js';
import GetRoleDto from '../../../modules/roles/subModules/get/dto.js';
import GetAllRolesDto from '../../../modules/roles/subModules/getAll/dto.js';
import getController from '../../router/utils/controllers.js';
import * as schemas from '../schemas/index.js';
import { filterError } from '../utils/errors.js';
import type { IRoleEntity } from '../../../modules/roles/entity.js';
import type { IGetRoleDto } from '../../../modules/roles/subModules/get/types.js';
import type { IGetAllRolesDto } from '../../../modules/roles/subModules/getAll/types.js';
import type { IFullError, IFullRawError } from '../../../types/errors.js';

export const roles = {
  type: new GraphQLList(schemas.RoleType),
  args: {
    page: { type: GraphQLInt },
  },
  resolve: async (_: unknown, args: IGetAllRolesDto): Promise<IRoleEntity[]> => {
    try {
      const controller = getController(EControllers.Roles, ERoleActions.GetAll);

      return controller.execute(new GetAllRolesDto(args));
    } catch (err) {
      filterError(err as IFullError | IFullRawError);

      return [];
    }
  },
};

export const role = {
  type: new GraphQLList(schemas.RoleType),
  args: {
    id: { type: GraphQLString },
  },
  resolve: async (_: unknown, args: IGetRoleDto): Promise<IRoleEntity | null> => {
    try {
      const controller = getController(EControllers.Roles, ERoleActions.Get);

      return controller.execute(new GetRoleDto(args));
    } catch (err) {
      filterError(err as IFullError | IFullRawError);

      return null;
    }
  },
};
