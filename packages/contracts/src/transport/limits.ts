/** Maximum complete HTTP request body accepted by publication ingress. */
export const MAX_PUBLICATION_REQUEST_BYTES = 5 * 1024 * 1024;

/** Maximum complete HTTP response body accepted from publication ingress. */
export const MAX_PUBLICATION_RESPONSE_BYTES = 5 * 1024 * 1024;

/** Maximum complete signed-artifact batch accepted by publication ingress. */
export const MAX_ARTIFACT_BATCH_BYTES = 4 * 1024 * 1024;

/** Maximum signed artifacts accepted by one staging transaction. */
export const MAX_ARTIFACT_BATCH_COUNT = 64;

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

/** Maximum complete structured-snapshot batch accepted by publication ingress. */
export const MAX_SNAPSHOT_BATCH_BYTES = 4 * 1024 * 1024;

/** Maximum structured snapshot rows accepted by one staging transaction. */
export const MAX_SNAPSHOT_BATCH_COUNT = 64;

/** Maximum complete grouped staging body below the Node action argument cap. */
export const MAX_STAGE_GROUP_BYTES = 4 * 1024 * 1024 + 512 * 1024;

/** Maximum safe staging transactions executed by one authenticated action. */
export const MAX_STAGE_GROUP_COUNT = 64;

/** Maximum compact material heads returned by one authoritative page. */
export const MAX_HEAD_PAGE_COUNT = 500;
