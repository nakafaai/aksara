import { describe, expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";
import {
  canonicalizePublicationScope,
  PublicationScopeSchema,
} from "#contracts/release/snapshot/scope";

describe("publication scope", () => {
  it("decodes only non-empty canonical unique families", () => {
    const scope = Schema.decodeSync(PublicationScopeSchema)({
      families: ["article", "material"],
      snapshots: ["program", "tryout"],
    });
    expect(canonicalizePublicationScope(scope)).toEqual(scope);

    const failures = [
      { families: [], snapshots: [] },
      { families: ["material", "material"], snapshots: [] },
      { families: ["question", "article"], snapshots: [] },
      { families: ["unknown"], snapshots: [] },
      { families: [], snapshots: ["program", "program"] },
      { families: [], snapshots: ["tryout", "quran"] },
      { families: [], snapshots: ["unknown"] },
    ].map((invalid) =>
      Schema.decodeUnknownExit(PublicationScopeSchema)(invalid)
    );
    expect(failures.every(Exit.isFailure)).toBe(true);
    const [emptyFailure] = failures;
    if (emptyFailure !== undefined && Exit.isFailure(emptyFailure)) {
      expect(String(emptyFailure.cause)).toContain(
        "Expected a non-empty publication scope in canonical unique order."
      );
    }
  });
});
