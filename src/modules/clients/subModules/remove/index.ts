import AbstractSubController from '../../../../tools/abstractions/subController.js';
import type { IRemoveClientDto } from './types.js';
import type { EClientActions, EControllers } from '../../../../enums/controllers.js';

export default class RemoveClientController extends AbstractSubController<EControllers.Clients, EClientActions.Remove> {
  async execute(data: IRemoveClientDto): Promise<void> {
    await this.repository.remove(data);
  }
}
