import { EControllers, EAuthActions } from '../../../../../enums/controllers.js';
import { ETokens } from '../../../../../enums/tokens.js';
import { ETTL } from '../../../../../enums/ttl.js';
import handleErr from '../../../../../errors/handler.js';
import { AlreadyAuthorized } from '../../../../../errors/index.js';
import GetLoginDto from '../../../../../modules/auth/subModules/getLogin/dto.js';
import ConfigLoader from '../../../../../tools/config/index.js';
import Routes from '../../../builder/router.js';
import { getController } from '../../../utils/index.js';
import type { ILoginReq } from './types.js';
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
   *   get:
   *     tags:
   *       - auth
   *     description: Render login page
   *     responses:
   *       200:
   *         description: Success. Rendered login page
   */
  @Routes.Get<LoginRouter, Promise<void>, ILoginReq>('/login')
  async execute(req: ILoginReq, res: express.Response): Promise<void> {
    try {
      const controller = getController(EControllers.Auth, EAuthActions.GetLogin);
      const data = await controller.execute(new GetLoginDto({ client: req.query.client as string }), {
        [ETokens.Access]: req.cookies[ETokens.Access] as string | undefined,
        [ETokens.Refresh]: req.cookies[ETokens.Refresh] as string | undefined,
      });

      if ((data as { isLoggedIn: boolean; accessToken: string | undefined })?.isLoggedIn) {
        const config = ConfigLoader.getConfig();

        const options: CookieOptions = {
          httpOnly: config.session.secured ? true : false,
          secure: config.session.secured ? true : false,
          sameSite: config.session.secured ? true : false,
          maxAge: ETTL.UserAccessToken * 1000,
        };

        if (config.session.secured) options.domain = config.myAddress;

        res.cookie(
          ETokens.Access,
          (data as { isLoggedIn: boolean; accessToken: string | undefined }).accessToken,
          options,
        );
        throw new AlreadyAuthorized();
      }

      (req.session as IUserSession).client = data as string;

      res.type('html');
      res.render('login', { params: {} });
    } catch (err) {
      handleErr(err as Error, res);
    }
  }
}
