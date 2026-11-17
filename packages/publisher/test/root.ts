/** The repository root as a path, for the corpus calls that read lessons from a checkout. */
export const CHECKOUT_ROOT = decodeURIComponent(
  new URL("../../..", import.meta.url).pathname
).replace(/\/$/u, "");
