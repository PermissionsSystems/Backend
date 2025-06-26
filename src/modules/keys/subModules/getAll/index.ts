import type GetKeysDto from './dto.js';
import type { IAbstractSubController } from '../../../../types/index.js';
import type { IKeyEntity } from '../../entity.js';
import type { IKeyRepository } from '../../repository/types.js';

export default class GetKeysController implements IAbstractSubController<IKeyEntity[]> {
  constructor(repo: IKeyRepository) {
    this.repo = repo;
  }

  private accessor repo: IKeyRepository;

  async execute(data: GetKeysDto): Promise<IKeyEntity[]> {
    return this.repo.getAll(data.page);
  }
}
