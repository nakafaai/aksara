import { Schema } from "effect";

const JsonText = Schema.fromJsonString(Schema.Unknown);

/** Creates one manifest reader for import-boundary policy tests. */
export function createManifestReader(
  manifests: Readonly<Record<string, unknown>>
) {
  return (path: string) => Schema.encodeSync(JsonText)(manifests[path]);
}
