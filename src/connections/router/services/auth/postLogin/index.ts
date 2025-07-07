import Log from 'simpl-loggar';
import { EControllers, EAuthActions } from '../../../../../enums/controllers.js';
import { ETokens } from '../../../../../enums/tokens.js';
import { ETTL } from '../../../../../enums/ttl.js';
import { InvalidAuth } from '../../../../../errors/index.js';
import LoginDto from '../../../../../modules/auth/subModules/postLogin/dto.js';
import ConfigLoader from '../../../../../tools/config/index.js';
import Routes from '../../../builder/router.js';
import { getController } from '../../../utils/index.js';
import type { IPostLoginReq } from './types.js';
import type { IUserSession } from '../../../../../types/user.js';
import type express from 'express';
import type { CookieOptions } from 'express';

export default class LoginRouter {
  /**
   * @param _req
   * @param req
   * @param res
   * @openapi
   * /login:
   *   post:
   *     tags:
   *       - auth
   *     description: Authorize user
   *     responses:
   *       200:
   *         description: Success. User authorized
   */
  @Routes.Post<LoginRouter, Promise<void>, IPostLoginReq>('/login')
  async execute(req: IPostLoginReq, res: express.Response): Promise<void> {
    try {
      const controller = getController(EControllers.Auth, EAuthActions.PostLogin);
      const data = await controller.execute(new LoginDto(req.body), (req.session as IUserSession).client);

      const config = ConfigLoader.getConfig();
      const options: CookieOptions = {
        httpOnly: config.session.secured ? true : false,
        secure: config.session.secured ? true : false,
        sameSite: config.session.secured ? true : false,
      };

      if (config.session.secured) options.domain = config.myAddress;

      const accessOptions: CookieOptions = {
        ...options,
        maxAge: ETTL.UserAccessToken * 1000,
      };

      const refreshOptions: CookieOptions = {
        ...options,
        maxAge: ETTL.UserRefreshToken * 1000,
      };

      res.cookie(ETokens.Access, data.cookies.access, accessOptions);
      res.cookie(ETokens.Refresh, data.cookies.refresh, refreshOptions);

      delete (req.session as IUserSession).client;

      res.redirect(data.redirect);
    } catch (err) {
      Log.debug('Post login', 'Got error while logging in', (err as Error).message);

      res.type('html');
      res.render('login', { error: new InvalidAuth().message, params: { login_hint: req.body?.login ?? '' } });
    }
  }
}
