import type { IRemoveKeyDto } from './types.js';
import type { IAbstractSubController } from '../../../../types/index.js';
import type { IKeyRepository } from '../../repository/types.js';

export default class RemoveKeyController implements IAbstractSubController<void> {
  constructor(repo: IKeyRepository) {
    this.repo = repo;
  }

  private accessor repo: IKeyRepository;

  async execute(data: IRemoveKeyDto): Promise<void> {
    return this.repo.remove(data);
  }
}
