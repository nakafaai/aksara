/** Maximum protected selectors accepted in one retained-snapshot read. */
export const MAX_PROTECTED_RUNTIME_SELECTORS = 64;

/** Maximum UTF-8 bytes accepted by the protected batch endpoint. */
export const MAX_PROTECTED_RUNTIME_REQUEST_BYTES = 64 * 1024;

/** Maximum UTF-8 bytes returned by the protected batch endpoint. */
export const MAX_PROTECTED_RUNTIME_RESPONSE_BYTES = 4 * 1024 * 1024;

/** Measures the exact JSON bytes written by the protected HTTP response. */
export function protectedRuntimeResponseBytes(response: object) {
  return new TextEncoder().encode(JSON.stringify(response)).byteLength;
}

/** Keeps every found result inside the protected response wire ceiling. */
export function hasBoundedProtectedRuntimeResponse(response: object) {
  return (
    protectedRuntimeResponseBytes(response) <=
    MAX_PROTECTED_RUNTIME_RESPONSE_BYTES
  );
}
