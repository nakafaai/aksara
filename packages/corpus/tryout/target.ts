import {
  type CorpusSourcePath,
  CorpusSourcePathSchema,
} from "@nakafa/aksara-contracts/ids";
import type { AppLocale } from "@nakafa/aksara-contracts/locale";
import { TryoutPreviewTargetSchema } from "@nakafa/aksara-contracts/preview/target";
import type { TryoutCatalogRow } from "@nakafa/aksara-contracts/tryout/catalog";
import type { TryoutPlacementSource } from "@nakafa/aksara-contracts/tryout/placement";
import { Effect, Schema } from "effect";
import type { QuestionEntry } from "#corpus/question-bank/content";
import type { QuestionSource } from "#corpus/question-bank/source";
import { makeTryoutPlacement } from "#corpus/tryout/placement";
import type { TryoutExamSource } from "#corpus/tryout/schema";

type TargetRowKind = Exclude<TryoutCatalogRow["kind"], "country">;

/** An authored question cannot resolve to one active try-out hierarchy. */
export class TryoutTargetError extends Schema.TaggedError<TryoutTargetError>()(
  "TryoutTargetError",
  {
    count: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),
    rowKind: Schema.Literal(
      "context",
      "exam",
      "section",
      "set",
      "target",
      "track"
    ),
    sourcePath: CorpusSourcePathSchema,
  }
) {}

/** Selects one required hierarchy value and rejects missing or repeated owners. */
const selectOne = Effect.fn("AksaraCorpus.selectTryoutTargetValue")(function* <
  Value,
>(
  values: readonly Value[],
  rowKind: TryoutTargetError["rowKind"],
  sourcePath: CorpusSourcePath
) {
  const [value] = values;
  if (values.length !== 1 || value === undefined) {
    return yield* new TryoutTargetError({
      count: values.length,
      rowKind,
      sourcePath,
    });
  }
  return value;
});

/** Finds every decoded source hierarchy that claims the selected question set. */
function placementContexts(
  sources: readonly TryoutExamSource[],
  entry: QuestionEntry
) {
  return sources.flatMap((source) =>
    source.tracks.flatMap((track) =>
      track.sets.flatMap((set) =>
        set.sections.flatMap((section) =>
          section.questionSourcePath === entry.setKey
            ? [{ section, set, source, track }]
            : []
        )
      )
    )
  );
}

/** Selects one catalog row by exact kind and selected placement identity. */
const selectCatalogRow = Effect.fn("AksaraCorpus.selectTryoutCatalogRow")(
  function* (
    rows: readonly TryoutCatalogRow[],
    placement: TryoutPlacementSource,
    rowKind: TargetRowKind,
    sourcePath: CorpusSourcePath
  ) {
    return yield* selectOne(
      rows.filter((row) => {
        if (
          row.kind !== rowKind ||
          row.countryKey !== placement.countryKey ||
          row.examKey !== placement.examKey ||
          row.appLocale !== placement.appLocale
        ) {
          return false;
        }
        if (row.kind === "exam") {
          return true;
        }
        if (row.trackKey !== placement.trackKey) {
          return false;
        }
        if (row.kind === "track") {
          return true;
        }
        if (row.setKey !== placement.setKey) {
          return false;
        }
        if (row.kind === "set") {
          return true;
        }
        return row.sectionKey === placement.sectionKey;
      }),
      rowKind,
      sourcePath
    );
  }
);

/** Resolves one selected question body from source-owned hierarchy and catalog. */
export const selectTryoutTarget = Effect.fn("AksaraCorpus.selectTryoutTarget")(
  function* (
    rows: readonly TryoutCatalogRow[],
    sources: readonly TryoutExamSource[],
    entry: QuestionEntry,
    question: QuestionSource,
    appLocale: AppLocale
  ) {
    const context = yield* selectOne(
      placementContexts(sources, entry),
      "context",
      entry.sourcePath
    );
    if (question.questionKey !== entry.questionKey) {
      return yield* new TryoutTargetError({
        count: 0,
        rowKind: "context",
        sourcePath: entry.sourcePath,
      });
    }
    if (!rows.some((row) => row.appLocale === appLocale)) {
      return yield* new TryoutTargetError({
        count: 0,
        rowKind: "target",
        sourcePath: entry.sourcePath,
      });
    }
    const placement = yield* makeTryoutPlacement(context, question, appLocale);
    const [exam, track, set, section] = yield* Effect.all([
      selectCatalogRow(rows, placement, "exam", entry.sourcePath),
      selectCatalogRow(rows, placement, "track", entry.sourcePath),
      selectCatalogRow(rows, placement, "set", entry.sourcePath),
      selectCatalogRow(rows, placement, "section", entry.sourcePath),
    ]);
    const { choices: _choices, ...previewPlacement } = placement;
    return yield* Schema.decodeUnknown(TryoutPreviewTargetSchema)(
      { exam, placement: previewPlacement, section, set, track },
      { onExcessProperty: "error" }
    ).pipe(
      Effect.mapError(
        () =>
          new TryoutTargetError({
            count: 1,
            rowKind: "target",
            sourcePath: entry.sourcePath,
          })
      )
    );
  }
);
