import Log from 'simpl-loggar';
import MemoryClientRepository from './logic/memory.js';
import PostgresClientRepository from './logic/postgres.js';
import { ETableNames } from '../../../enums/db.js';
import { NoRepositoryControllerSpecified } from '../../../errors/index.js';
import ConfigLoader from '../../../tools/config/index.js';
import type { IClientRepository } from './types.js';
import type { IClientEntity } from '../entity.js';
import type { IAddClientDto } from '../subModules/add/types.js';
import type { IRemoveClientDto } from '../subModules/remove/types.js';

class ClientRepository implements IClientRepository {
  constructor(repository: IClientRepository) {
    this.repository = repository;
  }

  private accessor repository: IClientRepository;

  async getAll(page: number): Promise<IClientEntity[]> {
    return this.repository.getAll(page);
  }

  async add(data: IAddClientDto): Promise<IClientEntity> {
    return this.repository.add(data);
  }

  async remove(data: IRemoveClientDto): Promise<void> {
    return this.repository.remove(data);
  }

  async getByClient(name: string): Promise<IClientEntity | undefined> {
    return this.repository.getByClient(name);
  }
}

export default class ClientFacade {
  private constructor() {
    // empty
  }

  static createInstance(): IClientRepository {
    const repositoryTarget = ConfigLoader.getConfig().repository;

    switch (repositoryTarget) {
      case 'memory':
        Log.debug('Controller', 'Creating in-memory database');
        ClientFacade.instance = new ClientRepository(new MemoryClientRepository());
        return ClientFacade.instance;
      case 'postgres':
        Log.debug('Controller', 'Creating postgres database for clients');
        ClientFacade.instance = new ClientRepository(new PostgresClientRepository(ETableNames.Clients));
        return ClientFacade.instance;
      default:
        Log.error(
          'Controller',
          'No repository controller specified. Please specify type of controller in config files for clients',
        );
        throw new NoRepositoryControllerSpecified();
    }
  }

  private static accessor instance: IClientRepository | undefined = undefined;
}
