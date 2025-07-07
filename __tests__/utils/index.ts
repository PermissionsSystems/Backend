import Tester from './tester/index.js'
import * as fakes from './fakes/index.js'

export const createCookie = (name: string, value: string): string => {
  const expires = new Date(Date.now() + 200 * 1000).toString();
  return `${name}=${value}; Path=/; HttpOnly; Expires=${expires}`;
}

export { fakes }
export default Tester
