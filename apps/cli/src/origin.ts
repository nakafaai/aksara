/** Host matching Next.js' canonical loopback origin for same-origin rewrites. */
export const NAKAFA_LOOPBACK_HOST = "localhost";

/** Proves renderer discovery cannot leave the spawned localhost origin. */
export function isNakafaOrigin(origin: URL) {
  return (
    origin.protocol === "http:" &&
    origin.hostname === NAKAFA_LOOPBACK_HOST &&
    origin.port.length > 0 &&
    origin.pathname === "/" &&
    origin.search === "" &&
    origin.hash === "" &&
    origin.username === "" &&
    origin.password === ""
  );
}
