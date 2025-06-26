import KeyRepository from './repository/index.js';
import * as enums from '../../enums/index.js';
import AddController from './subModules/add/index.js';
import GetAllController from './subModules/getAll/index.js';
import RemoveController from './subModules/remove/index.js';
import AbstractController from '../../tools/abstractions/controller.js';

export default class KeysController extends AbstractController<enums.EControllers.Keys> {
  /**
   * Register keys controllers.
   * @returns Void.
   */
  protected init(): void {
    const keyRepo = KeyRepository.createInstance();

    this.register(enums.EKeyActions.GetAll, new GetAllController(keyRepo));
    this.register(enums.EKeyActions.Add, new AddController(keyRepo));
    this.register(enums.EKeyActions.Remove, new RemoveController(keyRepo));
  }
}
