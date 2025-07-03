import AbstractSubController from '../../../../tools/abstractions/subController.js';
import type { IRemoveKeyDto } from './types.js';
import type { EControllers, EKeyActions } from '../../../../enums/controllers.js';

export default class RemoveKeyController extends AbstractSubController<EControllers.Keys, EKeyActions.Remove> {
  async execute(data: IRemoveKeyDto): Promise<void> {
    return this.repository.remove(data);
  }
}
