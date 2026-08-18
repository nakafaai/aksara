import type { AppLocale } from "@nakafa/aksara-contracts/locale";
import { Effect, Schema } from "effect";
import {
  CurriculumLocaleOwnershipError,
  type CurriculumLocaleSource,
  curriculumLocaleRowRequired,
  findCurriculumSourceNode,
  type ValidatedCurriculumLocaleSource,
  validateCurriculumLocaleRows,
} from "#corpus/curriculum/locale-source";
import type { ProjectedCurriculumNode } from "#corpus/curriculum/projection";
import type {
  CurriculumSource,
  CurriculumTreeNode,
} from "#corpus/curriculum/schema";
import {
  addLocalizedSource,
  type LocaleOverlayAppLocale,
  LocaleOverlayAppLocaleSchema,
  sourceLocaleValue,
} from "#corpus/locale/source";

/** Adds reviewed ancestry copy while preserving material-derived node copy. */
const localizeCurriculumPath = Effect.fn("AksaraCorpus.localizeCurriculumPath")(
  function* (
    projected: ProjectedCurriculumNode,
    appLocale: LocaleOverlayAppLocale,
    rows: readonly ValidatedCurriculumLocaleSource[]
  ) {
    return yield* Effect.forEach(projected.path, (item) =>
      Effect.gen(function* () {
        const pathTranslation = rows.find(
          ({ row: candidate }) =>
            candidate.programKey === projected.curriculumKey &&
            candidate.nodeKey === item.key &&
            candidate.appLocale === appLocale
        )?.copy;
        if (pathTranslation === undefined) {
          if (sourceLocaleValue(item.translations, appLocale) !== undefined) {
            return item;
          }
          return yield* new CurriculumLocaleOwnershipError({
            appLocale,
            nodeKey: item.key,
            programKey: projected.curriculumKey,
            scope: "missing",
          });
        }
        return {
          ...item,
          translations: addLocalizedSource(
            item.translations,
            appLocale,
            pathTranslation
          ),
        };
      })
    );
  }
);

/** Adds one locale's complete reviewed copy to a projected source node. */
const localizeCurriculumNode = Effect.fn("AksaraCorpus.localizeCurriculumNode")(
  function* (
    projected: ProjectedCurriculumNode,
    appLocale: LocaleOverlayAppLocale,
    validated: ValidatedCurriculumLocaleSource,
    rows: readonly ValidatedCurriculumLocaleSource[]
  ) {
    const { copy, row } = validated;
    const path = yield* localizeCurriculumPath(projected, appLocale, rows);
    return {
      ...projected,
      displayGroup:
        projected.displayGroup === undefined || row.displayGroup === undefined
          ? projected.displayGroup
          : addLocalizedSource(
              projected.displayGroup,
              appLocale,
              row.displayGroup
            ),
      materialCard:
        projected.materialCard === undefined || row.materialCard === undefined
          ? projected.materialCard
          : addLocalizedSource(
              projected.materialCard,
              appLocale,
              row.materialCard
            ),
      path,
      translations: addLocalizedSource(projected.translations, appLocale, copy),
    } satisfies ProjectedCurriculumNode;
  }
);

/** Applies one required locale row and reports the exact consumed source. */
const composeCurriculumNodeLocale = Effect.fn(
  "AksaraCorpus.composeCurriculumNodeLocale"
)(function* (
  projected: ProjectedCurriculumNode,
  owner: CurriculumTreeNode,
  appLocale: LocaleOverlayAppLocale,
  rows: readonly ValidatedCurriculumLocaleSource[]
) {
  if (!curriculumLocaleRowRequired(owner)) {
    return {
      consumed: undefined,
      projected: {
        ...projected,
        path: yield* localizeCurriculumPath(projected, appLocale, rows),
      },
    };
  }
  const validated = rows.find(
    ({ row }) =>
      row.programKey === projected.curriculumKey &&
      row.nodeKey === projected.key &&
      row.appLocale === appLocale
  );
  if (validated === undefined) {
    return yield* new CurriculumLocaleOwnershipError({
      appLocale,
      nodeKey: projected.key,
      programKey: projected.curriculumKey,
      scope: "missing",
    });
  }
  return {
    consumed: validated,
    projected: yield* localizeCurriculumNode(
      projected,
      appLocale,
      validated,
      rows
    ),
  };
});

/** Composes exact locale rows onto projected nodes and closes ownership. */
export const composeCurriculumLocaleCatalog = Effect.fn(
  "AksaraCorpus.composeCurriculumLocaleCatalog"
)(function* (input: {
  readonly appLocales: readonly AppLocale[];
  readonly curricula: readonly CurriculumSource[];
  readonly nodes: readonly ProjectedCurriculumNode[];
  readonly rows: readonly CurriculumLocaleSource[];
}) {
  const rows = yield* validateCurriculumLocaleRows(input.curricula, input.rows);
  const overlayLocales = input.appLocales.filter(
    Schema.is(LocaleOverlayAppLocaleSchema)
  );
  const [firstOverlayLocale] = overlayLocales;
  if (firstOverlayLocale === undefined) {
    return input.nodes;
  }
  const selectedRows = rows.filter((row) =>
    overlayLocales.includes(row.row.appLocale)
  );
  const consumed = new Set<ValidatedCurriculumLocaleSource>();
  const composed = yield* Effect.forEach(input.nodes, (projected) =>
    Effect.gen(function* () {
      const owner = findCurriculumSourceNode(
        input.curricula,
        projected.curriculumKey,
        projected.key
      );
      if (owner === undefined) {
        return yield* new CurriculumLocaleOwnershipError({
          appLocale: firstOverlayLocale,
          nodeKey: projected.key,
          programKey: projected.curriculumKey,
          scope: "orphan",
        });
      }
      let current = projected;
      for (const appLocale of overlayLocales) {
        const localized = yield* composeCurriculumNodeLocale(
          current,
          owner,
          appLocale,
          selectedRows
        );
        if (localized.consumed !== undefined) {
          consumed.add(localized.consumed);
        }
        current = localized.projected;
      }
      return current;
    })
  );
  const orphan = selectedRows.find((row) => !consumed.has(row));
  if (orphan !== undefined) {
    return yield* new CurriculumLocaleOwnershipError({
      appLocale: orphan.row.appLocale,
      nodeKey: orphan.row.nodeKey,
      programKey: orphan.row.programKey,
      scope: "orphan",
    });
  }
  return composed;
});
