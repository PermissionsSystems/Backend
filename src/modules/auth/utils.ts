import { importJWK, jwtVerify } from 'jose';
import Log from 'simpl-loggar';
import TokensController from './tokens/index.js';
import { ETokens } from '../../enums/tokens.js';
import { InvalidAuth } from '../../errors/index.js';
import ClientRepository from '../clients/repository/index.js';
import KeyRepository from '../keys/repository/index.js';
import UserRepository from '../users/repository/index.js';
import type { IClientRepository } from '../clients/repository/types.js';
import type { IKeyEntity } from '../keys/entity.js';
import type { ITokenData } from './subModules/postLogin/types.js';
import type { IKeyRepository } from '../keys/repository/types.js';
import type { IUserRepository } from '../users/repository/types.js';
import { createHash } from 'crypto';

export default class Authorization {
  protected constructor() {
    this.clientsRepo = ClientRepository.createInstance();
    this.userRepo = UserRepository.createInstance();
    this.keysRepo = KeyRepository.createInstance();
  }

  protected static accessor instance: Authorization | null = null;
  static createInstance(): Authorization {
    if (Authorization.instance) return Authorization.instance;

    Authorization.instance = new Authorization();
    return Authorization.instance;
  }
  private accessor clientsRepo: IClientRepository;
  private accessor userRepo: IUserRepository;
  private accessor keysRepo: IKeyRepository;

  async isLoggedIn(cookies: {
    [ETokens.Access]: string | undefined;
    [ETokens.Refresh]: string | undefined;
  }): Promise<{ isLoggedIn: boolean; accessToken: string | undefined }> {
    const isValidAccess = await this.validateToken(cookies[ETokens.Access]);
    const isValidRefresh = await this.validateToken(cookies[ETokens.Refresh]);

    if (!isValidAccess && isValidRefresh) {
      const token = await this.refreshTokens(isValidRefresh.sub);
      return { accessToken: token, isLoggedIn: !!isValidRefresh };
    }

    return { isLoggedIn: !!isValidAccess, accessToken: undefined };
  }

  private async refreshTokens(sub: string): Promise<string> {
    const controller = new TokensController(this.keysRepo);
    const user = await this.userRepo.get(sub);

    if (!user) {
      Log.debug('Login - get', 'User token exists, but no user in database', { sub });
      throw new InvalidAuth();
    }

    return controller.createAccessToken(user);
  }

  private async getKey(cookie: string): Promise<IKeyEntity | undefined> {
    const keys = (await this.keysRepo.getAll(1)).map((k) => {
      return {
        ...k,
        kid: createHash('sha256').update(JSON.stringify(k)).digest('base64url'),
      };
    });

    const parts = cookie.split('.');
    const header = JSON.parse(Buffer.from(parts[0]!, 'base64').toString('utf8')) as {
      alg: string;
      typ: string;
      kid: string;
    };

    const key = keys.find((k) => k.kid === header.kid);
    if (!key) {
      Log.debug('Login - get', 'Key not found in keystore. Possibly token expired, or tokens got rotated');
      return undefined;
    }

    return key;
  }

  private async validateToken(token: string | undefined): Promise<ITokenData | undefined> {
    try {
      if (!token) return undefined;

      const privateKey = await this.getKey(token);
      if (!privateKey) return undefined;

      const publicKey = await importJWK({
        kty: 'RSA',
        e: privateKey.e,
        n: privateKey.n,
        alg: 'RS256',
        kid: privateKey.kid,
      });

      const result = await jwtVerify(token, publicKey);
      const parsed = result.payload as ITokenData;

      if (new Date(parsed.exp * 1000).getTime() - Date.now() < 0) {
        Log.debug('Login - get', 'Token expired');
        return undefined;
      }

      return parsed;
    } catch (err) {
      Log.debug('Login - get', 'Error while validating token', (err as Error).message);
      return undefined;
    }
  }
}
