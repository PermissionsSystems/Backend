import AbstractSubController from '../../../../tools/abstractions/subController.js';
import State from '../../../../tools/state.js';
import type { IGetHealth } from './types.js';
import type { EControllers, EHealthActions } from '../../../../enums/controllers.js';
import { uptime } from 'process';

export default class GetHealthController extends AbstractSubController<EControllers.Health, EHealthActions.Get> {
  async execute(): Promise<IGetHealth> {
    return new Promise((resolve) => {
      resolve({ alive: State.alive, upTime: Number(uptime().toFixed(0)) });
    });
  }
}
