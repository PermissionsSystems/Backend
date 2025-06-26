import type * as enums from '../enums/index.js';
import type { IKeyEntity } from '../modules/keys/entity.js';
import type { IAddKeyDto } from '../modules/keys/subModules/add/types.js';
import type { IUserEntity } from '../modules/users/entity.js';
import type { IAddUserDto } from '../modules/users/subModules/add/types.js';

export interface IRepositoryAddData {
  [enums.EControllers.Users]: IAddUserDto;
  [enums.EControllers.Keys]: IAddKeyDto;
}

export interface IRepositoryGetData {
  [enums.EControllers.Users]: IUserEntity | null;
  [enums.EControllers.Keys]: IKeyEntity | null;
}

export interface IRepositoryGetAllData {
  [enums.EControllers.Users]: IUserEntity[];
  [enums.EControllers.Keys]: IKeyEntity[];
}

export interface IRepositoryUpdateData {
  [enums.EControllers.Users]: Partial<IUserEntity>;
  [enums.EControllers.Keys]: Partial<IKeyEntity>;
}

export interface IRepositoryGetFull {
  [enums.EControllers.Users]: IUserEntity;
  [enums.EControllers.Keys]: IKeyEntity;
}

export interface IAbstractRepository<Z extends Exclude<enums.EControllers, enums.EControllers.Health>> {
  add(data: unknown): Promise<IRepositoryGetFull[Z]>;
  get(data: unknown): Promise<IRepositoryGetData[Z]>;
  getAll(page: number): Promise<IRepositoryGetAllData[Z]>;
  update(id: string, data: IRepositoryUpdateData[Z]): Promise<IRepositoryGetFull[Z]>;
}
