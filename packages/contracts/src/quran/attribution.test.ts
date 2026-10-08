import { describe, expect, it } from "@effect/vitest";
import { Schema } from "effect";

import { canonicalizeQuranAttribution } from "#contracts/quran/attribution";
import { QuranSourceAttributionSchema } from "#contracts/quran/source";
import { reverseObjectKeys } from "#contracts/test/order";

const embedded = Schema.decodeSync(QuranSourceAttributionSchema)({
  artifact: {
    byteCount: 1234,
    digest: `sha256:${"a".repeat(64)}`,
    fileCount: 2,
  },
  copy: [
    { appLocale: "en", notice: "Reviewed notice é", title: "Arabic text" },
    { appLocale: "id", notice: "Catatan é", title: "Teks Arab" },
  ],
  id: "tanzil-text",
  kind: "embedded",
  publisher: "Technical publisher for tanzil-text.",
  retrievedAt: "2026-07-24T17:57:50Z",
  sourceUrl: "https://example.test/tanzil-text",
  terms: {
    artifact: {
      byteCount: 99,
      digest: `sha256:${"b".repeat(64)}`,
      fileCount: 1,
    },
    url: "https://example.test/terms-text",
  },
  updateUrl: "https://example.test/update-text",
  version: "1.0",
});
const external = Schema.decodeSync(QuranSourceAttributionSchema)({
  copy: [
    { appLocale: "en", notice: "Link only é", title: "Mokhtasar English" },
  ],
  id: "mokhtasar-english",
  kind: "external",
  publisher: "Technical publisher for mokhtasar-english.",
  retrievedAt: "2026-07-24T17:57:50Z",
  sourceUrl: "https://example.test/mokhtasar-english",
  terms: { access: "link-only", url: "https://example.test/terms-english" },
  updateUrl: "https://example.test/update-english",
  version: "2.0",
});
const reversed = reverseObjectKeys(embedded);

describe("Quran attribution golden canonical bytes", () => {
  it("pins the canonical bytes of an embedded source with localized copy", () => {
    expect(JSON.stringify(canonicalizeQuranAttribution(embedded))).toBe(
      '{"artifact":{"byteCount":1234,"digest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","fileCount":2},"copy":[{"appLocale":"en","notice":"Reviewed notice é","title":"Arabic text"},{"appLocale":"id","notice":"Catatan é","title":"Teks Arab"}],"id":"tanzil-text","kind":"embedded","publisher":"Technical publisher for tanzil-text.","retrievedAt":"2026-07-24T17:57:50Z","sourceUrl":"https://example.test/tanzil-text","terms":{"artifact":{"byteCount":99,"digest":"sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb","fileCount":1},"url":"https://example.test/terms-text"},"updateUrl":"https://example.test/update-text","version":"1.0"}'
    );
  });

  it("pins the canonical bytes of an external source without artifact facts", () => {
    expect(JSON.stringify(canonicalizeQuranAttribution(external))).toBe(
      '{"copy":[{"appLocale":"en","notice":"Link only é","title":"Mokhtasar English"}],"id":"mokhtasar-english","kind":"external","publisher":"Technical publisher for mokhtasar-english.","retrievedAt":"2026-07-24T17:57:50Z","sourceUrl":"https://example.test/mokhtasar-english","terms":{"access":"link-only","url":"https://example.test/terms-english"},"updateUrl":"https://example.test/update-english","version":"2.0"}'
    );
  });

  it("keeps the canonical bytes independent of input object key order", () => {
    expect(Object.keys(reversed)).toEqual(Object.keys(embedded).reverse());
    expect(JSON.stringify(canonicalizeQuranAttribution(reversed))).toBe(
      '{"artifact":{"byteCount":1234,"digest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","fileCount":2},"copy":[{"appLocale":"en","notice":"Reviewed notice é","title":"Arabic text"},{"appLocale":"id","notice":"Catatan é","title":"Teks Arab"}],"id":"tanzil-text","kind":"embedded","publisher":"Technical publisher for tanzil-text.","retrievedAt":"2026-07-24T17:57:50Z","sourceUrl":"https://example.test/tanzil-text","terms":{"artifact":{"byteCount":99,"digest":"sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb","fileCount":1},"url":"https://example.test/terms-text"},"updateUrl":"https://example.test/update-text","version":"1.0"}'
    );
  });
});
