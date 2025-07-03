import AbstractSubController from '../../../../tools/abstractions/subController.js';
import type GetKeysDto from './dto.js';
import type { EControllers, EKeyActions } from '../../../../enums/controllers.js';
import type { IKeyEntity } from '../../entity.js';

export default class GetKeysController extends AbstractSubController<EControllers.Keys, EKeyActions.GetAll> {
  async execute(data: GetKeysDto): Promise<IKeyEntity[]> {
    return this.repository.getAll(data.page);
  }
}
