import { Effect, Schema } from "effect";
import { snbtTryoutSource } from "#corpus/tryout/indonesia/snbt/source";
import { tkaTryoutSource } from "#corpus/tryout/indonesia/tka/source";
import {
  type TryoutExamSource,
  TryoutExamSourceSchema,
} from "#corpus/tryout/schema";

const tryoutPrograms = [snbtTryoutSource, tkaTryoutSource];

/** An injected try-out registry failed strict source-contract decoding. */
export class TryoutRegistryDecodeError extends Schema.TaggedError<TryoutRegistryDecodeError>()(
  "TryoutRegistryDecodeError",
  { cause: Schema.Unknown }
) {}

/** Two exam sources claim one stable identity with conflicting ownership. */
export class TryoutRegistryConflictError extends Schema.TaggedError<TryoutRegistryConflictError>()(
  "TryoutRegistryConflictError",
  {
    key: Schema.String,
    kind: Schema.Literal("country", "exam"),
  }
) {}

/** Serializes the shared country facts that every exam must agree on. */
function countrySignature(source: TryoutExamSource) {
  return JSON.stringify({
    countryCode: source.countryCode,
    countryKey: source.countryKey,
    countryRouteSlugs: source.countryRouteSlugs,
    countryTranslations: source.countryTranslations,
  });
}

/** Rejects duplicate exams and conflicting shared-country source facts. */
const validateTryoutRegistry = Effect.fn("AksaraCorpus.validateTryoutRegistry")(
  function* (sources: readonly TryoutExamSource[]) {
    const countries = new Map<string, string>();
    const exams = new Set<string>();

    for (const source of sources) {
      const country = countrySignature(source);
      const priorCountry = countries.get(source.countryKey);
      if (priorCountry !== undefined && priorCountry !== country) {
        return yield* new TryoutRegistryConflictError({
          key: source.countryKey,
          kind: "country",
        });
      }
      countries.set(source.countryKey, country);

      const exam = `${source.countryKey}\0${source.examKey}`;
      if (exams.has(exam)) {
        return yield* new TryoutRegistryConflictError({
          key: exam,
          kind: "exam",
        });
      }
      exams.add(exam);
    }

    return [...sources].sort((left, right) => {
      const country = left.countryKey.localeCompare(right.countryKey);
      return country || left.examKey.localeCompare(right.examKey);
    });
  }
);

/** Decodes the reviewed SNBT/TKA registry or an explicit test-owned input. */
export const decodeTryoutRegistry = Effect.fn(
  "AksaraCorpus.decodeTryoutRegistry"
)(function* (input?: unknown) {
  const sources =
    input === undefined
      ? yield* Effect.all(tryoutPrograms)
      : yield* Schema.decodeUnknown(Schema.Array(TryoutExamSourceSchema))(
          input,
          { onExcessProperty: "error" }
        ).pipe(
          Effect.mapError(
            (cause) =>
              new TryoutRegistryDecodeError({
                cause,
              })
          )
        );

  return yield* validateTryoutRegistry(sources);
});
