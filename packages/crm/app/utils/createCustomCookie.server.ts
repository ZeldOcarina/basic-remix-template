import { createCookie, Cookie } from "@remix-run/node"; // or cloudflare/deno

// Interface for the cookie options
interface CookieOptions {
  expires?: Date; // Expiration date of the cookie
  httpOnly?: boolean; // Whether the cookie is HTTP-only
  maxAge?: number; // Max age in seconds
  path?: string; // Path for the cookie
  sameSite?: "strict" | "lax" | "none"; // SameSite policy
  secrets?: string[]; // Secrets for signed cookies
  secure?: boolean; // Whether the cookie is secure (HTTPS only)
}

/**
 * Creates a cookie with customizable options.
 *
 * @param {string} name - The name of the cookie.
 * @param {CookieOptions} [options={}] - Optional configurations for the cookie.
 * @returns {Cookie} - The created cookie instance.
 */
export function createCustomCookie(
  name: string,
  options: CookieOptions = {}
): Cookie {
  // Default options for the cookie
  const defaultOptions: CookieOptions = {
    httpOnly: true, // Default to HTTP-only
    maxAge: 60, // Default max age in seconds
    path: "/", // Default path
    sameSite: "lax", // Default SameSite policy
    secrets: [], // Default secrets
    secure: true, // Default to secure (HTTPS only)
  };

  // Merge default options with user-provided options
  const cookieOptions = { ...defaultOptions, ...options };

  // Create and return the cookie
  return createCookie(name, cookieOptions);
}
