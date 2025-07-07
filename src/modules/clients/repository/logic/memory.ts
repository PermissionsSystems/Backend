import { RepositoryMemoryFactory } from '../../../../tools/abstractions/repository.js';
import type * as enums from '../../../../enums/index.js';
import type { IClientEntity } from '../../entity.js';
import type { IRemoveClientDto } from '../../subModules/remove/types.js';
import type { IClientRepository } from '../types.js';

export default class ClientMemoryRepository
  extends RepositoryMemoryFactory<enums.EControllers.Clients>
  implements IClientRepository
{
  private constructor() {
    super();
  }

  static createInstance(): ClientMemoryRepository {
    if (ClientMemoryRepository.instance) return ClientMemoryRepository.instance;

    ClientMemoryRepository.instance = new ClientMemoryRepository();
    return ClientMemoryRepository.instance;
  }

  private static accessor instance: ClientMemoryRepository | undefined = undefined;

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
