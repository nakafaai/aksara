import { compile } from "@mdx-js/mdx";
import type { BlockNode } from "@nakafa/aksara-contracts/assessment/document";
import { ContentDocumentSchema } from "@nakafa/aksara-contracts/assessment/document";
import { FIGURE_NAMES } from "@nakafa/aksara-contracts/visual/catalog";
import { Array as Arr, Effect, HashSet, Schema } from "effect";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { blockChildren } from "#compiler/assessment/block";
import type { BlockSite } from "#compiler/assessment/error";
import { AssessmentSiteSchema, sourceError } from "#compiler/assessment/error";
import {
  FIELD_COMPONENT,
  requirePlacedFields,
} from "#compiler/assessment/field";
import { MDX_PROVIDER_SOURCE } from "#compiler/config";
import { MdxCompilationError } from "#compiler/errors";
import { createSourcePolicy } from "#compiler/policy/source";
import { evaluateContentTree } from "#compiler/tree/evaluate";

/**
 * The components an assessment source may use: the formula components and
 * container, a highlight, the layouts that group blocks, and every figure of
 * the Visual Catalog. Every other element is Markdown, so one authored
 * document has one form, and the document holds exactly what its source says.
 */
export const ASSESSMENT_COMPONENTS = [
  "BlockMath",
  "ContentBlock",
  "ContentGrid",
  "ContentStack",
  "Highlight",
  "InlineMath",
  "MathContainer",
  ...FIGURE_NAMES,
];

/**
 * The components a prompt may use: those of every assessment source, and the
 * `Field` that places each part of an item with parts.
 */
const PROMPT_COMPONENTS = [...ASSESSMENT_COMPONENTS, FIELD_COMPONENT];

/** One authored assessment source: a prompt, a shared reading, or an explanation. */
export const AssessmentSourceSchema = Schema.Struct({
  ...AssessmentSiteSchema.fields,
  rawMdx: Schema.String,
});
export type AssessmentSource = typeof AssessmentSourceSchema.Type;

/**
 * Compiles one trusted assessment source into the blocks of a document, with
 * the components it may use and the fields it may place. The MDX is evaluated
 * once, under the same source policy as every other authored document, and
 * its element tree becomes the nodes of the Assessment Document. The source
 * holds no module code, not even metadata: a document is data.
 */
const compileBlocks = Effect.fn("AksaraCompiler.compileBlocks")(function* (
  source: AssessmentSource,
  answers: BlockSite["answers"],
  fields: BlockSite["fields"],
  components: readonly string[]
) {
  const site: BlockSite = {
    answers,
    contentKey: source.contentKey,
    fields,
    sourcePath: source.sourcePath,
  };
  const policy = createSourcePolicy(
    source.contentKey,
    source.sourcePath,
    HashSet.fromIterable(components)
  );
  const file = yield* Effect.tryPromise({
    catch: (cause) =>
      new MdxCompilationError({
        cause,
        contentKey: source.contentKey,
        message: String(cause),
      }),
    try: () =>
      compile(source.rawMdx, {
        development: false,
        format: "mdx",
        outputFormat: "function-body",
        providerImportSource: MDX_PROVIDER_SOURCE,
        remarkPlugins: [
          ...policy.remarkPlugins,
          remarkGfm,
          [remarkMath, { singleDollarTextMath: false }],
        ],
      }),
  });
  yield* policy.validate();
  const tree = yield* evaluateContentTree({
    compiledCode: String(file),
    componentNames: components,
    contentKey: source.contentKey,
    sourcePath: source.sourcePath,
  });
  const blocks = yield* blockChildren(tree.children, site);
  if (!Arr.isReadonlyArrayNonEmpty(blocks)) {
    return yield* sourceError(site, "fragment", "document");
  }
  return blocks satisfies readonly [BlockNode, ...BlockNode[]];
});

/**
 * Compiles the prompt of an item into its blocks. A learner reads it before
 * answering, so its figures hold no answer state. The prompt of an item with
 * parts places each field exactly once, where its `Field` stands; the prompt
 * of a single interaction places none, because publication puts that
 * interaction after it.
 */
export const compileAssessmentBlocks = Effect.fn(
  "AksaraCompiler.compileAssessmentBlocks"
)(function* (source: AssessmentSource, fields: BlockSite["fields"]) {
  const blocks = yield* compileBlocks(
    source,
    "hidden",
    fields,
    PROMPT_COMPONENTS
  );
  yield* requirePlacedFields(blocks, fields, source);
  return blocks;
});

/**
 * Compiles a source that places no interaction into its document, which the
 * contract checks as a whole.
 */
const compileDocument = Effect.fn("AksaraCompiler.compileDocument")(function* (
  source: AssessmentSource,
  answers: BlockSite["answers"]
) {
  const content = yield* compileBlocks(
    source,
    answers,
    [],
    ASSESSMENT_COMPONENTS
  );
  const site = { contentKey: source.contentKey, sourcePath: source.sourcePath };
  return yield* Schema.decodeEffect(ContentDocumentSchema)(
    { content, type: "doc" },
    { onExcessProperty: "error" }
  ).pipe(
    Effect.mapError((cause) => sourceError(site, "fragment", "document", cause))
  );
});

/**
 * Compiles a shared reading into its document. A learner reads it before
 * answering, so its figures hold no answer state.
 */
export const compileReadingDocument = Effect.fn(
  "AksaraCompiler.compileReadingDocument"
)((source: AssessmentSource) => compileDocument(source, "hidden"));

/**
 * Compiles an explanation into its document. A learner reads it after the
 * answer, so its figures may show everything.
 */
export const compileExplanationDocument = Effect.fn(
  "AksaraCompiler.compileExplanationDocument"
)((source: AssessmentSource) => compileDocument(source, "shown"));
