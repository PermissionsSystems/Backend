import { generateKeyPair, exportJWK } from 'jose';
import type { JWK } from 'jose';

export default class Keys {
  static async createKey(): Promise<JWK> {
    const { privateKey } = await generateKeyPair('RS256', { modulusLength: 2048, extractable: true });
    return exportJWK(privateKey);
  }
}
