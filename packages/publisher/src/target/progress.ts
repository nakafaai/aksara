import type { PublicationRequest } from "@nakafa/aksara-contracts/transport/request";
import type { PublicationSuccess } from "@nakafa/aksara-contracts/transport/response";

/** Binds bounded finalization progress to signed item count and cursor. */
export function hasBoundFinalizeProgress(
  request: Extract<PublicationRequest, { readonly operation: "finalize" }>,
  response: Extract<PublicationSuccess, { readonly operation: "finalize" }>
) {
  const { itemCount } = request.release.manifest;
  const finalIndex = itemCount - 1;
  const { nextIndex, processed } = response.value;
  if (request.afterIndex > finalIndex || nextIndex > finalIndex) {
    return false;
  }
  const advance = nextIndex - request.afterIndex;
  if (processed !== 0 && processed !== advance) {
    return false;
  }
  if (response.value.done) {
    return nextIndex === finalIndex;
  }
  return nextIndex > request.afterIndex && nextIndex < finalIndex;
}
