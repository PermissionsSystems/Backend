import { beforeAll, describe, expect, it } from '@jest/globals';
import supertest from 'supertest'
import State from '../../../src/tools/state.js'
import { Express } from 'express'
import { IRoleEntity } from '../../../src/modules/roles/entity.js';

interface IGetAllRolesResponse {
  data: {
    roles: IRoleEntity[]
  }
}

describe('Get all roles', () => {
  let app: Express | null = null

  beforeAll(() => {
    app = State.router.app
  })

  describe('Should pass', () => {
    it(`Get roles - no roles`, async () => {
      const reqBody = { query: "{ roles { id name level inheritance permissions { id permissions } tags subId } }"}

      const res = (await supertest(app!)
        .post('/graphql')
        .send(reqBody))

      const body = res.body as IGetAllRolesResponse

      expect(body.data.roles.length).toEqual(0)
    });
  })
});
