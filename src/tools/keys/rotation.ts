import { exportJWK, generateKeyPair } from 'jose';
import Log from 'simpl-loggar';
import Postgres from '../../connections/postgres/index.js';
import getController from '../../connections/router/utils/controllers.js';
import { EControllers, EKeyActions } from '../../enums/controllers.js';
import GetAllKeysDto from '../../modules/keys/subModules/getAll/dto.js';
import RemoveKeyDto from '../../modules/keys/subModules/remove/dto.js';
import State from '../../tools/state.js';
import Bootstrap from '../bootstrap.js';
import type { JWK } from 'jose';

class RotateKeys {
  private getKey = async (): Promise<JWK> => {
    const { privateKey } = await generateKeyPair('RS256', { modulusLength: 2048, extractable: true });
    return exportJWK(privateKey);
  };

  init(): void {
    this.configLogger();
    Log.log('Keys rotation', 'Started');

    this.rotateKeys()
      .then(() => {
        Log.log('Keys rotation', 'Added new keys');
        this.close();
      })
      .catch((err) => {
        Log.error('Keys rotation', 'Could not rotate keys', (err as Error).message, (err as Error).stack);
        this.close();
        process.exit(1);
      });
  }

  private close(): void {
    try {
      State.kill();
    } catch (err) {
      Log.error('Keys rotation', 'Got error while closing connection to mongoDB', (err as Error).message);
    }
  }

  private async rotateKeys(): Promise<void> {
    await this.initCommunication();

    const controller = getController(EControllers.Keys, EKeyActions.GetAll);
    const removeController = getController(EControllers.Keys, EKeyActions.Remove);

    const keys = await controller.execute(new GetAllKeysDto({ page: 1 }));

    // #TODO This assumes that refresh token life is max 2 weeks. If longer, this will cause issues. Rewrite it to create amount of keys based on TTL enum
    if (keys.length === 3) {
      const oldest = keys.sort((a, b) => {
        const startA = new Date(a.createdAt);
        const startB = new Date(b.createdAt);

        if (startA > startB) return 1;
        if (startB > startA) return -1;
        return 0;
      })[0]!;
      await removeController.execute(new RemoveKeyDto({ id: oldest.id }));
      await this.createKeys();
    } else {
      await this.createKeys(3 - keys.length);
    }
  }

  private async initCommunication(): Promise<void> {
    const controllers = new Bootstrap();
    const postgres = await Postgres.createInstance();

    State.controllers = controllers;
    State.postgres = postgres;

    State.controllers.init();
  }

  private configLogger(): void {
    Log.setPrefix('permissionsSystem');
  }

  private async createKeys(amount: number = 1): Promise<string[]> {
    Log.debug('Keys', 'Creating key');

    return this.create(amount);
  }

  private async create(amount: number): Promise<string[]> {
    const controller = getController(EControllers.Keys, EKeyActions.Add);
    const actions: (() => Promise<string>)[] = [];

    for (let i = 0; i < amount; i++) {
      actions.push(async (): Promise<string> => {
        const key = await this.getKey();
        Log.debug('Keys controller', 'Adding new key', key);
        return (await controller.execute(key)).id;
      });
    }

    return Promise.all(actions.map((a) => a()));
  }
}

new RotateKeys().init();
