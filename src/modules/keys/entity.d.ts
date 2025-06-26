import type { JWK } from 'jose';

export interface IKeyEntity extends JWK {
  id: string;
  createdAt: string;
}
