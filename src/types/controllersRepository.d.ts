import type { IControllerActions } from './controllers.js';
import type * as enums from '../enums/index.js';
import type { IClientRepository } from '../modules/clients/repository/types.js';
import type { IKeyRepository } from '../modules/keys/repository/types.js';
import type { IRoleRepository } from '../modules/roles/repository/types.js';
import type { IUserRepository } from '../modules/users/repository/types.js';

type IControllerActionsMap = {
  [K in IControllerActions]: unknown;
};

export interface IUserControllers extends IControllerActionsMap {
  [enums.EUserActions.GetAll]: IUserRepository;
  [enums.EUserActions.Get]: IUserRepository;
  [enums.EUserActions.Add]: IUserRepository;
  [enums.EUserActions.Update]: IUserRepository;
}

export interface IKeyControllers extends IControllerActionsMap {
  [enums.EKeyActions.GetAll]: IKeyRepository;
  [enums.EKeyActions.Add]: IKeyRepository;
  [enums.EKeyActions.Remove]: IKeyRepository;
}

export interface IClientControllers extends IControllerActionsMap {
  [enums.EClientActions.Get]: IClientRepository;
  [enums.EClientActions.Add]: IClientRepository;
  [enums.EClientActions.Remove]: IClientRepository;
}

export interface IAuthControllers extends IControllerActionsMap {
  [enums.EAuthActions.GetLogin]: IClientRepository;
  [enums.EAuthActions.PostLogin]: {
    userRepo: IUserRepository;
    keysRepo: IKeyRepository;
    clientsRepo: IClientRepository;
  };
}

export interface IRoleControllers extends IControllerActionsMap {
  [enums.ERoleActions.Get]: IRoleRepository;
  [enums.ERoleActions.GetAll]: IRoleRepository;
}

export type IHealthControllers = IControllerActionsMap;

export interface IControllersRepository {
  [enums.EControllers.Users]: IUserControllers;
  [enums.EControllers.Roles]: IRoleControllers;
  [enums.EControllers.Clients]: IClientControllers;
  [enums.EControllers.Auth]: IAuthControllers;
  [enums.EControllers.Health]: IHealthControllers;
  [enums.EControllers.Keys]: IKeyControllers;
}
