import type Postgres from '../connections/postgres/index.js';
import type Router from '../connections/router/index.js';
import type Bootstrap from '../tools/bootstrap.js';

export interface IState {
  controllers: Bootstrap;
  router: Router;
  alive: boolean;
  postgres: Postgres;
}
