import { RepositoryMemoryFactory } from '../../../../tools/abstractions/repository.js';
import type * as enums from '../../../../enums/index.js';
import type { IRoleRepository } from '../types.js';

export default class RoleMemoryRepository
  extends RepositoryMemoryFactory<enums.EControllers.Roles>
  implements IRoleRepository
{
  private constructor() {
    super();
  }

  static createInstance(): RoleMemoryRepository {
    if (RoleMemoryRepository.instance) return RoleMemoryRepository.instance;

    RoleMemoryRepository.instance = new RoleMemoryRepository();
    return RoleMemoryRepository.instance;
  }

  private static accessor instance: RoleMemoryRepository | undefined = undefined;
}
