import Log from 'simpl-loggar';
import { InvalidAuthClient } from '../../../../errors/index.js';
import AbstractSubController from '../../../../tools/abstractions/subController.js';
import Authorization from '../../utils.js';
import type { IGetLoginDto } from './types.js';
import type { EAuthActions, EControllers } from '../../../../enums/controllers.js';
import type { ETokens } from '../../../../enums/tokens.js';

export default class GetLoginController extends AbstractSubController<EControllers.Auth, EAuthActions.GetLogin> {
  async execute(
    data: IGetLoginDto,
    cookies: { [ETokens.Access]: string | undefined; [ETokens.Refresh]: string | undefined },
  ): Promise<string | { isLoggedIn: boolean; accessToken: string | undefined }> {
    const authLogin = Authorization.createInstance();
    const auth = await authLogin.isLoggedIn(cookies);
    if (auth.isLoggedIn) {
      return auth;
    }

    const client = await this.repository.getByClient(data.client);

    if (!client) {
      Log.debug('Get login', `No client in database with provided name ${data.client}`);
      throw new InvalidAuthClient();
    }

    return client.name;
  }
}
