import { RepositoryPostgresFactory } from '../../../../tools/abstractions/repository.js';
import State from '../../../../tools/state.js';
import type * as enums from '../../../../enums/index.js';
import type { IKeyEntity } from '../../../keys/entity.js';
import type { IRemoveKeyDto } from '../../subModules/remove/types.js';
import type { IKeyRepository } from '../types.js';

export default class KeyPostgresRepository
  extends RepositoryPostgresFactory<enums.EControllers.Keys>
  implements IKeyRepository
{
  async remove(data: IRemoveKeyDto): Promise<void> {
    await State.postgres.getClient()<IKeyEntity>(this.target).where('id', data.id).delete();
  }
}
