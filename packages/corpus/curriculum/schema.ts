import { MaterialDomainSchema } from "@nakafa/aksara-contracts/material/domain";
import { CurriculumNodeKeySchema } from "@nakafa/aksara-contracts/program/curriculum";
import {
  LearningProgramKeySchema,
  ProgramNavigationIconKeySchema,
  type ProgramNavigationLevel,
  ProgramNavigationLevelSchema,
} from "@nakafa/aksara-contracts/program/spec";
import { MaterialKeySchema } from "@nakafa/aksara-contracts/projection/material";
import { Array as Arr, Effect, MutableHashSet, Schema } from "effect";
import { localizedSourceMapSchema } from "#corpus/locale/source";
import { MaterialCardDescriptionSchema } from "#corpus/material/description";
import { PublicRouteSegmentSchema } from "#corpus/route/schema";

/** Localized title and route segment owned by one curriculum node. */
const CurriculumNodeTranslationSchema = Schema.Struct({
  routeSlug: PublicRouteSegmentSchema,
  title: Schema.String,
});

/** Complete localized route copy for one curriculum node. */
export const CurriculumNodeTranslationMapSchema = localizedSourceMapSchema(
  CurriculumNodeTranslationSchema
);

/** Complete localized group labels attached to one navigation row. */
const CurriculumDisplayGroupSchema = Schema.Struct({
  title: Schema.String,
});
export const CurriculumDisplayGroupMapSchema = localizedSourceMapSchema(
  CurriculumDisplayGroupSchema
);

/** Complete localized material-card copy attached to one navigation row. */
const CurriculumMaterialCardSchema = Schema.Struct({
  description: MaterialCardDescriptionSchema,
  title: Schema.String,
});
export const CurriculumMaterialCardMapSchema = localizedSourceMapSchema(
  CurriculumMaterialCardSchema
);

type CurriculumStructureNodeShape = typeof CurriculumStructureNodeSchema.Type;

/**
 * One decoded structure node. The interface names the recursive shape, because
 * the tree schema refers to the node type that contains it.
 */
export interface CurriculumStructureNode extends CurriculumStructureNodeShape {}

export type CurriculumMaterialNode = typeof CurriculumMaterialNodeSchema.Type;

type CurriculumTreeNode = CurriculumMaterialNode | CurriculumStructureNode;

type CurriculumStructureInputShape =
  typeof CurriculumStructureNodeSchema.Encoded;

/**
 * One authored structure node before decoding. The interface names the
 * recursive shape, because the input tree refers to the node type that contains it.
 */
export interface CurriculumStructureInput
  extends CurriculumStructureInputShape {}

export type CurriculumMaterialInput =
  typeof CurriculumMaterialNodeSchema.Encoded;

type CurriculumTreeInput = CurriculumMaterialInput | CurriculumStructureInput;

const CurriculumStructureNodeSchema = Schema.Struct({
  children: Schema.optional(
    Schema.Array(
      Schema.suspend(
        (): Schema.Codec<CurriculumTreeNode, CurriculumTreeInput> =>
          CurriculumTreeNodeSchema
      )
    )
  ),
  displayGroup: Schema.optional(CurriculumDisplayGroupMapSchema),
  displayGroupIconKey: Schema.optional(ProgramNavigationIconKeySchema),
  iconKey: Schema.optional(ProgramNavigationIconKeySchema),
  key: CurriculumNodeKeySchema,
  level: ProgramNavigationLevelSchema,
  materialCard: Schema.optional(CurriculumMaterialCardMapSchema),
  materialDomain: Schema.optional(MaterialDomainSchema),
  order: Schema.Int.pipe(Schema.check(Schema.isGreaterThanOrEqualTo(0))),
  translations: CurriculumNodeTranslationMapSchema,
});

const CurriculumMaterialNodeSchema = Schema.Struct({
  displayOverride: Schema.optional(CurriculumNodeTranslationMapSchema),
  key: CurriculumNodeKeySchema,
  level: ProgramNavigationLevelSchema,
  materialKeys: Schema.NonEmptyArray(MaterialKeySchema),
  order: Schema.Int.pipe(Schema.check(Schema.isGreaterThanOrEqualTo(0))),
});

