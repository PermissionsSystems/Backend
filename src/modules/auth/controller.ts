import * as enums from '../../enums/index.js';
import LoginController from './subModules/postLogin/index.js';
import AbstractController from '../../tools/abstractions/controller.js';
import UserRepository from '../users/repository/index.js';
import CancelLoginController from './subModules/cancelLogin/index.js';
import GetLoginController from './subModules/getLogin/index.js';
import ClientRepository from '../clients/repository/index.js';
import KeyRepository from '../keys/repository/index.js';

export default class AuthController extends AbstractController<enums.EControllers.Auth> {
  /**
   * Register auth controllers.
   * @returns Void.
   */
  protected init(): void {
    const userRepo = UserRepository.createInstance();
    const clientsRepo = ClientRepository.createInstance();
    const keysRepo = KeyRepository.createInstance();

    this.register(enums.EAuthActions.CancelLogin, new CancelLoginController(undefined));
    this.register(enums.EAuthActions.PostLogin, new LoginController({ userRepo, keysRepo, clientsRepo }));
    this.register(enums.EAuthActions.GetLogin, new GetLoginController(clientsRepo));
  }
}
