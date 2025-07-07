import AbstractSubController from '../../../../tools/abstractions/subController.js';
import type GetRoleDto from './dto.js';
import type { EControllers, ERoleActions } from '../../../../enums/controllers.js';
import type { IRoleEntity } from '../../entity.js';

export default class GetRoleController extends AbstractSubController<EControllers.Roles, ERoleActions.Get> {
  async execute(data: GetRoleDto): Promise<IRoleEntity | null> {
    return this.repository.get(data.id);
  }
}
