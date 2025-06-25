import knex from 'knex';
import Log from 'simpl-loggar';
import ConfigLoader from '../../tools/config/index.js';

export default class Postgres {
  protected constructor() {
    // disabled
  }

  protected static accessor instance: Postgres | null = null;

  static async createInstance(): Promise<Postgres> {
    if (Postgres.instance) return Postgres.instance;

    Postgres.instance = new Postgres();
    await Postgres.instance.init();
    return Postgres.instance;
  }

  protected accessor knex: knex.Knex | undefined;

  getClient(): knex.Knex {
    return this.knex!;
  }

  @Log.decorateLog('Knex', 'Connection closed')
  close(): void {
    if (this.knex) {
      this.knex?.destroy()?.catch(() => {
        // Ignored
      });
    }
  }

  @Log.decorateLog('Knex', 'Connection open')
  private async init(): Promise<void> {
    this.knex = knex({
      client: 'pg',
      connection: {
        host: ConfigLoader.getConfig().postgres.host,
        user: ConfigLoader.getConfig().postgres.user,
        password: ConfigLoader.getConfig().postgres.password,
        database: ConfigLoader.getConfig().postgres.db,
        port: ConfigLoader.getConfig().postgres.port,
      },
      migrations: {
        tableName: 'knex_migrations',
      },
      pool: {
        min: 5,
        max: 20,
      },
    });

    try {
      await this.knex.raw('SELECT 1');
    } catch (err) {
      Log.error('Knex', 'Failed to connect to database');
      throw new Error((err as Error).message);
    }
  }
}
