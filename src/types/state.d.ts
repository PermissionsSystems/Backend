import type Router from '../connections/router/index.ts';
import type Bootstrap from '../tools/bootstrap.js';

export interface IState {
  controllers: Bootstrap;
  router: Router;
  alive: boolean;
}
