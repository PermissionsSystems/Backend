import { EControllers, EAuthActions } from '../../../../../enums/controllers.js';
import handleErr from '../../../../../errors/handler.js';
import Routes from '../../../builder/router.js';
import { getController } from '../../../utils/index.js';
import type { ICancelLoginReq } from './types.js';
import type express from 'express';

export default class LoginRouter {
  /**
   * @param _req
   * @param req
   * @param res
   * @openapi
   * /login/cancel:
   *   get:
   *     tags:
   *       - auth
   *     description: Redirect to frontend
   *     responses:
   *       200:
   *         description: Success. Redirected to frontend
   */
  @Routes.Get<LoginRouter, Promise<void>, ICancelLoginReq>('/login/cancel')
  async execute(req: ICancelLoginReq, res: express.Response): Promise<void> {
    try {
      const controller = getController(EControllers.Auth, EAuthActions.CancelLogin);
      const data = await controller.execute(req);

      res.redirect(data);
    } catch (err) {
      handleErr(err as Error, res);
    }
  }
}
