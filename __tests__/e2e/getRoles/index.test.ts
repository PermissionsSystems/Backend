import { beforeAll, describe, expect, it } from '@jest/globals';
import supertest from 'supertest'
import State from '../../../src/tools/state.js'
import Tester, { createCookie } from '../../utils/index.js'
import { Express } from 'express'
import { IRoleEntity } from '../../../src/modules/roles/entity.js';
import { ETokens } from '../../../src/enums/tokens.js';

interface IGetAllRolesResponse {
  data: {
    roles: IRoleEntity[]
  }
}

describe('Get all roles', () => {
  let app: Express | null = null
  let fakeToken: string | null = null

  beforeAll( async () => {
    app = State.router.app
    const tester = new Tester(State.postgres.getClient())
    await tester.createFakeKey()
    fakeToken = await tester.createFakeAccessToken()
  })

  describe('Should pass', () => {
    it(`Get roles - no roles`, async () => {
      const reqBody = { query: "{ roles { id name level inheritance permissions { id permissions } tags subId } }"}

      const res = (await supertest(app!)
        .post('/graphql')
        .set('Cookie', createCookie(ETokens.Access, fakeToken!))
        .send(reqBody))

      const body = res.body as IGetAllRolesResponse

      expect(body.data.roles.length).toEqual(0)
    });
  })
});
