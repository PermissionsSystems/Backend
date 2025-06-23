import { afterAll, beforeAll } from '@jest/globals';
import Connections from './connections.js'

const connections = new Connections()

beforeAll(async () => {
  await connections.connect()
})

afterAll(async () => {
  await connections.close()
});

export { connections }
