import {
  compileAssessmentBlocks,
  compileContentDocument,
} from "@nakafa/aksara-compiler/assessment/document";
import {
  type AssessmentSite,
  type AssessmentSourceError,
  sourceError,
} from "@nakafa/aksara-compiler/assessment/error";
import { labelDocument } from "@nakafa/aksara-compiler/assessment/label";
import { ItemExplanationSchema } from "@nakafa/aksara-contracts/assessment/explanation";
import { hashItemVersion } from "@nakafa/aksara-contracts/assessment/hash";
import {
  ItemFamilyIdSchema,
  StimulusIdSchema,
} from "@nakafa/aksara-contracts/assessment/identity";
import {
  ItemFamilySchema,
  ItemVersionBodySchema,
  ItemVersionSchema,
  StimulusReferenceSchema,
} from "@nakafa/aksara-contracts/assessment/item";
import {
  InteractionKeySchema,
  ItemKeySchema,
} from "@nakafa/aksara-contracts/assessment/key";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  ACTIVE_APP_LOCALE_CODES,
  type AppLocaleCode,
  ContentLanguageSchema,
} from "@nakafa/aksara-contracts/locale";
import {
  type InteractionSource,
  itemVersions,
} from "@nakafa/aksara-corpus/question-bank/item";
import { QuestionSourceSchema } from "@nakafa/aksara-corpus/question-bank/source";
import {
  Array as Arr,
  Effect,
  FileSystem,
  Option,
  Path,
  Record as Rec,
  Result,
  Schema,
} from "effect";

/**
 * What a screen reader calls the one interaction of an item, in the language
 * the item is asked in.
 */
const ANSWER_LABELS = {
  de: "Antwort",
  en: "Answer",
  id: "Jawaban",
} satisfies Record<AppLocaleCode, string>;

/**
 * The body of one item version and the key of its one interaction, which one
 * version's assembly checks together before it hashes the body.
 */
const VersionSourceSchema = Schema.Struct({
  answer: InteractionKeySchema,
  body: ItemVersionBodySchema,
});

/** The extension of an authored document, which its content key leaves out. */
const MDX_EXTENSION = /\.mdx$/u;

/** Reading one authored assessment file failed. */
export class AssessmentReadError extends Schema.TaggedError<
  AssessmentReadError,
  { readonly brand: unique symbol }
>()("AssessmentReadError", {
  cause: Schema.Unknown,
  path: Schema.String,
}) {}

/** Reads one authored file of the question bank and names the document it holds. */
export const readAssessmentSource = Effect.fn(
  "AksaraPublisher.readAssessmentSource"
)(function* (checkoutRoot: string, sourcePath: string) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const rawMdx = yield* fileSystem
    .readFileString(path.join(checkoutRoot, sourcePath), "utf8")
    .pipe(
      Effect.mapError(
        (cause) => new AssessmentReadError({ cause, path: sourcePath })
      )
    );
  const site: AssessmentSite = {
    contentKey: ContentKeySchema.make(
      sourcePath.slice("packages/corpus/".length).replace(MDX_EXTENSION, "")
    ),
    sourcePath: CorpusSourcePathSchema.make(sourcePath),
  };
  return { ...site, rawMdx };
});

/** The interaction and its answer that one authored task becomes, with document labels. */
const assembleInteraction = Effect.fn("AksaraPublisher.assembleInteraction")(
  function* (
    source: InteractionSource,
    language: AppLocaleCode,
    site: AssessmentSite
  ) {
    /** Compiles one authored label into the label document of this site. */
    const label = (text: string) => labelDocument(text, site);
    if (source.kind === "matrix") {
      const columns = yield* Effect.forEach(source.columns, (text, index) =>
        Effect.map(label(text), (document) => ({
          id: `column-${index + 1}`,
          label: document,
        }))
      );
      const statements = yield* Effect.forEach(
        source.statements,
        (statement, index) =>
          Effect.map(label(statement.label), (document) => ({
            id: `statement-${index + 1}`,
            label: document,
          }))
      );
      return {
        interaction: {
          columns,
          id: "matrix",
          kind: "matrix",
          label: ANSWER_LABELS[language],
          shuffle: false,
          statements,
        },
        key: {
          answers: Arr.map(source.statements, ({ column }, index) => ({
            column: `column-${column}`,
            statement: `statement-${index + 1}`,
          })),
          interaction: "matrix",
          kind: "matrix",
        },
      };
    }
    const options = yield* Effect.forEach(source.options, (option, index) =>
      Effect.map(label(option.label), (document) => ({
        id: `option-${index + 1}`,
        label: document,
      }))
    );
    const correct = Arr.filterMap(source.options, (option, index) =>
      option.correct ? Result.succeed(`option-${index + 1}`) : Result.failVoid
    );
    return {
      interaction: {
        id: "choice",
        kind: "choice",
        label: ANSWER_LABELS[language],
        maxChoices: correct.length === 1 ? 1 : options.length,
        minChoices: 0,
        options,
        shuffle: false,
      },
      key: { correct, interaction: "choice", kind: "choice" },
    };
  }
);

