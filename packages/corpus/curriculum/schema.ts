import { ContentLocaleSchema } from "@nakafa/aksara-contracts/content";
import {
  LearningProgramKeySchema,
  ProgramNavigationIconKeySchema,
  type ProgramNavigationLevel,
  ProgramNavigationLevelSchema,
} from "@nakafa/aksara-contracts/program/spec";
import { Effect, Schema } from "effect";

import { MaterialCardDescriptionSchema } from "#corpus/material/description";
import { MaterialDomainSchema } from "#corpus/material/domain";
import { type MaterialKey, MaterialKeySchema } from "#corpus/material/schema";
import { PublicRouteSegmentSchema } from "#corpus/route/schema";

const CURRICULUM_NODE_KEY_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;

const CurriculumNodeKeySchema = Schema.String.pipe(
  Schema.pattern(CURRICULUM_NODE_KEY_PATTERN, {
    description: "Lowercase kebab-case curriculum node key.",
    identifier: "CurriculumNodeKey",
    message: () => "Invalid curriculum node key.",
  })
);

const CurriculumNodeTranslationSchema = Schema.Struct({
  routeSlug: PublicRouteSegmentSchema,
  title: Schema.String,
});

const CurriculumNodeTranslationMapSchema = Schema.Record({
  key: ContentLocaleSchema,
  value: CurriculumNodeTranslationSchema,
});

const CurriculumDisplayGroupMapSchema = Schema.Record({
  key: ContentLocaleSchema,
  value: Schema.Struct({ title: Schema.String }),
});

const CurriculumMaterialCardMapSchema = Schema.Record({
  key: ContentLocaleSchema,
  value: Schema.Struct({
    description: MaterialCardDescriptionSchema,
    title: Schema.String,
  }),
});

type TranslationMap = typeof CurriculumNodeTranslationMapSchema.Type;
type EncodedTranslationMap = typeof CurriculumNodeTranslationMapSchema.Encoded;

export interface CurriculumStructureNode {
  readonly children?: readonly CurriculumTreeNode[] | undefined;
  readonly displayGroup?:
    | typeof CurriculumDisplayGroupMapSchema.Type
    | undefined;
  readonly displayGroupIconKey?:
    | typeof ProgramNavigationIconKeySchema.Type
    | undefined;
  readonly iconKey?: typeof ProgramNavigationIconKeySchema.Type | undefined;
  readonly key: string;
  readonly level: ProgramNavigationLevel;
  readonly materialCard?:
    | typeof CurriculumMaterialCardMapSchema.Type
    | undefined;
  readonly materialDomain?: typeof MaterialDomainSchema.Type | undefined;
  readonly order: number;
  readonly translations: TranslationMap;
}

export interface CurriculumMaterialNode {
  readonly displayOverride?: TranslationMap | undefined;
  readonly key: string;
  readonly level: ProgramNavigationLevel;
  readonly materialKeys: readonly MaterialKey[];
  readonly order: number;
}

export type CurriculumTreeNode =
  | CurriculumMaterialNode
  | CurriculumStructureNode;

export interface CurriculumStructureInput {
  readonly children?: readonly CurriculumTreeInput[] | undefined;
  readonly displayGroup?:
    | typeof CurriculumDisplayGroupMapSchema.Encoded
    | undefined;
  readonly displayGroupIconKey?:
    | typeof ProgramNavigationIconKeySchema.Encoded
    | undefined;
  readonly iconKey?: typeof ProgramNavigationIconKeySchema.Encoded | undefined;
  readonly key: string;
  readonly level: ProgramNavigationLevel;
  readonly materialCard?:
    | typeof CurriculumMaterialCardMapSchema.Encoded
    | undefined;
  readonly materialDomain?: typeof MaterialDomainSchema.Encoded | undefined;
  readonly order: number;
  readonly translations: EncodedTranslationMap;
}

export interface CurriculumMaterialInput {
  readonly displayOverride?: EncodedTranslationMap | undefined;
  readonly key: string;
  readonly level: ProgramNavigationLevel;
  readonly materialKeys: readonly string[];
  readonly order: number;
}

export type CurriculumTreeInput =
  | CurriculumMaterialInput
  | CurriculumStructureInput;

const CurriculumStructureNodeSchema = Schema.Struct({
  children: Schema.optional(
    Schema.Array(
      Schema.suspend(
        (): Schema.Schema<CurriculumTreeNode, CurriculumTreeInput> =>
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
  order: Schema.Int.pipe(Schema.nonNegative()),
  translations: CurriculumNodeTranslationMapSchema,
});

const CurriculumMaterialNodeSchema = Schema.Struct({
  displayOverride: Schema.optional(CurriculumNodeTranslationMapSchema),
  key: CurriculumNodeKeySchema,
  level: ProgramNavigationLevelSchema,
  materialKeys: Schema.Array(MaterialKeySchema).pipe(Schema.minItems(1)),
  order: Schema.Int.pipe(Schema.nonNegative()),
});

const CurriculumTreeNodeSchema: Schema.Schema<
  CurriculumTreeNode,
  CurriculumTreeInput
> = Schema.Union(CurriculumMaterialNodeSchema, CurriculumStructureNodeSchema);

const CurriculumSourceSchema = Schema.Struct({
  programKey: LearningProgramKeySchema,
  tree: Schema.Array(CurriculumTreeNodeSchema),
});
export type CurriculumSource = typeof CurriculumSourceSchema.Type;

export type CurriculumSourceInput = typeof CurriculumSourceSchema.Encoded;
type StructureNodeInput = Omit<
  typeof CurriculumStructureNodeSchema.Encoded,
  "children" | "level"
> & {
  readonly children?: readonly CurriculumTreeInput[];
};
type MaterialNodeInput = Omit<
  typeof CurriculumMaterialNodeSchema.Encoded,
  "level"
> & {
  readonly level: ProgramNavigationLevel;
};

/** A curriculum source failed strict schema decoding at its definition seam. */
export class CurriculumDecodeError extends Schema.TaggedError<CurriculumDecodeError>()(
  "CurriculumDecodeError",
  { cause: Schema.Unknown, message: Schema.NonEmptyTrimmedString }
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
  input: MaterialNodeInput
): CurriculumMaterialInput {
  return input;
}

/** Flattens one authored tree in pre-order for identity validation. */
function flattenCurriculumTree(
  nodes: readonly CurriculumTreeNode[]
): CurriculumTreeNode[] {
  const flattened: CurriculumTreeNode[] = [];
  for (const node of nodes) {
    flattened.push(node);
    if ("children" in node && node.children) {
      flattened.push(...flattenCurriculumTree(node.children));
    }
  }
  return flattened;
}

/** Strictly decodes one authored curriculum and rejects duplicate node keys. */
export const defineCurriculum = Effect.fn("AksaraCorpus.defineCurriculum")(
  function* (input: CurriculumSourceInput) {
    const curriculum = yield* Schema.decodeUnknown(CurriculumSourceSchema)(
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
    const nodeKeys = new Set<string>();
    for (const node of flattenCurriculumTree(curriculum.tree)) {
      if (nodeKeys.has(node.key)) {
        return yield* new CurriculumDuplicateError({
          nodeKey: node.key,
          programKey: curriculum.programKey,
        });
      }
      nodeKeys.add(node.key);
    }
    return curriculum;
  }
);
