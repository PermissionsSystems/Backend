import { z } from 'zod';

export default z.object({
  name: z.string().min(1),
  redirectUrl: z.string().min(1),
  failRedirectUrl: z.string().min(1),
});
