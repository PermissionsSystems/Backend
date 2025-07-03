import AbstractSubController from '../../../../tools/abstractions/subController.js';
import type GetUserDto from './dto.js';
import type { EControllers, EUserActions } from '../../../../enums/controllers.js';
import type { IUserEntity } from '../../entity.js';

export default class GetUserController extends AbstractSubController<EControllers.Users, EUserActions.GetAll> {
  async execute(data: GetUserDto): Promise<IUserEntity[]> {
    return this.repository.getAll(data.page);
  }
}
