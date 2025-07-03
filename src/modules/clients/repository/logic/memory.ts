import { RepositoryMemoryFactory } from '../../../../tools/abstractions/repository.js';
import type * as enums from '../../../../enums/index.js';
import type { IClientEntity } from '../../entity.js';
import type { IRemoveClientDto } from '../../subModules/remove/types.js';
import type { IClientRepository } from '../types.js';

export default class ClientMemoryRepository
  extends RepositoryMemoryFactory<enums.EControllers.Clients>
  implements IClientRepository
{
  async remove(_data: IRemoveClientDto): Promise<void> {
    return new Promise((resolve) => {
      resolve();
    });
  }

  async getByClient(_name: string): Promise<IClientEntity | undefined> {
    return new Promise((resolve) => {
      resolve(undefined);
    });
  }
}
