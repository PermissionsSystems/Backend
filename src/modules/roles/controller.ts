import RoleRepository from './repository/index.js';
import * as enums from '../../enums/index.js';
import GetController from './subModules/get/index.js';
import GetAllController from './subModules/getAll/index.js';
import AbstractController from '../../tools/abstractions/controller.js';

export default class RolesController extends AbstractController<enums.EControllers.Roles> {
  /**
   * Register roles controllers.
   * @returns Void.
   */
  protected init(): void {
    const rolesRepo = RoleRepository.createInstance();

    this.register(enums.ERoleActions.Get, new GetController(rolesRepo));
    this.register(enums.ERoleActions.GetAll, new GetAllController(rolesRepo));
  }
}
