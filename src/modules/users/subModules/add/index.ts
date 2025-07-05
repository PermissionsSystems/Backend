import { hashPassword } from './utils.js';
import * as errors from '../../../../errors/index.js';
import AbstractSubController from '../../../../tools/abstractions/subController.js';
import { generateRandomName } from '../../../../utils/index.js';
import type AddUserDto from './dto.js';
import type { EControllers, EUserActions } from '../../../../enums/controllers.js';
import type { IUserEntity } from '../../entity.js';

export default class AddUserController extends AbstractSubController<EControllers.Users, EUserActions.Add> {
  async execute(data: AddUserDto): Promise<IUserEntity> {
    const existByLogin = await this.repository.getByLogin(data.login);

    // This is really stupid, but ci/cd for some reason cannot remove data from db. Fix it later...
    if ((existByLogin?.id?.toString()?.length ?? 0) > 0) {
      throw new errors.UserAlreadyRegistered();
    }

    return this.repository.add({ ...data, password: hashPassword(data.password ?? generateRandomName(20)) });
  }
}
