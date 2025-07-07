import { RepositoryMemoryFactory } from '../../../../tools/abstractions/repository.js';
import type * as enums from '../../../../enums/index.js';
import type { IUserEntity } from '../../entity.js';
import type { IUserRepository } from '../types.js';

export default class UserMemoryRepository
  extends RepositoryMemoryFactory<enums.EControllers.Users>
  implements IUserRepository
{
  private constructor() {
    super();
  }

  static createInstance(): UserMemoryRepository {
    if (UserMemoryRepository.instance) return UserMemoryRepository.instance;

    UserMemoryRepository.instance = new UserMemoryRepository();
    return UserMemoryRepository.instance;
  }

  private static accessor instance: UserMemoryRepository | undefined = undefined;

  async getByLogin(_data: string): Promise<IUserEntity | null> {
    return new Promise((resolve) => {
      resolve({ login: '', id: 0, password: 'password' });
    });
  }
}
