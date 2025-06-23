import { beforeAll, describe, expect, it } from '@jest/globals';
import supertest from 'supertest'
import State from '../../../src/tools/state.js'
import { Express } from 'express'
import { IPermissionEntity } from '../../../src/modules/permissions/entity.js';

interface IGetAllPermissionsResponse {
  data: {
    permissions: IPermissionEntity[]
  }
}

describe('Get all permissions', () => {
  let app: Express | null = null

  beforeAll(() => {
    app = State.router.app
  })

  describe('Should pass', () => {
    it(`Get permissions - no permissions`, async () => {
      const reqBody = { query: "{ permissions { id target permission } }"}

      const res = (await supertest(app!)
        .post('/graphql')
        .send(reqBody))

      const body = res.body as IGetAllPermissionsResponse

      expect(body.data.permissions.length).toEqual(0)
    });
  })
});
