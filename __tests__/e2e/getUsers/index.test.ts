import { afterEach, beforeEach, beforeAll, describe, expect, it } from '@jest/globals';
import supertest from 'supertest'
import State from '../../../src/tools/state.js'
import { Express } from 'express'
import { IUserEntity } from '../../../src/modules/users/entity.js';
import Tester, { createCookie } from '../../utils/index.js'
import { ETokens } from '../../../src/enums/tokens.js';

interface IGetAllUsersResponse {
  data: {
    users: IUserEntity[]
  }
}

describe('Get all users', () => {
  let app: Express | null = null
  let tester: Tester | null = null
  let fakeToken: string | null = null

  beforeAll(async () => {
    app = State.router.app
    tester = new Tester(State.postgres.getClient())
    await tester.createFakeKey()
    fakeToken = await tester.createFakeAccessToken()
  })

  afterEach(async () => {
    await tester!.cleanUp()
  })

  beforeEach(async () => {
    await tester!.cleanUp()
  })

  describe('Should pass', () => {
    it(`Get users - no users`, async () => {
      const reqBody = { query: "{ users { id login } }"}

      const res = (await supertest(app!)
        .post('/graphql')
        .set('Cookie', createCookie(ETokens.Access, fakeToken!))
        .send(reqBody))

      const body = res.body as IGetAllUsersResponse

      expect(body.data.users.length).toEqual(0)
    });

    it(`Get users - 1 user in db`, async () => {
      await tester?.createFakeUser({ login: 'bread', id: 2 })
      const reqBody = { query: "{ users { id login } }"}

      const res = (await supertest(app!)
        .post('/graphql')
        .set('Cookie', createCookie(ETokens.Access, fakeToken!))
        .send(reqBody))

      const body = res.body as IGetAllUsersResponse

      expect(body.data.users.length).toEqual(1)
    });
  })
});
