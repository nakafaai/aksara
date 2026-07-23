import { Effect, Either, Schema } from "effect";
import { describe, expect, it } from "vitest";

import { ReferenceSchema } from "#corpus/articles/reference";
import { importCorpusModules } from "#corpus/test/imports";

describe("article reference", () => {
  it("decodes exact reviewed source fields without requiring optional notes", () => {
    const decoded = Schema.decodeUnknownSync(ReferenceSchema)({
      authors: "Nakafa",
      publication: "Nakafa",
      title: "Reviewed source",
      url: "https://nakafa.com",
      year: 2026,
    });

    expect(decoded).toEqual({
      authors: "Nakafa",
      publication: "Nakafa",
      title: "Reviewed source",
      url: "https://nakafa.com",
      year: 2026,
    });
  });

  it("rejects references without their source identity", () => {
    const result = Schema.decodeUnknownEither(ReferenceSchema)({
      authors: "Nakafa",
      year: 2026,
    });

    expect(Either.isLeft(result)).toBe(true);
  });

  it("loads every authored article reference module", async () => {
    const files = await Effect.runPromise(
      importCorpusModules("articles/**/*.ts", ["articles/reference.ts"])
    );

    expect(files).toHaveLength(7);
  });
});
