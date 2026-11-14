import {
  compileAssessmentBlocks,
  compileContentDocument,
} from "@nakafa/aksara-compiler/assessment/document";
import {
  type AssessmentSite,
  type AssessmentSourceError,
  sourceError,
} from "@nakafa/aksara-compiler/assessment/error";
import type { labelDocument } from "@nakafa/aksara-compiler/assessment/label";
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
import { ContentLanguageSchema } from "@nakafa/aksara-contracts/locale";
import { itemVersions } from "@nakafa/aksara-corpus/question-bank/item";
import { QuestionSourceSchema } from "@nakafa/aksara-corpus/question-bank/source";
import {
  Array as Arr,
  Effect,
  FileSystem,
  Option,
  Path,
  Record as Rec,
  Schema,
} from "effect";
import { assembleInteraction } from "#publisher/assessment/interaction";

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
    input.question.explanations,
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
