import { resolve } from "node:path";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, FileSystem, Path, PlatformError } from "effect";
import { decodePageRegistry } from "#corpus/pages/registry";
import { decodePageSources, readPageDocument } from "#corpus/pages/source";
import { pageSource } from "#corpus/test/page";

const corpusRoot = resolve(import.meta.dirname, "..", "..", "..");

/** Provides one deterministic reviewed page body through Effect Platform. */
function fileLayer(source: string | undefined) {
  return FileSystem.layerNoop({
    readFileString: (path) => {
      if (source !== undefined) {
        return Effect.succeed(source);
      }
      return Effect.fail(
        PlatformError.systemError({
          _tag: "NotFound",
          method: "readFileString",
          module: "FileSystem",
          pathOrDescriptor: path,
        })
      );
    },
  });
}

describe("public page source", () => {
  it("composes every reviewed page family and decodes injected catalogs", async () => {
    const defaults = await Effect.runPromise(decodePageSources());
    const injected = await Effect.runPromise(decodePageSources([pageSource()]));

    expect(defaults.map(({ pageKey }) => pageKey)).toEqual([
      "imprint",
      "privacy-policy",
      "security-policy",
      "terms-of-service",
    ]);
    expect(injected).toEqual([pageSource()]);
  });

  it("maps one invalid injected catalog to a typed failure", async () => {
    const error = await Effect.runPromise(
      decodePageSources(null).pipe(Effect.flip)
    );

    expect(error._tag).toBe("PageCatalogError");
  });

  it("reads one registry-owned body byte-exactly", async () => {
    const [entry] = await Effect.runPromise(decodePageRegistry([pageSource()]));
    if (entry === undefined) {
      throw new Error("Expected one active public page entry.");
    }
    const document = await Effect.runPromise(
      readPageDocument(corpusRoot, entry).pipe(
        Effect.provide([fileLayer("# Privacy Policy\n"), Path.layer])
      )
    );

    expect(document).toMatchObject({
      rawMdx: "# Privacy Policy\n",
      route: entry.route,
      sourcePath: entry.sourcePath,
    });
    expect(document).not.toHaveProperty("sourceRoot");
  });

  it("maps one missing reviewed body to a typed read failure", async () => {
    const [entry] = await Effect.runPromise(decodePageRegistry([pageSource()]));
    if (entry === undefined) {
      throw new Error("Expected one active public page entry.");
    }
    const error = await Effect.runPromise(
      readPageDocument(corpusRoot, entry).pipe(
        Effect.provide([fileLayer(undefined), Path.layer]),
        Effect.flip
      )
    );

    expect(error).toMatchObject({
      _tag: "PageReadError",
      sourcePath: entry.sourcePath,
    });
  });
});
