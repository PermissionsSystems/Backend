import { QueryResult } from 'pg';
import Log from 'simpl-loggar';
import { IUserEntity } from '../../../src/modules/users/entity.js';
import knex from 'knex'
import * as fakes from '../fakes/index.js'
import TokensController from '../../../src/modules/auth/tokens/index.js';
import { ETableNames } from '../../../src/enums/db.js';
import KeyRepository from '../../../src/modules/keys/repository/index.js';
import { JWK, exportJWK, generateKeyPair } from 'jose';

export default class Tester {
  private accessor actions: (() => Promise<unknown>)[] = []
  private accessor created: {keys: number[], users: number[]} = { keys: [], users: []}
  private readonly _client: knex.Knex

  private get client(): knex.Knex {
    return this._client
  }

  constructor(client: knex.Knex) {
    this._client = client
  }

  async createFakeAccessToken (user?: IUserEntity): Promise<string> {
    const userData = user ?? fakes.users.data[0]! as IUserEntity

    const repo = KeyRepository.createInstance()
    const controller = new TokensController(repo)

    return controller.createAccessToken(userData)
  }

  /**
   * Queue new fake user for creation
   */
  createFakeUser(data: Partial<IUserEntity>): Tester | Promise<Tester> {
    this.actions.push(async () => {
      const output = await this.client(ETableNames.Users).insert<QueryResult>(data).returning<{id: number}[]>('id')
      this.created.users.push(output[0]!.id)
    })

    return this
  }

  createFakeKey(): this {
    this.actions.push(async () => {
      const key = await this.createKey()
      const output = await this.client(ETableNames.Keys).insert<QueryResult>(key).returning<{id: number}[]>('id')

      this.created.keys.push(output[0]!.id)
    })

    return this
  }

  async cleanUp(): Promise<void> {
    if(this.created.users.length === 0 || this.created.keys.length === 0) return

    Log.debug("Tester - cleanUp", `About to remove fake data`, {
      data: this.created
    })

    const action = (id: string | number, target: ETableNames) => {
      this.client(target)
        .delete()
        .where({ id })
        .catch((err) => {
          Log.error("Tester - cleanup", "Cannot clean up ", (err as Error).message)
        })

    }

    await Promise.all(this.created.users.map((id) => action(id, ETableNames.Users)))
    // Removing keys prevented for now
    // await Promise.all(this.created.keys.map((id) => action(id, ETableNames.Keys)))

    this.created.users = []
    // this.created.keys = []
  }

  /**
  * Initialize queued transactions
  */
  then<TResult1 = void, TResult2 = never>(
    onfulfilled?: ((value: void) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
  ): Promise<TResult1 | TResult2> {
    const promise = Promise.all(this.actions.map(a => a())).then(() => {
      this.actions = []
    })

    return promise.then(onfulfilled, onrejected)
  }

  private async createKey (): Promise<JWK>{
    const { privateKey } = await generateKeyPair('RS256', { modulusLength: 2048, extractable: true });
    return exportJWK(privateKey);
  };
}
