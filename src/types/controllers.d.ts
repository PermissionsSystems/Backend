import type * as enums from '../enums/index.js';
import type HealthController from '../modules/health/controller.ts';
import type GetHealthController from '../modules/health/subModules/get/index.ts';

export type IControllerActions = enums.EHealthActions;

type IControllerActionsMap = {
  [K in IControllerActions]: unknown;
};

export interface IHealthControllers extends IControllerActionsMap {
  [enums.EHealthActions.Get]: GetHealthController;
}

export interface IController {
  [enums.EControllers.Health]: HealthController;
}

export interface IInnerController {
  [enums.EControllers.Health]: IHealthControllers;
}
