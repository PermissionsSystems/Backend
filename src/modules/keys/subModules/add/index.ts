import AbstractSubController from '../../../../tools/abstractions/subController.js';
import type { IAddKeyDto } from './types.js';
import type { EControllers, EKeyActions } from '../../../../enums/controllers.js';
import type { IKeyEntity } from '../../entity.js';

export default class AddKeyController extends AbstractSubController<EControllers.Keys, EKeyActions.Add> {
  async execute(data: IAddKeyDto): Promise<IKeyEntity> {
    return this.repository.add(data);
  }
}
