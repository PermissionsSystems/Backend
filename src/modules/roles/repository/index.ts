import Log from 'simpl-loggar';
import MemoryRoleRepository from './logic/memory.js';
import PostgresRoleRepository from './logic/postgres.js';
import { ETableNames } from '../../../enums/db.js';
import { NoRepositoryControllerSpecified } from '../../../errors/index.js';
import ConfigLoader from '../../../tools/config/index.js';
import type { IRoleRepository } from './types.js';
import type { IRoleEntity } from '../entity.js';

class RoleRepository implements IRoleRepository {
  constructor(repository: IRoleRepository) {
    this.repository = repository;
  }

  private accessor repository: IRoleRepository;

  async get(id: string): Promise<IRoleEntity | null> {
    return this.repository.get(id);
  }

  async getAll(page: number): Promise<IRoleEntity[]> {
    return this.repository.getAll(page);
  }
}

export default class RoleFacade {
  private constructor() {
    // empty
  }

  static createInstance(): IRoleRepository {
    const repositoryTarget = ConfigLoader.getConfig().repository;

    switch (repositoryTarget) {
      case 'memory':
        Log.debug('Controller', 'Creating in-memory database for roles');
        RoleFacade.instance = new RoleRepository(MemoryRoleRepository.createInstance());
        return RoleFacade.instance;
      case 'postgres':
        Log.debug('Controller', 'Creating postgres database for roles');
        RoleFacade.instance = new RoleRepository(new PostgresRoleRepository(ETableNames.Roles));
        return RoleFacade.instance;
      default:
        Log.error(
          'Controller',
          'No repository controller specified. Please specify type of controller in config files',
        );
        throw new NoRepositoryControllerSpecified();
    }
  }

  private static accessor instance: IRoleRepository | undefined = undefined;
}
