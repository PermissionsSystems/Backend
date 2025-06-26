import type { IKeyEntity } from '../entity.js';
import type { IAddKeyDto } from '../subModules/add/types.js';
import type { IRemoveKeyDto } from '../subModules/remove/types.js';

export interface IKeyRepository {
  add(data: IAddKeyDto): Promise<IKeyEntity>;
  getAll(page: number): Promise<IKeyEntity[]>;
  remove(data: IRemoveKeyDto): Promise<void>;
}
