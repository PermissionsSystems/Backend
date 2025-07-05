import CancelLoginRouter from './cancelLogin/index.js';
import LoginRouter from './login/index.js';
import PostLoginRouter from './postLogin/index.js';

/**
 * Initialize routes for auth router.
 */
const initAuthRoutes = (): void => {
  new LoginRouter();
  new CancelLoginRouter();
  new PostLoginRouter();
};

export default initAuthRoutes;
