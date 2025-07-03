import Log from 'simpl-loggar';
import { InvalidAuthClient } from '../../../../errors/index.js';
import AbstractSubController from '../../../../tools/abstractions/subController.js';
import type { IGetLoginDto } from './types.js';
import type { EAuthActions, EControllers } from '../../../../enums/controllers.js';

export default class GetLoginController extends AbstractSubController<EControllers.Auth, EAuthActions.GetLogin> {
  async execute(data: IGetLoginDto): Promise<string> {
    const client = await this.repository.getByClient(data.client);

    if (!client) {
      Log.debug('Get login', `No client in database with provided name ${data.client}`);
      throw new InvalidAuthClient();
    }

    return client.name;
  }
}
