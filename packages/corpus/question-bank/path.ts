import { KebabKeySchema } from "@nakafa/aksara-contracts/assessment/identity";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { Array as Arr, Option, Schema } from "effect";

/** Repository-relative root that holds every authored try-out question. */
export const QUESTION_BANK_ROOT = CorpusSourcePathSchema.make(
  "packages/corpus/question-bank/tryout"
);

/** One question folder name, `question-<n>` with n from one. */
const QUESTION_FOLDER = /^question-([1-9]\d*)$/u;

/** One authored file of a question: its item, a prompt, or an explanation. */
const QUESTION_FILE = /^(?:item\.ts|(?:question|answer)\.[a-z]{2}\.mdx)$/u;

/** One authored file of a shared reading: its document in one language. */
const STIMULUS_FILE = /^stimulus\.[a-z]{2}\.mdx$/u;

/**
 * The path of one set below the root: `<country>/<exam>/<section>/<set>`,
 * four lower kebab keys.
 */
export const SetPathSchema = Schema.String.check(
  Schema.makeFilter(
    (path) => {
      const segments = path.split("/");
      return (
        segments.length === 4 && Arr.every(segments, Schema.is(KebabKeySchema))
      );
    },
    { message: "Expected <country>/<exam>/<section>/<set>." }
  )
);
export type SetPath = typeof SetPathSchema.Type;

/** Builds the path of one set from its keys. */
export function setPath(input: {
  readonly countryKey: string;
  readonly examKey: string;
  readonly sectionKey: string;
  readonly setKey: string;
}) {
  return SetPathSchema.make(
    `${input.countryKey}/${input.examKey}/${input.sectionKey}/${input.setKey}`
  );
}

/** The repository path of one folder or file of a set. */
export function setSourcePath(path: SetPath, ...rest: readonly string[]) {
  return CorpusSourcePathSchema.make(
    Arr.join([QUESTION_BANK_ROOT, path, ...rest], "/")
  );
}

/**
 * One file of the question bank, read from its path below the root: a file of
 * a question with the question's number, or a document of a shared reading
 * with the reading's key.
 */
export const BankEntrySchema = Schema.Union([
  Schema.Struct({
    file: Schema.String,
    kind: Schema.Literal("question"),
    number: Schema.Int.check(Schema.isGreaterThan(0)),
    set: SetPathSchema,
  }),
  Schema.Struct({
    file: Schema.String,
    key: KebabKeySchema,
    kind: Schema.Literal("stimulus"),
    set: SetPathSchema,
  }),
]);
export type BankEntry = typeof BankEntrySchema.Type;

/** The six segments of one bank file: four set keys, its folder, and its file. */
const BankPathSchema = Schema.Tuple([
  KebabKeySchema,
  KebabKeySchema,
  KebabKeySchema,
  KebabKeySchema,
  Schema.String,
  Schema.String,
]);

/**
 * Reads one file path below the root, `<set>/question-<n>/<file>` or
 * `<set>/<reading>/stimulus.<language>.mdx`. Any other path is not part of the
 * bank and reads as nothing.
 */
export function readBankEntry(relative: string): Option.Option<BankEntry> {
  return Option.flatMap(
    Schema.decodeUnknownOption(BankPathSchema)(relative.split("/")),
    ([countryKey, examKey, sectionKey, setKey, folder, file]) => {
      const set = setPath({ countryKey, examKey, sectionKey, setKey });
      const question = QUESTION_FOLDER.exec(folder);
      if (question !== null) {
        return QUESTION_FILE.test(file)
          ? Option.some({
              file,
              kind: "question" as const,
              number: Number(question[1]),
              set,
            })
          : Option.none();
      }
      return Schema.is(KebabKeySchema)(folder) && STIMULUS_FILE.test(file)
        ? Option.some({ file, key: folder, kind: "stimulus" as const, set })
        : Option.none();
    }
  );
}
