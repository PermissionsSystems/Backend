import type { IAddKeyDto } from './types.js';
import type { IAbstractSubController } from '../../../../types/index.js';
import type { IKeyEntity } from '../../entity.js';
import type { IKeyRepository } from '../../repository/types.js';

export default class AddKeyController implements IAbstractSubController<IKeyEntity> {
  constructor(repo: IKeyRepository) {
    this.repo = repo;
  }

  private accessor repo: IKeyRepository;

  async execute(data: IAddKeyDto): Promise<IKeyEntity> {
    return this.repo.add(data);
  }
}
