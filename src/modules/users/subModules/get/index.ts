import AbstractSubController from '../../../../tools/abstractions/subController.js';
import type GetUserDto from './dto.js';
import type { EControllers, EUserActions } from '../../../../enums/controllers.js';
import type { IUserEntity } from '../../entity.js';

export default class GetUserController extends AbstractSubController<EControllers.Users, EUserActions.Get> {
  async execute(data: GetUserDto): Promise<IUserEntity | null> {
    let user: IUserEntity | null = null;

    if (data.id) user = await this.repository.get(data.id);
    if (data.login) user = await this.repository.getByLogin(data.login);

    return user;
  }
}
