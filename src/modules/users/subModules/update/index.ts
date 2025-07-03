import { NoUserRegistered } from '../../../../errors/index.js';
import AbstractSubController from '../../../../tools/abstractions/subController.js';
import type UpdateUserDto from './dto.js';
import type { EControllers, EUserActions } from '../../../../enums/controllers.js';
import type { IUserEntity } from '../../entity.js';

export default class UpdateUserController extends AbstractSubController<EControllers.Users, EUserActions.Update> {
  async execute(userId: string, data: UpdateUserDto): Promise<IUserEntity> {
    const exist = await this.repository.get(userId);

    if (!exist) throw new NoUserRegistered();

    await this.repository.update(userId, data);
    return this.repository.get(userId) as Promise<IUserEntity>;
  }
}