/** The records that one authored question becomes. */
export const AssembledItemSchema = Schema.Struct({
  explanations: Schema.Array(ItemExplanationSchema),
  family: ItemFamilySchema,
  keys: Schema.Array(ItemKeySchema),
  versions: Schema.Array(ItemVersionSchema),
});
export type AssembledItem = typeof AssembledItemSchema.Type;

const AssembleItemInputSchema = Schema.Struct({
  checkoutRoot: Schema.String,
  familyId: ItemFamilyIdSchema,
  question: QuestionSourceSchema,
  reading: Schema.Option(
    Schema.Struct({
      id: StimulusIdSchema,
      versions: Schema.Record(Schema.String, StimulusReferenceSchema),
    })
  ),
});

/**
 * One authored question and the reading of its set, as its assembly takes
 * them: the reading carries its version in each language.
 */
export type AssembleItemInput = typeof AssembleItemInputSchema.Type;

/** Every failure of assembling one question. */
export type AssembleItemError =
  | AssessmentReadError
  | AssessmentSourceError
  | Effect.Error<ReturnType<typeof compileAssessmentBlocks>>
  | Effect.Error<ReturnType<typeof compileContentDocument>>
  | Effect.Error<ReturnType<typeof labelDocument>>
  | Effect.Error<ReturnType<typeof hashItemVersion>>;

/**
 * Assembles one authored question into its records: its family, a version in
 * each language it is asked in, the key of each version, and the explanation
 * of each version in every active app locale. A version's prompt is its
 * compiled stem with its one interaction placed after it, and the version
 * names the reading of its set in its own language.
 */
export const assembleItem: (
  input: AssembleItemInput
) => Effect.Effect<
  AssembledItem,
  AssembleItemError,
  FileSystem.FileSystem | Path.Path
> = Effect.fn("AksaraPublisher.assembleItem")(function* (
  input: AssembleItemInput
) {
  const { item, sourceRoot } = input.question;
  const family = ItemFamilySchema.make({
    ...(item.blueprint === undefined ? {} : { blueprint: item.blueprint }),
    id: input.familyId,
    ...Option.match(input.reading, {
      onNone: () => ({}),
      onSome: ({ id }) => ({ stimulus: id }),
    }),
  });
  const explanations = yield* Effect.forEach(
    ACTIVE_APP_LOCALE_CODES,
    (locale) =>
      Effect.flatMap(
        readAssessmentSource(
          input.checkoutRoot,
          `${sourceRoot}/answer.${locale}.mdx`
        ),
        (source) =>
          Effect.map(compileContentDocument(source), (document) => ({
            document,
            language: ContentLanguageSchema.make(locale),
          }))
      )
  );
  const assembled = yield* Effect.forEach(
    itemVersions(item.versions),
    ({ interaction: interactionSource, language }) =>
      Effect.gen(function* () {
        const source = yield* readAssessmentSource(
          input.checkoutRoot,
          `${sourceRoot}/question.${language}.mdx`
        );
        const stem = yield* compileAssessmentBlocks(source);
        const { interaction, key } = yield* assembleInteraction(
          interactionSource,
          language,
          source
        );
        const reading = Option.flatMap(input.reading, ({ versions }) =>
          Rec.get(versions, language)
        );
        const { answer, body } = yield* Schema.decodeUnknownEffect(
          VersionSourceSchema
        )({
          answer: key,
          body: {
            deliveryLanguage: language,
            family: input.familyId,
            interactions: [interaction],
            prompt: {
              content: [
                ...stem,
                { attrs: { interaction: interaction.id }, type: "interaction" },
              ],
              type: "doc",
            },
            scoring: [],
            ...Option.match(reading, {
              onNone: () => ({}),
              onSome: (stimulus) => ({ stimulus }),
            }),
          },
        }).pipe(
          Effect.mapError((cause) =>
            sourceError(source, "item", "document", cause)
          )
        );
        const version = ItemVersionSchema.make({
          ...body,
          hash: yield* hashItemVersion(body),
        });
        return {
          key: ItemKeySchema.make({ answers: [answer], version: version.hash }),
          version,
        };
      })
  );
  return {
    explanations: Arr.flatMap(assembled, ({ version }) =>
      Arr.map(explanations, ({ document, language }) =>
        ItemExplanationSchema.make({
          document,
          language,
          version: version.hash,
        })
      )
    ),
    family,
    keys: Arr.map(assembled, ({ key }) => key),
    versions: Arr.map(assembled, ({ version }) => version),
  };
});
