import { afterEach, beforeEach, beforeAll, describe, expect, it } from '@jest/globals';
import type { IGraphError } from '../../types/index.js'
import supertest from 'supertest'
import State from '../../../src/tools/state.js'
import { Express } from 'express'
import { IUserEntity } from '../../../src/modules/users/entity.js';
import Tester, { createCookie } from '../../utils/index.js'
import { ETokens } from '../../../src/enums/tokens.js';
import { generateRandomName, generateRandomNumber } from '../../../src/utils/index.js';

interface IGetUsersResponse {
  data: {
    user: IUserEntity | null
  }
}

describe('Get user', () => {
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

  describe('Should fail', () => {
    it(`Get user by login - login is empty string`, async () => {
      const reqBody = { query: "{ user ( login: \" \" ) { id login } }"}

      const res = (await supertest(app!)
        .post('/graphql')
        .set('Cookie', createCookie(ETokens.Access, fakeToken!))
        .send(reqBody))

      const body = res.body as IGraphError

      expect(body.errors.length).toEqual(1)
    });
  })

  describe('Should pass', () => {
    it(`Get user by login - no users`, async () => {
      const reqBody = { query: "{ user ( login: \"userName\" ) { id login } }"}

      const res = (await supertest(app!)
        .post('/graphql')
        .set('Cookie', createCookie(ETokens.Access, fakeToken!))
        .send(reqBody))

      const body = res.body as IGetUsersResponse

      expect(body.data.user).toBeNull()
    });

    it(`Get full user by login`, async () => {
      const login = generateRandomName(10)
      const id = generateRandomNumber()

      await tester!.createFakeUser({ login, id })
      const reqBody = { query: `{ user ( login: "${login}" ) { id login } }`}

      const res = (await supertest(app!)
        .post('/graphql')
        .set('Cookie', createCookie(ETokens.Access, fakeToken!))
        .send(reqBody))

      const body = res.body as IGetUsersResponse

      expect(body.data.user!.login).toEqual(login)
      expect(body.data.user!.id).toEqual(id.toString())
    });

    it(`Get user's id by login`, async () => {
      const login = generateRandomName(10)
      const id = generateRandomNumber()

      await tester!.createFakeUser({ login, id })
      const reqBody = { query: `{ user ( login: "${login}" ) { id } }`}

      const res = (await supertest(app!)
        .post('/graphql')
        .set('Cookie', createCookie(ETokens.Access, fakeToken!))
        .send(reqBody))

      const body = res.body as IGetUsersResponse

      expect(body.data.user!.login).toBeUndefined()
      expect(body.data.user!.id).toEqual(id.toString())
    });

    it(`Get user's login by login`, async () => {
      const login = generateRandomName(10)
      const id = generateRandomNumber()

      await tester!.createFakeUser({ login, id })
      const reqBody = { query: `{ user ( login: "${login}" ) { login } }`}

      const res = (await supertest(app!)
        .post('/graphql')
        .set('Cookie', createCookie(ETokens.Access, fakeToken!))
        .send(reqBody))

      const body = res.body as IGetUsersResponse

      expect(body.data.user!.id).toBeUndefined()
      expect(body.data.user!.login).toEqual(login.toString())
    });

    it(`Get user's id by id`, async () => {
      const login = generateRandomName(10)
      const id = generateRandomNumber()

      await tester!.createFakeUser({ login, id })
      const reqBody = { query: `{ user ( id: "${id}" ) { id } }`}

      const res = (await supertest(app!)
        .post('/graphql')
        .set('Cookie', createCookie(ETokens.Access, fakeToken!))
        .send(reqBody))

      const body = res.body as IGetUsersResponse

      expect(body.data.user!.login).toBeUndefined()
      expect(body.data.user!.id).toEqual(id.toString())
    });

    it(`Get user's login by id`, async () => {
      const login = generateRandomName(10)
      const id = generateRandomNumber()

      await tester!.createFakeUser({ login, id })
      const reqBody = { query: `{ user ( id: "${id}" ) { login } }`}

      const res = (await supertest(app!)
        .post('/graphql')
        .set('Cookie', createCookie(ETokens.Access, fakeToken!))
        .send(reqBody))

      const body = res.body as IGetUsersResponse

      expect(body.data.user!.id).toBeUndefined()
      expect(body.data.user!.login).toEqual(login)
    });
  })
});
