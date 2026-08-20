import type { LearningProgram } from "@nakafa/aksara-contracts/program/spec";
import { Effect, Schema } from "effect";
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
    scope: Schema.Literals(["key", "order", "slug", "translation"]),
    value: Schema.Trimmed.check(Schema.isNonEmpty()),
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
  const sources = yield* Schema.decodeUnknownEffect(
    Schema.Array(LearningProgramSourceSchema)
  )(input, { onExcessProperty: "error" }).pipe(
    Effect.mapError((cause) => new ProgramCatalogError({ cause }))
  );
  const programs = yield* composeProgramLocaleCatalog(
    sources,
    yield* decodeProgramLocaleCatalog(localeInput)
  );
  return yield* validateProgramCatalog(programs);
});
