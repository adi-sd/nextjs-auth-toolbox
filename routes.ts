/**
 * An array of routes that are public and do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = ["/", "/auth/new-verification"];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users to /setting page.
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error", "/auth/reset", "/auth/new-password"];

/**
 * Prefix for the API Authentication routes.
 * The Routes starting with this prefix will be only for authenticating mechanisms.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Default path where the user will be redirected after a successful login.
 * @type {string}
 */
export const AUTHENTICATED_USER_REDIRECT = "/settings";

/**
 * Default path for performing user login.
 * @type {string}
 */
export const DEFAULT_LOGIN = "/auth/login";
