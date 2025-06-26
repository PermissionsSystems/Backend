import { RepositoryMemoryFactory } from '../../../../tools/abstractions/repository.js';
import type * as enums from '../../../../enums/index.js';
import type { IRemoveKeyDto } from '../../subModules/remove/types.js';
import type { IKeyRepository } from '../types.js';

export default class KeyMemoryRepository
  extends RepositoryMemoryFactory<enums.EControllers.Keys>
  implements IKeyRepository
{
  async remove(_data: IRemoveKeyDto): Promise<void> {
    return new Promise((resolve) => {
      resolve();
    });
  }
}
