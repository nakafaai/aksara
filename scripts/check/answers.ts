import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import type { AppLocaleCode } from "@nakafa/aksara-contracts/locale";
import { AppLocaleCodeSchema } from "@nakafa/aksara-contracts/locale";
import { partLabels } from "@nakafa/aksara-corpus/question-bank/item";
import { decodeItemSource } from "@nakafa/aksara-corpus/question-bank/reader";
import { TypeScriptParser } from "@nakafa/aksara-utilities/typescript/parse";
import { Array as Arr, Effect, FileSystem, Option, Schema } from "effect";
import { findAnswerStructureFindings } from "#nakafa-content/heading/answer";
import { findBloatedInlineMathFindings } from "#nakafa-content/math/bloated";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import { findBlockquoteFindings } from "#nakafa-content/prose/blockquote";
import { findCohesionFindings } from "#nakafa-content/prose/cohesion";
import { PageParseError } from "#scripts/check/pages";

/** One worked answer file under the try-out question bank and its folder and locale. */
const ANSWER_FILE =
  /^(?<folder>packages\/corpus\/question-bank\/tryout\/(?:[^/]+\/){4}question-\d+)\/answer\.(?<locale>[a-z]+)\.mdx$/u;

const isLocale = Schema.is(AppLocaleCodeSchema);

/** One standard violation on a changed or new try-out answer. */
const AnswerFindingSchema = Schema.Struct({
  blocking: Schema.Boolean,
  file: Schema.String,
  line: Schema.Finite,
  message: Schema.String,
  rule: Schema.String,
});
type AnswerFinding = typeof AnswerFindingSchema.Type;

/** Changed or new try-out answers that fail heading, blockquote, math, or readability rules. */
export class ExplanationStandardsError extends Schema.TaggedError<
  ExplanationStandardsError,
  { readonly brand: unique symbol }
>()("ExplanationStandardsError", {
  findings: Schema.Array(AnswerFindingSchema),
}) {}

/** The folder and locale of one try-out worked answer. */
const AnswerLocationSchema = Schema.Struct({
  folder: Schema.String,
  locale: AppLocaleCodeSchema,
});
type AnswerLocation = typeof AnswerLocationSchema.Type;

/** Extracts folder and locale from a try-out answer path, or none for any other file. */
export function answerLocation(file: string): Option.Option<AnswerLocation> {
  const groups = ANSWER_FILE.exec(file)?.groups;
  if (
    groups?.folder === undefined ||
    groups.locale === undefined ||
    !isLocale(groups.locale)
  ) {
    return Option.none();
  }
  return Option.some({ folder: groups.folder, locale: groups.locale });
}

/** Checks whether the sibling `item.ts` of a question folder defines a multi-part item. */
const isPartsFolder = Effect.fn("AksaraPolicy.isPartsFolder")(function* (
  files: readonly string[],
  folder: string
) {
  const itemFile = `${folder}/item.ts`;
  if (!Arr.contains(files, itemFile)) {
    return false;
  }
  const fileSystem = yield* FileSystem.FileSystem;
  const itemPath = CorpusSourcePathSchema.make(itemFile);
  const item = yield* fileSystem.readFileString(itemPath).pipe(
    Effect.flatMap((text) => decodeItemSource(text, itemPath)),
    Effect.orDie
  );
  return partLabels(item).length > 0;
});

/** Runs all diff-scoped try-out answer checks on one answer file. */
const inspectAnswer = Effect.fn("AksaraPolicy.inspectAnswer")(function* (
  files: readonly string[],
  file: string,
  folder: string,
  locale: AppLocaleCode
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const source = yield* fileSystem.readFileString(file);
  const tree = yield* Effect.try({
    catch: (cause) => new PageParseError({ file, message: String(cause) }),
    try: () => parseLessonMdx(source, file),
  });
  const isParts = yield* isPartsFolder(files, folder);
  const findings = [
    ...findAnswerStructureFindings(locale, source, tree, isParts),
    ...findBlockquoteFindings(tree),
    ...findBloatedInlineMathFindings(tree),
    ...findCohesionFindings(locale, tree),
  ];
  return Arr.map(findings, (finding): AnswerFinding => ({ ...finding, file }));
});

/**
 * Holds every changed or new try-out worked answer to the four-heading
 * structure, zero heading symbols, required blockquote, clean InlineMath vs
 * BlockMath split, and mobile paragraph readability rules. Untouched legacy
 * answers stay outside this diff-scoped gate until revised.
 */
export const answerStandardsReport = Effect.fn(
  "AksaraPolicy.answerStandardsReport"
)(function* (files: readonly string[], changed: readonly string[]) {
  const targets = Arr.getSomes(
    Arr.map(
      Arr.filter(changed, (file) => Arr.contains(files, file)),
      (file) =>
        Option.map(answerLocation(file), (location) => ({ ...location, file }))
    )
  );
  const findings = Arr.flatten(
    yield* Effect.forEach(
      targets,
      ({ file, folder, locale }) => inspectAnswer(files, file, folder, locale),
      { concurrency: 16 }
    )
  );
  for (const { blocking, file, line, message, rule } of findings) {
    yield* blocking
      ? Effect.logError(`${file}:${line} [${rule}] ${message}`)
      : Effect.logWarning(`${file}:${line} [review: ${rule}] ${message}`);
  }
  const blocking = Arr.filter(findings, (finding) => finding.blocking);
  if (blocking.length > 0) {
    return yield* new ExplanationStandardsError({ findings: blocking });
  }
}, Effect.provide(TypeScriptParser.layer));
