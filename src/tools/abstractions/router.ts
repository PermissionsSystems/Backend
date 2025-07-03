import express from 'express';
import * as errors from '../../errors/index.js';
import State from '../state.js';
import type AbstractController from './controller.js';
import type * as enums from '../../enums/index.js';
import type * as types from '../../types/index.js';

export default abstract class AbstractRouter<T extends enums.EControllers, N extends keyof types.IInnerController[T]> {
  readonly _router: express.Router;
  protected readonly _controller: types.IInnerController[T][N];

  constructor(target: T, subTarget: N) {
    this._router = express.Router();

    const controller = State.controllers.resolve(target) as AbstractController<T>;
    if (!controller) throw new errors.UnregisteredControllerError(target);

    const subController = controller.resolve(subTarget) as types.IInnerController[T][N];
    if (!subController) throw new errors.UnregisteredControllerError(subTarget as string);

    this._controller = subController;
  }

  get router(): express.Router {
    return this._router;
  }

  get controller(): types.IInnerController[T][N] {
    return this._controller;
  }
}
