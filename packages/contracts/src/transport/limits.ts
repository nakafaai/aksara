/** Maximum complete HTTP request body accepted by publication ingress. */
export const MAX_PUBLICATION_REQUEST_BYTES = 5 * 1024 * 1024;

/** Maximum complete HTTP response body accepted from publication ingress. */
export const MAX_PUBLICATION_RESPONSE_BYTES = 5 * 1024 * 1024;

/** Maximum complete signed-artifact batch accepted by publication ingress. */
export const MAX_ARTIFACT_BATCH_BYTES = 4 * 1024 * 1024;

/** Maximum measured artifacts below transaction compute and write ceilings. */
export const MAX_ARTIFACT_BATCH_COUNT = 128;

/** Maximum complete ordered-item batch accepted by publication ingress. */
export const MAX_ITEM_BATCH_BYTES = 512 * 1024;

/** Maximum ordered release items accepted by one staging transaction. */
export const MAX_ITEM_BATCH_COUNT = 64;

/** Maximum complete ordered-route batch accepted by publication ingress. */
export const MAX_ROUTE_BATCH_BYTES = MAX_ITEM_BATCH_BYTES;

/** Maximum ordered route items accepted by one staging transaction. */
export const MAX_ROUTE_BATCH_COUNT = MAX_ITEM_BATCH_COUNT;

/** Maximum complete projection batch accepted by publication ingress. */
export const MAX_PROJECTION_BATCH_BYTES = 4 * 1024 * 1024;

/** Maximum canonical projections accepted by one staging transaction. */
export const MAX_PROJECTION_BATCH_COUNT = 64;

/**
 * Maximum complete structured-snapshot batch sent to publication ingress. Nakafa
 * decodes, re-encodes, hashes and writes every row of a batch in one Convex
 * mutation, which may run one second. On 16 November 2026 4 MiB batches of
 * assessment rows timed out, and then 1 MiB batches of Quran chunk rows, which
 * also write a search row each, timed out on the first Quran batch. A quarter
 * MiB still holds the largest row Nakafa stores alone (a Quran chunk, under
 * 226 KiB by its read budget), so no row is refused and each batch does a
 * quarter of the work.
 */
export const MAX_SNAPSHOT_BATCH_BYTES = 256 * 1024;

/** Maximum structured snapshot rows accepted by one staging transaction, inside the same one-second mutation. */
export const MAX_SNAPSHOT_BATCH_COUNT = 16;

/** Maximum complete grouped staging body below the Node action argument cap. */
export const MAX_STAGE_GROUP_BYTES = 4 * 1024 * 1024 + 512 * 1024;

/** Maximum safe staging transactions executed by one authenticated action. */
export const MAX_STAGE_GROUP_COUNT = 64;

/** Maximum compact material heads returned by one authoritative page. */
export const MAX_HEAD_PAGE_COUNT = 500;
