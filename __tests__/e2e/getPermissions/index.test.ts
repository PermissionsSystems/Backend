import { beforeAll, describe, expect, it } from '@jest/globals';
import supertest from 'supertest'
import State from '../../../src/tools/state.js'
import Tester, { createCookie } from '../../utils/index.js'
import { Express } from 'express'
import { IPermissionEntity } from '../../../src/modules/permissions/entity.js';
import { ETokens } from '../../../src/enums/tokens.js';

interface IGetAllPermissionsResponse {
  data: {
    permissions: IPermissionEntity[]
  }
}

describe('Get all permissions', () => {
  let app: Express | null = null
  let fakeToken: string | null = null

  beforeAll(async () => {
    app = State.router.app
    const tester = new Tester(State.postgres.getClient())
    await tester.createFakeKey()
    fakeToken = await tester.createFakeAccessToken()
  })

  describe('Should pass', () => {
    it(`Get permissions - no permissions`, async () => {
      const reqBody = { query: "{ permissions { id target permission } }"}

      const res = (await supertest(app!)
        .post('/graphql')
        .set('Cookie', createCookie(ETokens.Access, fakeToken!))
        .send(reqBody))

      const body = res.body as IGetAllPermissionsResponse

      expect(body.data.permissions.length).toEqual(0)
    });
  })
});
