import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import type { AppLocaleCode } from "@nakafa/aksara-contracts/locale";
import { AppLocaleCodeSchema } from "@nakafa/aksara-contracts/locale";
import { partLabels } from "@nakafa/aksara-corpus/question-bank/item";
import { decodeItemSource } from "@nakafa/aksara-corpus/question-bank/reader";
import { TypeScriptParser } from "@nakafa/aksara-utilities/typescript/parse";
import {
  Array as Arr,
  Effect,
  FileSystem,
  Option,
  Schema,
  String as Str,
} from "effect";
import { outlineHeadings } from "#nakafa-content/heading/outline";
import { parseLessonMdx } from "#nakafa-content/mdx/parse";
import { PageParseError } from "#scripts/check/pages";

/** The item or a worked answer of one try-out question, and the question's folder. */
const QUESTION_FILE =
  /^(?<folder>packages\/corpus\/question-bank\/tryout\/(?:[^/]+\/){4}question-\d+)\/(?:item\.ts|answer\.[a-z]+\.mdx)$/u;

/** The language of a worked answer, read from its file name `answer.<language>.mdx`. */
const ANSWER_LANGUAGE = /answer\.(?<language>[a-z]+)\.mdx$/u;

/**
 * The word a part's top heading opens with in each language, before the part's
 * label, a colon, and the concept the part is about: `Teil a: Die Ableitung`.
 * A heading names a concept and never opens with a list marker such as `a)`,
 * which the compiler refuses, so the label follows a word.
 */
const PART_WORDS = {
  de: "Teil",
  en: "Part",
  id: "Bagian",
  ms: "Bahagian",
} satisfies Record<AppLocaleCode, string>;

/** The label of a part heading in one language: `Teil a: Die Ableitung` names `a`. */
function partHeading(language: AppLocaleCode) {
  return new RegExp(
    `^${PART_WORDS[language]} (?<label>[a-z0-9]+(?:\\.[a-z0-9]+)*): \\S`,
    "u"
  );
}

/** The part heading pattern of a worked answer's language, or none for a file in no known language. */
function answerHeading(file: string) {
  return Option.filter(
    Option.fromNullishOr(ANSWER_LANGUAGE.exec(file)?.groups?.language),
    Schema.is(AppLocaleCodeSchema)
  ).pipe(Option.map(partHeading));
}

/** One worked answer of an item with parts whose top headings do not name its parts. */
const PartFindingSchema = Schema.Struct({
  expected: Schema.Array(Schema.String),
  file: Schema.String,
  found: Schema.Array(Schema.String),
});
type PartFinding = typeof PartFindingSchema.Type;

/** Changed or new answers of items with parts whose top headings do not name the parts in order. */
export class ExplanationPartError extends Schema.TaggedError<
  ExplanationPartError,
  { readonly brand: unique symbol }
>()("ExplanationPartError", {
  findings: Schema.Array(PartFindingSchema),
}) {}

/** The folder of a try-out question from its item or a worked answer, or none for any other file. */
export function questionFolder(file: string): Option.Option<string> {
  return Option.fromNullishOr(QUESTION_FILE.exec(file)?.groups?.folder);
}

/**
 * Reads what each top heading of one worked answer names: the part label it
 * opens with in the answer's language, such as `a` for `Teil a: Die
 * Ableitung`, or its whole text when it opens with none.
 */
export const topHeadings = Effect.fn("AksaraPolicy.topHeadings")(function* (
  file: string,
  source: string
) {
  const tree = yield* Effect.try({
    catch: (cause) => new PageParseError({ file, message: String(cause) }),
    try: () => parseLessonMdx(source, file),
  });
  const heading = answerHeading(file);
  return Arr.map(
    Arr.filter(outlineHeadings(source, tree), ({ depth }) => depth === 1),
    ({ label }) =>
      Option.getOrElse(
        Option.flatMap(heading, (pattern) =>
          Option.fromNullishOr(pattern.exec(label)?.groups?.label)
        ),
        () => label
      )
  );
});

/** Checks one worked answer of an item with parts against the labels of its parts. */
const partFinding = Effect.fn("AksaraPolicy.partFinding")(function* (
  file: string,
  expected: readonly string[]
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const found = yield* topHeadings(
    file,
    yield* fileSystem.readFileString(file)
  );
  return Arr.makeEquivalence<string>((left, right) => left === right)(
    found,
    expected
  )
    ? Option.none<PartFinding>()
    : Option.some({ expected, file, found });
});

/** Lists the findings of the worked answers of one question folder, none for an item that asks a single thing. */
const folderFindings = Effect.fn("AksaraPolicy.folderFindings")(function* (
  files: readonly string[],
  folder: string
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const itemPath = CorpusSourcePathSchema.make(`${folder}/item.ts`);
  // An item that does not read or decode is a broken corpus, which the corpus
  // tests already fail, so the gate treats it as a defect.
  const item = yield* fileSystem.readFileString(itemPath).pipe(
    Effect.flatMap((text) => decodeItemSource(text, itemPath)),
    Effect.orDie
  );
  const expected = partLabels(item);
  if (!Arr.isReadonlyArrayNonEmpty(expected)) {
    return [];
  }
  const answers = Arr.filter(
    files,
    (file) =>
      Str.startsWith(`${folder}/answer.`)(file) && Str.endsWith(".mdx")(file)
  );
  return Arr.getSomes(
    yield* Effect.forEach(answers, (file) => partFinding(file, expected))
  );
});

/**
 * Holds every worked answer of each item with parts that this change touches,
 * through the item or an answer, to one top heading per part in the parts'
 * order, each opening with the word for a part in the answer's language, the
 * part's label, a colon, and the concept, such as `# Teil a: Die Ableitung`.
 * Steps inside a part use lower headings.
 */
export const partReport = Effect.fn("AksaraPolicy.partReport")(function* (
  files: readonly string[],
  changed: readonly string[]
) {
  const folders = Arr.filter(
    Arr.dedupe(Arr.getSomes(Arr.map(changed, questionFolder))),
    (folder) => Arr.contains(files, `${folder}/item.ts`)
  );
  const findings = Arr.flatten(
    yield* Effect.forEach(folders, (folder) => folderFindings(files, folder), {
      concurrency: 16,
    })
  );
  if (findings.length === 0) {
    return;
  }
  for (const { expected, file, found } of findings) {
    yield* Effect.logError(
      `${file}: an item with parts opens one top heading per part, in order, each opening with the word for a part, its label, a colon and the concept, such as "# Teil a: ..." or "# Part a: ..."; expected ${Arr.join(expected, ", ")}, found ${Arr.isReadonlyArrayNonEmpty(found) ? Arr.join(found, ", ") : "none"}`
    );
  }
  return yield* new ExplanationPartError({ findings });
}, Effect.provide(TypeScriptParser.layer));
