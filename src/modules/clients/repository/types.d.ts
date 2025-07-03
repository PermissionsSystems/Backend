import type { IClientEntity } from '../entity.js';
import type { IAddClientDto } from '../subModules/add/types.js';
import type { IRemoveClientDto } from '../subModules/remove/types.js';

export interface IClientRepository {
  add(data: IAddClientDto): Promise<IClientEntity>;
  getAll(page: number): Promise<IClientEntity[]>;
  getByClient(client: string): Promise<IClientEntity | undefined>;
  remove(data: IRemoveClientDto): Promise<void>;
}
