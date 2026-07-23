import { ContentLocaleSchema } from "@nakafa/aksara-contracts/content";
import { Schema } from "effect";

import { MaterialCardDescriptionSchema } from "#corpus/material/description";
import { MaterialDomainSchema } from "#corpus/material/domain";
import { type MaterialKey, MaterialKeySchema } from "#corpus/material/schema";
import { LearningProgramKeySchema } from "#corpus/program/keys";
import {
  ProgramNavigationIconKeySchema,
  type ProgramNavigationLevel,
  ProgramNavigationLevelSchema,
} from "#corpus/program/navigation";
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

interface CurriculumStructureEncoded {
  readonly children?: readonly CurriculumTreeEncoded[] | undefined;
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

interface CurriculumMaterialEncoded {
  readonly displayOverride?: EncodedTranslationMap | undefined;
  readonly key: string;
  readonly level: ProgramNavigationLevel;
  readonly materialKeys: readonly string[];
  readonly order: number;
}

type CurriculumTreeEncoded =
  | CurriculumMaterialEncoded
  | CurriculumStructureEncoded;

const CurriculumStructureNodeSchema = Schema.Struct({
  children: Schema.optional(
    Schema.Array(
      Schema.suspend(
        (): Schema.Schema<CurriculumTreeNode, CurriculumTreeEncoded> =>
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
  CurriculumTreeEncoded
> = Schema.Union(CurriculumMaterialNodeSchema, CurriculumStructureNodeSchema);

const CurriculumSourceSchema = Schema.Struct({
  programKey: LearningProgramKeySchema,
  tree: Schema.Array(CurriculumTreeNodeSchema),
});
export type CurriculumSource = typeof CurriculumSourceSchema.Type;

type CurriculumSourceInput = Omit<
  typeof CurriculumSourceSchema.Encoded,
  "tree"
> & {
  readonly tree: readonly CurriculumTreeNode[];
};
type StructureNodeInput = Omit<
  typeof CurriculumStructureNodeSchema.Encoded,
  "children" | "level"
> & {
  readonly children?: readonly CurriculumTreeNode[];
};
type MaterialNodeInput = Omit<
  typeof CurriculumMaterialNodeSchema.Encoded,
  "level"
> & {
  readonly level: ProgramNavigationLevel;
};

/** A curriculum source contains the same node key more than once. */
export class CurriculumSourceDefinitionError extends Schema.TaggedError<CurriculumSourceDefinitionError>()(
  "CurriculumSourceDefinitionError",
  { message: Schema.String }
) {}

/** Decodes one structure node with its helper-owned navigation level. */
function structureNode(
  level: ProgramNavigationLevel,
  input: StructureNodeInput
): CurriculumStructureNode {
  return Schema.decodeUnknownSync(CurriculumStructureNodeSchema)({
    ...input,
    level,
  });
}

/** Defines one class-level curriculum structure node. */
export function classNode(input: StructureNodeInput): CurriculumStructureNode {
  return structureNode("class", input);
}

/** Defines one subject-level curriculum structure node. */
export function subjectNode(
  input: StructureNodeInput
): CurriculumStructureNode {
  return structureNode("subject", input);
}

/** Defines one course-level curriculum structure node. */
export function courseNode(input: StructureNodeInput): CurriculumStructureNode {
  return structureNode("course", input);
}

/** Defines one official stage-level curriculum structure node. */
export function stageNode(input: StructureNodeInput): CurriculumStructureNode {
  return structureNode("stage", input);
}

/** Defines one unit-level curriculum structure node. */
export function unitNode(input: StructureNodeInput): CurriculumStructureNode {
  return structureNode("unit", input);
}

/** Defines one material-reference curriculum leaf. */
export function materialNode(input: MaterialNodeInput): CurriculumMaterialNode {
  return Schema.decodeUnknownSync(CurriculumMaterialNodeSchema)(input);
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

/** Decodes one curriculum and rejects duplicate node keys. */
export function defineCurriculum(
  input: CurriculumSourceInput
): CurriculumSource {
  const curriculum = Schema.decodeUnknownSync(CurriculumSourceSchema)(input);
  const nodeKeys = new Set<string>();
  for (const node of flattenCurriculumTree(curriculum.tree)) {
    if (nodeKeys.has(node.key)) {
      throw new CurriculumSourceDefinitionError({
        message: `Duplicate curriculum node ${node.key} in ${curriculum.programKey}.`,
      });
    }
    nodeKeys.add(node.key);
  }
  return curriculum;
}
