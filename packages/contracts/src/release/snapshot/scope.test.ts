import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Exit, Schema } from "effect";
import {
  canonicalizePublicationScope,
  PublicationScopeSchema,
} from "#contracts/release/snapshot/scope";
import { encodeJsonText } from "#contracts/text/json";

describe("publication scope", () => {
  it("decodes only non-empty canonical unique families", () => {
    const scope = Schema.decodeSync(PublicationScopeSchema)({
      families: ["article", "material"],
      snapshots: ["program", "tryout"],
    });
    expect(canonicalizePublicationScope(scope)).toEqual(scope);

    const failures = Arr.map(
      [
        { families: [], snapshots: [] },
        { families: ["material", "material"], snapshots: [] },
        { families: ["question", "article"], snapshots: [] },
        { families: ["unknown"], snapshots: [] },
        { families: [], snapshots: ["program", "program"] },
        { families: [], snapshots: ["tryout", "quran"] },
        { families: [], snapshots: ["unknown"] },
      ],
      (invalid) => Schema.decodeUnknownExit(PublicationScopeSchema)(invalid)
    );
    expect(Arr.every(failures, Exit.isFailure)).toBe(true);
    const [emptyFailure] = failures;
    if (emptyFailure !== undefined && Exit.isFailure(emptyFailure)) {
      expect(String(emptyFailure.cause)).toContain(
        "Expected a non-empty publication scope in canonical unique order."
      );
    }
  });

  it("pins the canonical JSON of a family and snapshot scope", () => {
    const scope = Schema.decodeSync(PublicationScopeSchema)({
      families: ["article", "material"],
      snapshots: ["program", "tryout"],
    });

    expect(encodeJsonText(canonicalizePublicationScope(scope))).toBe(
      '{"families":["article","material"],"snapshots":["program","tryout"]}'
    );
  });

  it("pins the canonical JSON of a snapshot-only scope", () => {
    const scope = Schema.decodeSync(PublicationScopeSchema)({
      families: [],
      snapshots: ["quran"],
    });

    expect(encodeJsonText(canonicalizePublicationScope(scope))).toBe(
      '{"families":[],"snapshots":["quran"]}'
    );
  });
});
