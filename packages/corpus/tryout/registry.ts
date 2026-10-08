import { compareCodeUnits } from "@nakafa/aksara-contracts/text/order";
import { Effect, MutableHashMap, MutableHashSet, Option, Schema } from "effect";
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
    kind: Schema.Literals(["country", "exam"]),
  }
) {}

/** Serializes the shared country facts that every exam must agree on. */
function countrySignature(source: TryoutExamSource) {
  return Schema.encodeSync(Schema.fromJsonString(Schema.Unknown))({
    countryCode: source.countryCode,
    countryKey: source.countryKey,
    countryOrder: source.countryOrder,
    countryRevision: source.countryRevision,
    countryRouteSlugs: source.countryRouteSlugs,
    countryTranslations: source.countryTranslations,
  });
}

/** Rejects duplicate exams and conflicting shared-country source facts. */
const validateTryoutRegistry = Effect.fn("AksaraCorpus.validateTryoutRegistry")(
  function* (sources: readonly TryoutExamSource[]) {
    const countries = MutableHashMap.empty<string, string>();
    const countryCodes = MutableHashMap.empty<string, string>();
    const exams = MutableHashSet.empty<string>();

    for (const source of sources) {
      const country = countrySignature(source);
      const priorCountry = Option.getOrUndefined(
        MutableHashMap.get(countries, source.countryKey)
      );
      if (priorCountry !== undefined && priorCountry !== country) {
        return yield* new TryoutRegistryConflictError({
          key: source.countryKey,
          kind: "country",
        });
      }
      MutableHashMap.set(countries, source.countryKey, country);

      const priorCountryCode = Option.getOrUndefined(
        MutableHashMap.get(countryCodes, source.countryCode)
      );
      if (
        priorCountryCode !== undefined &&
        priorCountryCode !== source.countryKey
      ) {
        return yield* new TryoutRegistryConflictError({
          key: source.countryCode,
          kind: "country",
        });
      }
      MutableHashMap.set(countryCodes, source.countryCode, source.countryKey);

      const exam = `${source.countryKey}\0${source.examKey}`;
      if (MutableHashSet.has(exams, exam)) {
        return yield* new TryoutRegistryConflictError({
          key: exam,
          kind: "exam",
        });
      }
      MutableHashSet.add(exams, exam);
    }

    return [...sources].sort((left, right) => {
      const countryOrder = left.countryOrder - right.countryOrder;
      const countryKey = compareCodeUnits(left.countryKey, right.countryKey);
      const examOrder = left.examOrder - right.examOrder;
      return (
        countryOrder ||
        countryKey ||
        examOrder ||
        compareCodeUnits(left.examKey, right.examKey)
      );
    });
  }
);

/** Decodes the reviewed try-out registry or an explicit test-owned input. */
export const decodeTryoutRegistry = Effect.fn(
  "AksaraCorpus.decodeTryoutRegistry"
)(function* (input?: unknown) {
  const sources =
    input === undefined
      ? yield* Effect.all(tryoutPrograms)
      : yield* Schema.decodeUnknownEffect(Schema.Array(TryoutExamSourceSchema))(
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
