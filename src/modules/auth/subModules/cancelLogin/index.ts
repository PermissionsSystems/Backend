import { InvalidAuthClient } from '../../../../errors/index.js';
import AbstractSubController from '../../../../tools/abstractions/subController.js';
import type { ICancelLoginReq } from '../../../../connections/router/services/auth/cancelLogin/types.js';
import type { EAuthActions, EControllers } from '../../../../enums/controllers.js';
import type { IUserSession } from '../../../../types/index.js';

export default class CancelLoginController extends AbstractSubController<EControllers.Auth, EAuthActions.CancelLogin> {
  async execute(req: ICancelLoginReq): Promise<string> {
    return new Promise((resolve, reject) => {
      const { client } = req.session as IUserSession;

      if (client) {
        resolve(client);
      } else {
        reject(new InvalidAuthClient());
      }
    });
  }
}
