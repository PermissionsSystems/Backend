import { SignJWT } from 'jose';
import Log from 'simpl-loggar';
import { ETTL } from '../../../enums/ttl.js';
import { InternalError } from '../../../errors/index.js';
import type { IKeyEntity } from '../../keys/entity.js';
import type { IKeyRepository } from '../../keys/repository/types.js';
import type { IFormattedKey } from '../../keys/types.js';
import type { IUserEntity } from '../../users/entity.js';
import type { ITokenData } from '../subModules/postLogin/types.js';
import { createHash } from 'crypto';

export default class TokensController {
  constructor(keysRepo: IKeyRepository) {
    this.keysRepo = keysRepo;
  }

  private accessor keysRepo: IKeyRepository;

  async createAccessToken(userData: IUserEntity): Promise<string> {
    const payload: ITokenData = {
      sub: userData.id.toString(),
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor((Date.now() + ETTL.UserAccessToken * 1000) / 1000),
    };

    const key = await this.getSigningKey();
    const token = await new SignJWT()
      .setProtectedHeader({ alg: 'RS256', kid: key.kid })
      .setIssuedAt(payload.iat)
      .setExpirationTime(payload.exp)
      .setSubject(payload.sub)
      .sign(key);

    return token;
  }

  async createRefreshToken(userData: IUserEntity): Promise<string> {
    const payload: ITokenData = {
      sub: userData.id.toString(),
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor((Date.now() + ETTL.UserRefreshToken * 1000) / 1000),
    };

    const key = await this.getSigningKey();
    const token = await new SignJWT()
      .setProtectedHeader({ alg: 'RS256', kid: key.kid })
      .setIssuedAt(payload.iat)
      .setExpirationTime(payload.exp)
      .setSubject(payload.sub)
      .sign(key);

    return token;
  }

  private async getSigningKey(): Promise<IKeyEntity> {
    const keys: IFormattedKey[] = (await this.keysRepo.getAll(1)).map((k) => {
      return {
        ...k,
        kid: createHash('sha256').update(JSON.stringify(k)).digest('base64url'),
      } as IFormattedKey;
    });

    if (keys.length === 0) {
      Log.error('Tokens controller', 'Missing keys!');
      throw new InternalError();
    }

    return keys.sort((a, b) => {
      const startA = new Date(a.createdAt);
      const startB = new Date(b.createdAt);

      if (startA > startB) return -1;
      if (startB > startA) return 1;
      return 0;
    })[0]!;
  }
}
