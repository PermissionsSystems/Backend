import { z } from 'zod';

const RolePermissionBody = z.object({
  id: z.string(),
  permissions: z.array(z.string()),
});

export default z.object({
  id: z.string(),
  name: z.string().min(1),
  level: z.number(),
  inheritance: z.boolean(),
  tags: z.array(z.string()),
  subId: z.string(),
  permissions: z.array(RolePermissionBody),
});
