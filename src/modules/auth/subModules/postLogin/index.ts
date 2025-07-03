import bcrypt from 'bcrypt';
import Log from 'simpl-loggar';
import { InvalidAuth } from '../../../../errors/index.js';
import * as errors from '../../../../errors/index.js';
import AbstractSubController from '../../../../tools/abstractions/subController.js';
import TokensController from '../../tokens/index.js';
import type { ILoginDto, ILoginOutputDto } from './types.js';
import type { EAuthActions, EControllers } from '../../../../enums/controllers.js';
import type { IUserEntity } from '../../../users/entity.js';

export default class LoginController extends AbstractSubController<EControllers.Auth, EAuthActions.PostLogin> {
  async execute(data: ILoginDto, client: string | undefined): Promise<ILoginOutputDto> {
    if (!client) {
      Log.debug('Post log', 'Client not provided');
      throw new errors.InvalidAuth();
    }

    const user = await this.repository.userRepo.getByLogin(data.login);

    if (!user) {
      Log.debug('Login', `No user in database with provided name ${data.login}. Throwing invalid auth`);
      throw new InvalidAuth();
    }

    await this.compare(data.password, user.password);

    return this.createTokens(user, client);
  }

  private async createTokens(user: IUserEntity, client: string): Promise<ILoginOutputDto> {
    const controller = new TokensController(this.repository.keysRepo);

    const newRefreshToken = await controller.createRefreshToken(user);
    const accessToken = await controller.createAccessToken(user);

    const clientBody = await this.repository.clientsRepo.getByClient(client);
    return { cookies: { refresh: newRefreshToken, access: accessToken }, redirect: clientBody!.redirectUrl };
  }

  /**
   * Compare user passwords.
   * @param password User password.
   * @param hashed Hashed user password.
   */
  private async compare(password: string, hashed: string): Promise<void> {
    const auth = await bcrypt.compare(password, hashed);

    if (!auth) throw new errors.InvalidAuth();
  }
}
