export interface IRolePermissionBody {
  id: string;
  permissions: string[];
}

export interface IRoleEntity {
  name: string;
  id: string;
  level: number;
  inheritance: boolean;
  permissions: IRolePermissionBody[];
  tags: string[];
  subId: string;
}
