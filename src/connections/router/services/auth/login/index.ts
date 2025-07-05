import { EControllers, EAuthActions } from '../../../../../enums/controllers.js';
import handleErr from '../../../../../errors/handler.js';
import GetLoginDto from '../../../../../modules/auth/subModules/getLogin/dto.js';
import Routes from '../../../builder/router.js';
import { getController } from '../../../utils/index.js';
import type { ILoginReq } from './types.js';
import type { IUserSession } from '../../../../../types/user.js';
import type express from 'express';

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
      const data = await controller.execute(new GetLoginDto({ client: req.query.client as string }));

      (req.session as IUserSession).client = data;

      res.type('html');
      res.render('login', { params: {} });
    } catch (err) {
      handleErr(err as Error, res);
    }
  }
}
