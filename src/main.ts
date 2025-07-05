import Log from 'simpl-loggar';
import Postgres from './connections/postgres/index.js';
import Router from './connections/router/index.js';
import Bootstrap from './tools/bootstrap.js';
import Liveness from './tools/liveness.js';
import State from './tools/state.js';
import type { IFullError } from './types/index.js';

class App {
  private _liveness: Liveness | undefined;

  private get liveness(): Liveness | undefined {
    return this._liveness;
  }

  private set liveness(val: Liveness | undefined) {
    this._liveness = val;
  }

  @Log.decorateTime('App initialized')
  init(): void {
    this.configLogger();

    this.handleInit().catch((err) => {
      const { stack, message } = err as IFullError | Error;
      Log.error('Server', 'Err while initializing app', message, stack);

      this.close();
    });
  }

  @Log.decorateLog('Server', 'App closed')
  private close(): void {
    this.liveness?.close();
    State.kill();
  }

  private async handleInit(): Promise<void> {
    const controllers = new Bootstrap();
    const router = new Router();

    State.controllers = controllers;

    controllers.init();
    router.init();

    State.router = router;

    const postgres = await Postgres.createInstance();
    State.postgres = postgres;

    Log.log('Server', 'Server started');

    this.liveness = new Liveness();
    this.liveness.init();

    State.alive = true;

    this.listenForSignals();
  }

  private configLogger(): void {
    Log.setPrefix('permissionsSystem');
  }

  private listenForSignals(): void {
    process.on('SIGTERM', () => {
      Log.log('Server', 'Received signal SIGTERM. Gracefully closing');
      this.close();
    });
    process.on('SIGINT', () => {
      Log.log('Server', 'Received signal SIGINT. Gracefully closing');
      this.close();
    });
  }
}

const app = new App();
app.init();
