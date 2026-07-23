import {
  type LearningProgram,
  type LearningProgramKeySchema,
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
    scope: Schema.Literal("key", "order", "slug"),
    value: Schema.NonEmptyTrimmedString,
  }
) {}

/** Rejects duplicate identity inside one exact program catalog. */
function addIdentity(
  identities: Set<string>,
  scope: "key" | "order" | "slug",
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
      for (const locale of ["en", "id"] as const) {
        yield* addIdentity(
          slugs,
          "slug",
          `${locale}:${program.translations[locale].publicSlug}`
        );
      }
    }

    return [...programs].sort(
      (left, right) => left.displayOrder - right.displayOrder
    );
  }
);

/** Strictly decodes all six real learning programs from source control. */
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

/** Resolves one known program without inventing a default curriculum. */
export const findProgram = Effect.fn("AksaraCorpus.findProgram")(function* (
  key: typeof LearningProgramKeySchema.Type,
  input: unknown = programSources
) {
  const programs = yield* decodeProgramCatalog(input);
  return programs.find((program) => program.key === key) ?? null;
});
