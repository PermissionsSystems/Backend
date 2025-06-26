import type * as enums from '../enums/index.js';
import type HealthController from '../modules/health/controller.ts';
import type GetHealthController from '../modules/health/subModules/get/index.ts';
import type KeysController from '../modules/keys/controller.ts';
import type AddKeySubController from '../modules/keys/subModules/add/index.js';
import type GetAllKeysSubController from '../modules/keys/subModules/getAll/index.js';
import type RemoveKeySubController from '../modules/keys/subModules/remove/index.ts';
import type UsersController from '../modules/users/controller.js';
import type AddUserSubController from '../modules/users/subModules/add/index.js';
import type GetUserSubController from '../modules/users/subModules/get/index.js';
import type GetAllUsersSubController from '../modules/users/subModules/getAll/index.js';
import type UpdateUserSubController from '../modules/users/subModules/update/index.js';

export type IControllerActions = enums.EUserActions | enums.EHealthActions | enums.EKeyActions;

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

export interface IHealthControllers extends IControllerActionsMap {
  [enums.EHealthActions.Get]: GetHealthController;
}

export interface IController {
  [enums.EControllers.Users]: UsersController;
  [enums.EControllers.Health]: HealthController;
  [enums.EControllers.Keys]: KeysController;
}

export interface IInnerController {
  [enums.EControllers.Users]: IUserControllers;
  [enums.EControllers.Health]: IHealthControllers;
  [enums.EControllers.Keys]: IKeyControllers;
}
