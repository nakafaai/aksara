import type {
  ContentChange,
  ContentReleaseItem,
} from "#contracts/release/spec";

/** Serializes one change with stable fields for item digest computation. */
export function canonicalizeContentChange(change: ContentChange) {
  if (change.operation === "upsert") {
    return {
      artifactHash: change.artifactHash,
      contentKey: change.contentKey,
      delivery: change.delivery,
      family: change.family,
      locale: change.locale,
      operation: change.operation,
      rendererDomain: change.rendererDomain,
      sourcePath: change.sourcePath,
    };
  }

  return {
    contentKey: change.contentKey,
    family: change.family,
    locale: change.locale,
    operation: change.operation,
  };
}

/** Serializes one release item with stable identity, order, and content. */
export function canonicalizeContentReleaseItem(item: ContentReleaseItem) {
  return JSON.stringify({
    change: canonicalizeContentChange(item.change),
    index: item.index,
    releaseId: item.releaseId,
  });
}
