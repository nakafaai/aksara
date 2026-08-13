import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import {
  type LearningProgram,
  LearningProgramSchema,
} from "@nakafa/aksara-contracts/program/spec";
import { Effect, Schema } from "effect";

import { examProgramSources } from "#corpus/program/exam";
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
      if (program.translations.length !== ACTIVE_APP_LOCALES.length) {
        return yield* new ProgramIdentityError({
          scope: "translation",
          value: `${program.key}:expected-${ACTIVE_APP_LOCALES.join(",")}:actual-${program.translations.map(({ appLocale }) => appLocale).join(",")}`,
        });
      }
      for (const appLocale of ACTIVE_APP_LOCALES) {
        const translation = program.translations.find(
          (candidate) => candidate.appLocale === appLocale
        );
        if (translation === undefined) {
          return yield* new ProgramIdentityError({
            scope: "translation",
            value: `${program.key}:${appLocale}:missing`,
          });
        }
        yield* addIdentity(
          slugs,
          "slug",
          `${appLocale}:${translation.publicSlug}`
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
)(function* (input: unknown = programSources) {
  const programs = yield* Schema.decodeUnknown(
    Schema.Array(LearningProgramSchema)
  )(input, { onExcessProperty: "error" }).pipe(
    Effect.mapError((cause) => new ProgramCatalogError({ cause }))
  );
  return yield* validateProgramCatalog(programs);
});
