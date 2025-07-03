import LoginRouter from './login/index.js';

/**
 * Initialize routes for auth router.
 */
const initAuthRoutes = (): void => {
  new LoginRouter();
};

export default initAuthRoutes;
