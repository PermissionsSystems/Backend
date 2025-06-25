import * as errors from '../../../../errors/index.js';
import type AddUserDto from './dto.js';
import type { IAbstractSubController } from '../../../../types/index.js';
import type { IUserEntity } from '../../entity.js';
import type { IUserRepository } from '../../repository/types.js';

export default class AddUserController implements IAbstractSubController<IUserEntity> {
  constructor(repo: IUserRepository) {
    this.repo = repo;
  }

  private accessor repo: IUserRepository;

  async execute(data: AddUserDto): Promise<IUserEntity> {
    const existByLogin = await this.repo.getByLogin(data.login);
    const existByEmail = await this.repo.getByEmail(data.email);

    // This is really stupid, but ci/cd for some reason cannot remove data from db. Fix it later...
    if ((existByLogin?.id?.toString()?.length ?? 0) > 0 || (existByEmail?.id?.toString()?.length ?? 0) > 0) {
      throw new errors.UserAlreadyRegistered();
    }

    return this.repo.add(data);
  }
}
