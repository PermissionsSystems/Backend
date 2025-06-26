import Log from 'simpl-loggar';
import MemoryKeyRepository from './logic/memory.js';
import PostgresKeyRepository from './logic/postgres.js';
import { ETableNames } from '../../../enums/db.js';
import { NoRepositoryControllerSpecified } from '../../../errors/index.js';
import ConfigLoader from '../../../tools/config/index.js';
import type { IKeyRepository } from './types.js';
import type { IKeyEntity } from '../entity.js';
import type { IAddKeyDto } from '../subModules/add/types.js';
import type { IRemoveKeyDto } from '../subModules/remove/types.js';

class KeyRepository implements IKeyRepository {
  constructor(repository: IKeyRepository) {
    this.repository = repository;
  }

  private accessor repository: IKeyRepository;

  async getAll(page: number): Promise<IKeyEntity[]> {
    return this.repository.getAll(page);
  }

  async add(data: IAddKeyDto): Promise<IKeyEntity> {
    return this.repository.add(data);
  }

  async remove(data: IRemoveKeyDto): Promise<void> {
    return this.repository.remove(data);
  }
}

export default class KeyFacade {
  private constructor() {
    // empty
  }

  static createInstance(): IKeyRepository {
    const repositoryTarget = ConfigLoader.getConfig().repository;

    switch (repositoryTarget) {
      case 'memory':
        Log.debug('Controller', 'Creating in-memory database');
        KeyFacade.instance = new KeyRepository(new MemoryKeyRepository());
        return KeyFacade.instance;
      case 'postgres':
        Log.debug('Controller', 'Creating postgres database');
        KeyFacade.instance = new KeyRepository(new PostgresKeyRepository(ETableNames.Keys));
        return KeyFacade.instance;
      default:
        Log.error(
          'Controller',
          'No repository controller specified. Please specify type of controller in config files',
        );
        throw new NoRepositoryControllerSpecified();
    }
  }

  private static accessor instance: IKeyRepository | undefined = undefined;
}
