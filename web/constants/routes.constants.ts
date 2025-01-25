/**
 * The root route url
 * @type {string}
 */

export const ROOT_ROUTE = "/";

/**
 * The default redirect path after logging in
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/";
/**
 * the sign in path
 * @type {string}
 */
export const SIGN_IN_ROUTE = "/sign-in";

/**
 * An array of routes those are not accessible to the public
 * These routes require authentication
 * @types {string[]}
 */
export const PRIVET_ROUTES = [
  "/admin/dashboard",
  "/admin/create-expedition",
  "/user/dashboard",
];

/**
 * An array of routes those are not accessible by other role except admin
 * These routes require authentication
 * @types {string[]}
 */

export const ADMIN_ROUTES = ["/admin/dashboard", "/admin/create-expedition"];

/**
 * An array of routes those are not accessible by other role except user
 * These routes require authentication
 * @types {string[]}
 */
export const USER_ROUTES = ["/user/dashboard"];

/**
 * An array of routes those are used for authentication
 * These routes will redirect logged in users to default routes
 * @types {string[]}
 */
export const AUTH_ROUTES = [
  "/sign-up",
  "/sign-in",
  "/verify-email",
  "/verification",
];
