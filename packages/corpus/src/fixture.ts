import { fileURLToPath } from "node:url";
import { FileSystem } from "@effect/platform";
import {
  CompileDocumentRequestSchema,
  type ContentLocale,
} from "@nakafaai/aksara-contracts/content";
import { createRendererManifest } from "@nakafaai/aksara-contracts/renderer-node";
import { Effect, Schema } from "effect";

/** A checked-in fixture source could not be read from the local corpus. */
export class CorpusFixtureReadError extends Schema.TaggedError<CorpusFixtureReadError>()(
  "CorpusFixtureReadError",
  {
    cause: Schema.Unknown,
    path: Schema.NonEmptyTrimmedString,
  }
) {}

/** A checked-in fixture failed its shared compiler request contract. */
export class CorpusFixtureContractError extends Schema.TaggedError<CorpusFixtureContractError>()(
  "CorpusFixtureContractError",
  { cause: Schema.Unknown }
) {}

const FIXTURES = [
  { fileName: "en.mdx", locale: "en" },
  { fileName: "id.mdx", locale: "id" },
] as const satisfies readonly {
  locale: ContentLocale;
  fileName: string;
}[];

function fixturePath(fileName: string) {
  return fileURLToPath(
    new URL(`../fixtures/function/${fileName}`, import.meta.url)
  );
}

/** Loads the two-locale rich MDX proof through Effect Platform filesystem IO. */
export const loadRichFixture = Effect.fn("AksaraCorpus.loadRichFixture")(
  function* () {
    const fileSystem = yield* FileSystem.FileSystem;
    const rendererManifest = yield* createRendererManifest({
      authoringComponents: [
        { name: "BlockMath", version: 1 },
        { name: "FunctionMachine", version: 1 },
      ],
      supportedComponents: [
        { name: "BlockMath", version: 1 },
        { name: "FunctionMachine", version: 1 },
      ],
    });

    return yield* Effect.forEach(FIXTURES, ({ fileName, locale }) => {
      const path = fixturePath(fileName);
      return fileSystem.readFileString(path, "utf8").pipe(
        Effect.mapError((cause) => new CorpusFixtureReadError({ cause, path })),
        Effect.flatMap((rawMdx) =>
          Schema.decodeUnknown(CompileDocumentRequestSchema)({
            contentKey: "fixture:function-machine",
            locale,
            rawMdx,
            rendererManifest,
          }).pipe(
            Effect.mapError(
              (cause) => new CorpusFixtureContractError({ cause })
            )
          )
        )
      );
    });
  }
);
