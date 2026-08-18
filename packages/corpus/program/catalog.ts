import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import {
  type LearningProgram,
  LearningProgramSchema,
} from "@nakafa/aksara-contracts/program/spec";
import { Effect, Schema } from "effect";
import { isActiveAppLocale } from "#corpus/locale/lifecycle";
import { localeOverlayAppLocaleCode } from "#corpus/locale/source";
import { examProgramSources } from "#corpus/program/exam";
import {
  composeProgramLocaleCatalog,
  decodeProgramLocaleCatalog,
} from "#corpus/program/locale";
import { LearningProgramSourceSchema } from "#corpus/program/schema";
import { schoolProgramSources } from "#corpus/program/school";

const programSources: readonly unknown[] = [
  ...schoolProgramSources,
  ...examProgramSources,
];

/** One learning program source row failed its exact public contract. */
export class ProgramCatalogError extends Schema.TaggedError<ProgramCatalogError>()(
  "ProgramCatalogError",
  { cause: Schema.Unknown }
) {}

/** Two program rows claim one stable key, order, or localized route slug. */
export class ProgramIdentityError extends Schema.TaggedError<ProgramIdentityError>()(
  "ProgramIdentityError",
  {
    scope: Schema.Literal("key", "order", "slug", "translation"),
    value: Schema.NonEmptyTrimmedString,
  }
) {}

/** Rejects duplicate identity inside one exact program catalog. */
function addIdentity(
  identities: Set<string>,
  scope: "key" | "order" | "slug" | "translation",
  value: string
) {
  if (identities.has(value)) {
    return Effect.fail(new ProgramIdentityError({ scope, value }));
  }
  identities.add(value);
  return Effect.void;
}

/** Verifies identities and returns canonical display order. */
const validateProgramCatalog = Effect.fn("AksaraCorpus.validateProgramCatalog")(
  function* (programs: readonly LearningProgram[]) {
    const keys = new Set<string>();
    const orders = new Set<string>();
    const slugs = new Set<string>();

    for (const program of programs) {
      yield* addIdentity(keys, "key", program.key);
      yield* addIdentity(orders, "order", program.displayOrder.toString());
      for (const translation of program.translations) {
        yield* addIdentity(
          slugs,
          "slug",
          `${translation.appLocale}:${translation.publicSlug}`
        );
      }
    }

    return [...programs].sort(
      (left, right) => left.displayOrder - right.displayOrder
    );
  }
);

/** Strictly decodes every reviewed learning program from source control. */
export const decodeProgramCatalog = Effect.fn(
  "AksaraCorpus.decodeProgramCatalog"
)(function* (input: unknown = programSources, localeInput?: unknown) {
  const sources = yield* Schema.decodeUnknown(
    Schema.Array(LearningProgramSourceSchema)
  )(input, { onExcessProperty: "error" }).pipe(
    Effect.mapError((cause) => new ProgramCatalogError({ cause }))
  );
  const needsLocaleOverlays = ACTIVE_APP_LOCALES.some(
    (appLocale) => localeOverlayAppLocaleCode(appLocale) !== undefined
  );
  const programs =
    needsLocaleOverlays || localeInput !== undefined
      ? yield* composeProgramLocaleCatalog(
          sources,
          yield* decodeProgramLocaleCatalog(localeInput)
        )
      : sources;
  return yield* validateProgramCatalog(programs);
});

/** Decodes base programs plus every present permanent locale overlay. */
export const decodeAuthoringProgramCatalog = Effect.fn(
  "AksaraCorpus.decodeAuthoringProgramCatalog"
)(function* (input: unknown = programSources, localeInput?: unknown) {
  const sources = yield* Schema.decodeUnknown(
    Schema.Array(LearningProgramSourceSchema)
  )(input, { onExcessProperty: "error" }).pipe(
    Effect.mapError((cause) => new ProgramCatalogError({ cause }))
  );
  const locales = yield* decodeProgramLocaleCatalog(localeInput);
  return yield* composeProgramLocaleCatalog(sources, locales).pipe(
    Effect.flatMap(validateProgramCatalog)
  );
});

/** Removes candidate translations before a current signed snapshot is built. */
export const selectActiveProgramCatalog = Effect.fn(
  "AksaraCorpus.selectActiveProgramCatalog"
)(function* (programs: readonly LearningProgram[]) {
  const selected: LearningProgram[] = [];
  for (const program of programs) {
    const translations = program.translations.filter(({ appLocale }) =>
      isActiveAppLocale(appLocale)
    );
    const [firstTranslation, ...remainingTranslations] = translations;
    if (firstTranslation === undefined) {
      return yield* new ProgramIdentityError({
        scope: "translation",
        value: `${program.key}:active-translations-missing`,
      });
    }
    selected.push(
      LearningProgramSchema.make({
        ...program,
        translations: [firstTranslation, ...remainingTranslations],
      })
    );
  }
  return selected;
});
