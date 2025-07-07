import type * as enums from '../enums/index.js';
import type AuthController from '../modules/auth/controller.js';
import type CancelLoginSubController from '../modules/auth/subModules/cancelLogin/index.js';
import type GetLoginSubController from '../modules/auth/subModules/getLogin/index.js';
import type PostLoginSubController from '../modules/auth/subModules/postLogin/index.js';
import type ClientsController from '../modules/clients/controller.js';
import type AddClientSubController from '../modules/clients/subModules/add/index.js';
import type GetClientSubController from '../modules/clients/subModules/get/index.js';
import type RemoveClientSubController from '../modules/clients/subModules/remove/index.js';
import type HealthController from '../modules/health/controller.js';
import type GetHealthSubController from '../modules/health/subModules/get/index.js';
import type KeysController from '../modules/keys/controller.js';
import type AddKeySubController from '../modules/keys/subModules/add/index.js';
import type GetAllKeysSubController from '../modules/keys/subModules/getAll/index.js';
import type RemoveKeySubController from '../modules/keys/subModules/remove/index.js';
import type RolesController from '../modules/roles/controller.js';
import type GetRoleSubController from '../modules/roles/subModules/get/index.js';
import type GetAllRolesSubController from '../modules/roles/subModules/getAll/index.js';
import type UsersController from '../modules/users/controller.js';
import type AddUserSubController from '../modules/users/subModules/add/index.js';
import type GetUserSubController from '../modules/users/subModules/get/index.js';
import type GetAllUsersSubController from '../modules/users/subModules/getAll/index.js';
import type UpdateUserSubController from '../modules/users/subModules/update/index.js';

export type IControllerActions =
  | enums.EClientActions
  | enums.EUserActions
  | enums.EHealthActions
  | enums.EKeyActions
  | enums.EAuthActions
  | enums.ERoleActions;

type IControllerActionsMap = {
  [K in IControllerActions]: unknown;
};

export interface IUserControllers extends IControllerActionsMap {
  [enums.EUserActions.GetAll]: GetAllUsersSubController;
  [enums.EUserActions.Get]: GetUserSubController;
  [enums.EUserActions.Add]: AddUserSubController;
  [enums.EUserActions.Update]: UpdateUserSubController;
}

export interface IKeyControllers extends IControllerActionsMap {
  [enums.EKeyActions.GetAll]: GetAllKeysSubController;
  [enums.EKeyActions.Add]: AddKeySubController;
  [enums.EKeyActions.Remove]: RemoveKeySubController;
}

export interface IClientControllers extends IControllerActionsMap {
  [enums.EClientActions.Get]: GetClientSubController;
  [enums.EClientActions.Add]: AddClientSubController;
  [enums.EClientActions.Remove]: RemoveClientSubController;
}

export interface IHealthControllers extends IControllerActionsMap {
  [enums.EHealthActions.Get]: GetHealthSubController;
}

export interface IAuthControllers extends IControllerActionsMap {
  [enums.EAuthActions.GetLogin]: GetLoginSubController;
  [enums.EAuthActions.PostLogin]: PostLoginSubController;
  [enums.EAuthActions.CancelLogin]: CancelLoginSubController;
}

export interface IRoleControllers extends IControllerActionsMap {
  [enums.ERoleActions.Get]: GetRoleSubController;
  [enums.ERoleActions.GetAll]: GetAllRolesSubController;
}

export interface IController {
  [enums.EControllers.Users]: UsersController;
  [enums.EControllers.Roles]: RolesController;
  [enums.EControllers.Health]: HealthController;
  [enums.EControllers.Keys]: KeysController;
  [enums.EControllers.Clients]: ClientsController;
  [enums.EControllers.Auth]: AuthController;
}

export interface IInnerController {
  [enums.EControllers.Users]: IUserControllers;
  [enums.EControllers.Roles]: IRoleControllers;
  [enums.EControllers.Clients]: IClientControllers;
  [enums.EControllers.Auth]: IAuthControllers;
  [enums.EControllers.Health]: IHealthControllers;
  [enums.EControllers.Keys]: IKeyControllers;
}
