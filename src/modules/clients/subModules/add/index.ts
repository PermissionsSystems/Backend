import AbstractSubController from '../../../../tools/abstractions/subController.js';
import type { IAddClientDto } from './types.js';
import type { EClientActions, EControllers } from '../../../../enums/controllers.js';
import type { IClientEntity } from '../../entity.js';

export default class AddClientController extends AbstractSubController<EControllers.Clients, EClientActions.Add> {
  async execute(data: IAddClientDto): Promise<IClientEntity> {
    return this.repository.add(data);
  }
}