export const CurriculumTreeNodeSchema: Schema.Codec<
  CurriculumTreeNode,
  CurriculumTreeInput
> = Schema.Union([CurriculumMaterialNodeSchema, CurriculumStructureNodeSchema]);

/** One complete source-controlled curriculum tree. */
export const CurriculumSourceSchema = Schema.Struct({
  programKey: LearningProgramKeySchema,
  tree: Schema.Array(CurriculumTreeNodeSchema),
});
export type CurriculumSource = typeof CurriculumSourceSchema.Type;
type CurriculumSourceInput = typeof CurriculumSourceSchema.Encoded;
/** A structure node before the helper that defines its level adds it. */
type StructureNodeInput = Omit<
  typeof CurriculumStructureNodeSchema.Encoded,
  "level"
>;

/** A curriculum source failed strict schema decoding at its definition seam. */
export class CurriculumDecodeError extends Schema.TaggedError<CurriculumDecodeError>()(
  "CurriculumDecodeError",
  { cause: Schema.Unknown, message: Schema.Trimmed.check(Schema.isNonEmpty()) }
) {}

/** A decoded curriculum contains the same stable node identity twice. */
export class CurriculumDuplicateError extends Schema.TaggedError<CurriculumDuplicateError>()(
  "CurriculumDuplicateError",
  {
    nodeKey: CurriculumNodeKeySchema,
    programKey: LearningProgramKeySchema,
  }
) {}

/** Adds the helper-owned navigation level to one encoded structure node. */
function structureNode(
  level: ProgramNavigationLevel,
  input: StructureNodeInput
): CurriculumStructureInput {
  return { ...input, level };
}

/** Defines one class-level curriculum structure node. */
export function classNode(input: StructureNodeInput): CurriculumStructureInput {
  return structureNode("class", input);
}

/** Defines one subject-level curriculum structure node. */
export function subjectNode(
  input: StructureNodeInput
): CurriculumStructureInput {
  return structureNode("subject", input);
}

/** Defines one course-level curriculum structure node. */
export function courseNode(
  input: StructureNodeInput
): CurriculumStructureInput {
  return structureNode("course", input);
}

/** Defines one official stage-level curriculum structure node. */
export function stageNode(input: StructureNodeInput): CurriculumStructureInput {
  return structureNode("stage", input);
}

/** Defines one unit-level curriculum structure node. */
export function unitNode(input: StructureNodeInput): CurriculumStructureInput {
  return structureNode("unit", input);
}

/** Defines one material-reference curriculum leaf. */
export function materialNode(
  input: CurriculumMaterialInput
): CurriculumMaterialInput {
  return input;
}

/** Flattens one authored tree in pre-order for identity validation. */
function flattenCurriculumTree(
  nodes: readonly CurriculumTreeNode[]
): CurriculumTreeNode[] {
  return Arr.flatMap(nodes, (node) =>
    "children" in node && node.children
      ? [node, ...flattenCurriculumTree(node.children)]
      : [node]
  );
}

/** Strictly decodes one authored curriculum and rejects duplicate node keys. */
export const defineCurriculum = Effect.fn("AksaraCorpus.defineCurriculum")(
  function* (input: CurriculumSourceInput) {
    const curriculum = yield* Schema.decodeEffect(CurriculumSourceSchema)(
      input,
      { onExcessProperty: "error" }
    ).pipe(
      Effect.mapError(
        (cause) =>
          new CurriculumDecodeError({
            cause,
            message: "Curriculum source decoding failed.",
          })
      )
    );
    const nodeKeys = MutableHashSet.empty<string>();
    for (const node of flattenCurriculumTree(curriculum.tree)) {
      if (MutableHashSet.has(nodeKeys, node.key)) {
        return yield* new CurriculumDuplicateError({
          nodeKey: node.key,
          programKey: curriculum.programKey,
        });
      }
      MutableHashSet.add(nodeKeys, node.key);
    }
    return curriculum;
  }
);
