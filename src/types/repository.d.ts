import type * as enums from '../enums/index.js';
import type { IClientEntity } from '../modules/clients/entity.js';
import type { IAddClientDto } from '../modules/clients/subModules/add/types.js';
import type { IKeyEntity } from '../modules/keys/entity.js';
import type { IAddKeyDto } from '../modules/keys/subModules/add/types.js';
import type { IUserEntity } from '../modules/users/entity.js';
import type { IAddUserDto } from '../modules/users/subModules/add/types.js';

export type ERepositoryTargets = Exclude<enums.EControllers, enums.EControllers.Health | enums.EControllers.Auth>;

export interface IRepositoryAddData {
  [enums.EControllers.Users]: IAddUserDto;
  [enums.EControllers.Keys]: IAddKeyDto;
  [enums.EControllers.Clients]: IAddClientDto;
}

export interface IRepositoryGetData {
  [enums.EControllers.Users]: IUserEntity | null;
  [enums.EControllers.Keys]: IKeyEntity | null;
  [enums.EControllers.Clients]: IClientEntity | null;
}

export interface IRepositoryGetAllData {
  [enums.EControllers.Users]: IUserEntity[];
  [enums.EControllers.Keys]: IKeyEntity[];
  [enums.EControllers.Clients]: IClientEntity[];
}

export interface IRepositoryUpdateData {
  [enums.EControllers.Users]: Partial<IUserEntity>;
  [enums.EControllers.Keys]: Partial<IKeyEntity>;
  [enums.EControllers.Clients]: Partial<IClientEntity>;
}

export interface IRepositoryGetFull {
  [enums.EControllers.Users]: IUserEntity;
  [enums.EControllers.Keys]: IKeyEntity;
  [enums.EControllers.Clients]: IClientEntity;
}

export interface IAbstractRepository<Z extends ERepositoryTargets> {
  add(data: unknown): Promise<IRepositoryGetFull[Z]>;
  get(data: unknown): Promise<IRepositoryGetData[Z]>;
  getAll(page: number): Promise<IRepositoryGetAllData[Z]>;
  update(id: string, data: IRepositoryUpdateData[Z]): Promise<IRepositoryGetFull[Z]>;
}
