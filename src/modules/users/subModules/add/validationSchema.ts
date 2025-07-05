import { z } from 'zod';

export default z.object({
  login: z.string().min(1),
  password: z.string().min(5, 'Password must be at least 5 characters long').optional(),
});
