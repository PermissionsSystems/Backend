import { z } from 'zod';

export default z.object({
  id: z
    .string()
    .min(3)
    .regex(
      new RegExp(/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/u, 'i'),
      'Id must be uuid v4',
    ),
  login: z.string().min(1),
  password: z.string().min(5, 'Password must be at least 5 characters long'),
});
