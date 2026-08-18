import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { CurriculumNodeKeySchema } from "@nakafa/aksara-contracts/program/curriculum";
import { LearningProgramKeySchema } from "@nakafa/aksara-contracts/program/spec";
import { compareCodeUnits } from "@nakafa/aksara-contracts/text/order";
import { Effect, Schema } from "effect";

import { curriculumLocaleSources } from "#corpus/curriculum/locale-registry";
import {
  CurriculumDisplayGroupSchema,
  CurriculumMaterialCardSchema,
  CurriculumNodeTranslationSchema,
  type CurriculumSource,
  type CurriculumTreeNode,
} from "#corpus/curriculum/schema";
import { LocaleOverlayAppLocaleSchema } from "#corpus/locale/source";

/** Permanent locale-owned copy for one stable curriculum node. */
export const CurriculumLocaleSourceSchema = Schema.Struct({
  appLocale: LocaleOverlayAppLocaleSchema,
  displayGroup: Schema.optional(CurriculumDisplayGroupSchema),
  displayOverride: Schema.optional(CurriculumNodeTranslationSchema),
  materialCard: Schema.optional(CurriculumMaterialCardSchema),
  nodeKey: CurriculumNodeKeySchema,
  programKey: LearningProgramKeySchema,
  translation: Schema.optional(CurriculumNodeTranslationSchema),
});
export type CurriculumLocaleSource = typeof CurriculumLocaleSourceSchema.Type;
export type CurriculumLocaleSourceInput =
  typeof CurriculumLocaleSourceSchema.Encoded;

/** One locale row after exact base-node ownership and copy shape are proven. */
export interface ValidatedCurriculumLocaleSource {
  readonly copy: typeof CurriculumNodeTranslationSchema.Type;
  readonly row: CurriculumLocaleSource;
}

/** Curriculum locale rows failed strict source decoding. */
export class CurriculumLocaleCatalogError extends Schema.TaggedError<CurriculumLocaleCatalogError>()(
  "CurriculumLocaleCatalogError",
  { cause: Schema.Unknown }
) {}

/** Curriculum locale copy violates exact stable-node ownership. */
export class CurriculumLocaleOwnershipError extends Schema.TaggedError<CurriculumLocaleOwnershipError>()(
  "CurriculumLocaleOwnershipError",
  {
    appLocale: LocaleOverlayAppLocaleSchema,
    nodeKey: CurriculumNodeKeySchema,
    programKey: LearningProgramKeySchema,
    scope: Schema.Literal("duplicate", "missing", "orphan", "shape"),
  }
) {}

/** Returns the one source-control target that owns a curriculum locale. */
export function curriculumLocaleSourcePath(
  programKey: CurriculumLocaleSource["programKey"],
  appLocale: CurriculumLocaleSource["appLocale"]
) {
  return CorpusSourcePathSchema.make(
    `packages/corpus/curriculum/${programKey}/locale/${appLocale}.ts`
  );
}

/** Strictly decodes permanent locale-owned curriculum rows. */
export const decodeCurriculumLocaleCatalog = Effect.fn(
  "AksaraCorpus.decodeCurriculumLocaleCatalog"
)(function* (input: unknown = curriculumLocaleSources) {
  return yield* Schema.decodeUnknown(
    Schema.Array(CurriculumLocaleSourceSchema)
  )(input, { onExcessProperty: "error" }).pipe(
    Effect.mapError((cause) => new CurriculumLocaleCatalogError({ cause })),
    Effect.map((rows) =>
      [...rows].sort((left, right) =>
        compareCodeUnits(
          `${left.programKey}\0${left.nodeKey}\0${left.appLocale}`,
          `${right.programKey}\0${right.nodeKey}\0${right.appLocale}`
        )
      )
    )
  );
});

/** Flattens stable curriculum nodes for exact locale ownership checks. */
function flattenNodes(nodes: readonly CurriculumTreeNode[]) {
  const flattened: CurriculumTreeNode[] = [];
  for (const node of nodes) {
    flattened.push(node);
    if ("children" in node && node.children !== undefined) {
      flattened.push(...flattenNodes(node.children));
    }
  }
  return flattened;
}

/** Finds one stable base node without consulting localized projections. */
export function findCurriculumSourceNode(
  curricula: readonly CurriculumSource[],
  programKey: CurriculumLocaleSource["programKey"],
  nodeKey: CurriculumLocaleSource["nodeKey"]
) {
  const curriculum = curricula.find(
    (candidate) => candidate.programKey === programKey
  );
  return curriculum?.tree === undefined
    ? undefined
    : flattenNodes(curriculum.tree).find(({ key }) => key === nodeKey);
}

/** Returns whether one base node owns independent locale copy. */
export function curriculumLocaleRowRequired(node: CurriculumTreeNode) {
  return !("materialKeys" in node) || node.displayOverride !== undefined;
}

/** Checks that locale fields exactly mirror the owning base-node shape. */
export function hasCurriculumLocaleShape(
  node: CurriculumTreeNode,
  row: CurriculumLocaleSource
) {
  if ("materialKeys" in node) {
    return (
      row.translation === undefined &&
      row.displayGroup === undefined &&
      row.materialCard === undefined &&
      (node.displayOverride === undefined) ===
        (row.displayOverride === undefined)
    );
  }
  return (
    row.translation !== undefined &&
    row.displayOverride === undefined &&
    (node.displayGroup === undefined) === (row.displayGroup === undefined) &&
    (node.materialCard === undefined) === (row.materialCard === undefined)
  );
}

/** Returns every stable node that requires one row per overlay locale. */
export function curriculumLocaleRequiredKeys(
  curricula: readonly CurriculumSource[]
) {
  return curricula.flatMap((curriculum) =>
    flattenNodes(curriculum.tree)
      .filter(curriculumLocaleRowRequired)
      .map((node) => ({
        nodeKey: node.key,
        programKey: curriculum.programKey,
      }))
  );
}

/** Validates every present row without requiring unfinished locale coverage. */
export const validateCurriculumLocaleRows = Effect.fn(
  "AksaraCorpus.validateCurriculumLocaleRows"
)(function* (
  curricula: readonly CurriculumSource[],
  rows: readonly CurriculumLocaleSource[]
) {
  const identities = new Set<string>();
  const validated: ValidatedCurriculumLocaleSource[] = [];
  for (const row of rows) {
    const identity = `${row.programKey}\0${row.nodeKey}\0${row.appLocale}`;
    if (identities.has(identity)) {
      return yield* new CurriculumLocaleOwnershipError({
        appLocale: row.appLocale,
        nodeKey: row.nodeKey,
        programKey: row.programKey,
        scope: "duplicate",
      });
    }
    identities.add(identity);
    const owner = findCurriculumSourceNode(
      curricula,
      row.programKey,
      row.nodeKey
    );
    if (owner === undefined) {
      return yield* new CurriculumLocaleOwnershipError({
        appLocale: row.appLocale,
        nodeKey: row.nodeKey,
        programKey: row.programKey,
        scope: "orphan",
      });
    }
    const copy = row.translation ?? row.displayOverride;
    if (
      copy === undefined ||
      !curriculumLocaleRowRequired(owner) ||
      !hasCurriculumLocaleShape(owner, row)
    ) {
      return yield* new CurriculumLocaleOwnershipError({
        appLocale: row.appLocale,
        nodeKey: row.nodeKey,
        programKey: row.programKey,
        scope: "shape",
      });
    }
    validated.push({ copy, row });
  }
  return validated;
});
