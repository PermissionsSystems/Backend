import ClientsRepository from './repository/index.js';
import * as enums from '../../enums/index.js';
import AddController from './subModules/add/index.js';
import GetController from './subModules/get/index.js';
import RemoveController from './subModules/remove/index.js';
import AbstractController from '../../tools/abstractions/controller.js';

export default class ClientsController extends AbstractController<enums.EControllers.Clients> {
  /**
   * Register clients controllers.
   * @returns Void.
   */
  protected init(): void {
    const repo = ClientsRepository.createInstance();

    this.register(enums.EClientActions.Add, new AddController(repo));
    this.register(enums.EClientActions.Remove, new RemoveController(repo));
    this.register(enums.EClientActions.Get, new GetController(repo));
  }
}
