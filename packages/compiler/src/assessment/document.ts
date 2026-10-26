import { compile } from "@mdx-js/mdx";
import type { BlockNode } from "@nakafa/aksara-contracts/assessment/document";
import { ContentDocumentSchema } from "@nakafa/aksara-contracts/assessment/document";
import { Array as Arr, Effect, HashSet, Schema } from "effect";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { blockChildren } from "#compiler/assessment/block";
import {
  AssessmentSiteSchema,
  sourceError,
} from "#compiler/assessment/error";
import { FIGURE_COMPONENTS } from "#compiler/assessment/figure";
import { MDX_PROVIDER_SOURCE } from "#compiler/config";
import { MdxCompilationError } from "#compiler/errors";
import { createSourcePolicy } from "#compiler/policy/source";
import { evaluateContentTree } from "#compiler/tree/evaluate";

/**
 * The components an assessment source may use: the two formula components and
 * the figures. Every other element is Markdown, so one authored document has
 * one form, and the document holds exactly what its source says.
 */
export const ASSESSMENT_COMPONENTS = [
  "BlockMath",
  "InlineMath",
  ...FIGURE_COMPONENTS,
];

/** One authored assessment source: a prompt, a shared reading, or an explanation. */
export const AssessmentSourceSchema = Schema.Struct({
  ...AssessmentSiteSchema.fields,
  rawMdx: Schema.String,
});
export type AssessmentSource = typeof AssessmentSourceSchema.Type;

/**
 * Compiles one trusted assessment source into the blocks of a document. The
 * MDX is evaluated once, under the same source policy as every other authored
 * document, and its element tree becomes the nodes of the Assessment Document.
 * The source holds no module code, not even metadata: a document is data.
 */
export const compileAssessmentBlocks = Effect.fn(
  "AksaraCompiler.compileAssessmentBlocks"
)(function* (source: AssessmentSource) {
  const site = { contentKey: source.contentKey, sourcePath: source.sourcePath };
  const policy = createSourcePolicy(
    source.contentKey,
    source.sourcePath,
    HashSet.fromIterable(ASSESSMENT_COMPONENTS)
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
    componentNames: ASSESSMENT_COMPONENTS,
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
 * Compiles a source that places no interaction, a shared reading or an
 * explanation, into its document, which the contract checks as a whole.
 */
export const compileContentDocument = Effect.fn(
  "AksaraCompiler.compileContentDocument"
)(function* (source: AssessmentSource) {
  const content = yield* compileAssessmentBlocks(source);
  const site = { contentKey: source.contentKey, sourcePath: source.sourcePath };
  return yield* Schema.decodeUnknownEffect(ContentDocumentSchema)(
    { content, type: "doc" },
    { onExcessProperty: "error" }
  ).pipe(
    Effect.mapError((cause) => sourceError(site, "fragment", "document", cause))
  );
});
