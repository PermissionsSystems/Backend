import AbstractSubController from '../../../../tools/abstractions/subController.js';
import type GetAllRolesDto from './dto.js';
import type { EControllers, ERoleActions } from '../../../../enums/controllers.js';
import type { IRoleEntity } from '../../entity.js';

export default class GetAllRolesController extends AbstractSubController<EControllers.Roles, ERoleActions.GetAll> {
  async execute(data: GetAllRolesDto): Promise<IRoleEntity[]> {
    return this.repository.getAll(data.page);
  }
}
