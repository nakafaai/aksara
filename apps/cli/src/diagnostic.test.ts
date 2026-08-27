import { describe, expect, it } from "@effect/vitest";
import { compileContent } from "@nakafa/aksara-compiler/compile";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { MAX_RAW_MDX_BYTES } from "@nakafa/aksara-contracts/limits";
import { ContentSigningError } from "@nakafa/aksara-publisher/signing/error";
import { Effect } from "effect";
import { describeDocumentFailure } from "#cli/diagnostic";
import { PreviewRepositoryError, PreviewRestartError } from "#cli/integrity";
import { RENDERER_MANIFEST } from "#test/real";

const CONTENT_KEY = "test:diagnostic";
const BYTE_DIAGNOSTIC_PATTERN =
  /^ContentByteLimitExceededError at test:diagnostic \(rawMdx is \d+ bytes; maximum is \d+\)\.$/;
const MDX_DIAGNOSTIC_PATTERN =
  /^MdxCompilationError at test:diagnostic \(.+\)\.$/;
const POLICY_LIMIT_PATTERN = /process \(process\).+1 more/;
const SOURCE_PATH = CorpusSourcePathSchema.make(
  "packages/corpus/test/source.ts"
);
const VALID_METADATA = "export const metadata = {}";

/** Prepends one valid metadata export to a diagnostic compiler fixture. */
function withMetadata(body: string) {
  return `${VALID_METADATA}\n\n${body}`;
}

/** Returns the real typed compiler failure for one authored MDX fixture. */
const compileFailure = Effect.fn("test.diagnostic.compileFailure")(
  (rawMdx: string) =>
    compileContent({
      artifactLocale: "en",
      contentKey: CONTENT_KEY,
      rawMdx,
      rendererDomain: "mathematics",
      rendererManifest: RENDERER_MANIFEST,
      sourcePath: "packages/corpus/test/diagnostic/en.mdx",
    }).pipe(Effect.flip)
);

describe("document failure diagnostics", () => {
  it.effect("explains metadata, byte, renderer, module, and MDX failures", () =>
    Effect.gen(function* () {
      const failures = yield* Effect.all(
        [
          compileFailure("## Missing metadata"),
          compileFailure(`${VALID_METADATA}\n\n${VALID_METADATA}`),
          compileFailure("export const metadata = getMetadata()"),
          compileFailure(withMetadata("x".repeat(MAX_RAW_MDX_BYTES + 1))),
          compileFailure(withMetadata("<UnknownWidget />")),
          compileFailure(
            withMetadata('import value from "./value"\n\n{value}')
          ),
          compileFailure(withMetadata("<Unclosed>")),
        ],
        { concurrency: "unbounded" }
      );
      const diagnostics = failures.map(
        (failure) => describeDocumentFailure(failure).diagnostic
      );

      expect(diagnostics).toEqual([
        "AuthoredMetadataMissingError at test:diagnostic (add exactly one metadata export).",
        "AuthoredMetadataDuplicateError at test:diagnostic (found 2 metadata exports; keep exactly one).",
        "AuthoredMetadataSyntaxError at test:diagnostic (unsupported metadata syntax: dynamic-value).",
        expect.stringMatching(BYTE_DIAGNOSTIC_PATTERN),
        "RendererComponentMissingError at test:diagnostic (register renderer component UnknownWidget before using it).",
        "UnsupportedMdxModuleSyntaxError at test:diagnostic (remove MDX module syntax at 3:1 (import)).",
        expect.stringMatching(MDX_DIAGNOSTIC_PATTERN),
      ]);
    })
  );

  it.effect(
    "bounds repeated policy failures and preserves identifier-free rules",
    () =>
      Effect.gen(function* () {
        const repeated = Array.from({ length: 9 }, () => "{process.env}").join(
          "\n"
        );
        const [many, identifierFree] = yield* Effect.all(
          [
            compileFailure(withMetadata(repeated)),
            compileFailure(
              withMetadata('{((key) => ({})[key])("dynamic-property")}')
            ),
          ],
          { concurrency: "unbounded" }
        );

        expect(describeDocumentFailure(many).diagnostic).toMatch(
          POLICY_LIMIT_PATTERN
        );
        expect(describeDocumentFailure(identifierFree).diagnostic).toContain(
          "dynamic-property-access"
        );
      })
  );

  it("keeps public failures sanitized across every location class", () => {
    const repository = describeDocumentFailure(
      new PreviewRepositoryError({
        kind: "document",
        path: "packages/corpus/test/source.ts",
        reason: "missing",
      })
    );
    const restart = describeDocumentFailure(
      new PreviewRestartError({
        sourcePath: SOURCE_PATH,
      })
    );
    const signing = describeDocumentFailure(
      new ContentSigningError({
        message: "private diagnostic",
        stage: "artifact",
      })
    );

    expect(repository.publicFailure).toEqual({
      code: "PreviewRepositoryError",
      message:
        "PreviewRepositoryError at packages/corpus/test/source.ts (missing).",
    });
    expect(restart.publicFailure).toEqual({
      code: "PreviewRestartError",
      message: "PreviewRestartError at packages/corpus/test/source.ts.",
    });
    expect(signing).toEqual({
      diagnostic: "ContentSigningError (artifact).",
      publicFailure: {
        code: "ContentSigningError",
        message: "ContentSigningError (artifact).",
      },
    });
  });
});
