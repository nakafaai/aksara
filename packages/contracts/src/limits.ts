/** Maximum UTF-8 bytes accepted for one authored MDX source. */
export const MAX_RAW_MDX_BYTES = 128 * 1024;

/** Maximum UTF-8 bytes accepted for one emitted MDX function body. */
export const MAX_COMPILED_CODE_BYTES = 256 * 1024;

/** Maximum UTF-8 bytes accepted for one extracted plain-text projection. */
export const MAX_PLAIN_TEXT_BYTES = 128 * 1024;

/** Maximum UTF-8 bytes for canonical metadata plus all compiled payload fields. */
export const MAX_CANONICAL_PAYLOAD_BYTES = 448 * 1024;

/** Maximum UTF-8 bytes for a complete signed artifact wire value. */
export const MAX_SIGNED_ARTIFACT_BYTES = 480 * 1024;

/** Aksara application ceiling for the complete stored artifact document. */
export const MAX_ARTIFACT_DOCUMENT_BYTES = 512 * 1024;
