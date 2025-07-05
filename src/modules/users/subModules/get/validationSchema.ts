import { z } from 'zod';

export default z.object({
  id: z.string().min(1).optional(),
  login: z.string().min(2).optional(),
});
