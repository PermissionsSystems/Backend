import { RepositoryPostgresFactory } from '../../../../tools/abstractions/repository.js';
import State from '../../../../tools/state.js';
import type * as enums from '../../../../enums/index.js';
import type { IClientEntity } from '../../entity.js';
import type { IRemoveClientDto } from '../../subModules/remove/types.js';
import type { IClientRepository } from '../types.js';

export default class ClientPostgresRepository
  extends RepositoryPostgresFactory<enums.EControllers.Clients>
  implements IClientRepository
{
  async remove(data: IRemoveClientDto): Promise<void> {
    await State.postgres.getClient()<IClientEntity>(this.target).where('name', data.client).delete();
  }

  async getByClient(name: string): Promise<IClientEntity | undefined> {
    const data = await State.postgres.getClient()<IClientEntity>(this.target).where('name', name);

    return data[0];
  }
}
