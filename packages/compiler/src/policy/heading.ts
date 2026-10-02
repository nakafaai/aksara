import {
  type ContentKey,
  ContentKeySchema,
  type CorpusSourcePath,
} from "@nakafa/aksara-contracts/ids";
import { Effect, Predicate, Schema, Struct } from "effect";
import { visit as visitEstree } from "estree-util-visit";
import type { Heading, Root } from "mdast";
import { toString as mdastToString } from "mdast-util-to-string";
import type { Plugin } from "unified";
import type { Node } from "unist";
import { visit } from "unist-util-visit";
import { readNodeProgram } from "#compiler/ast/program";

const HTML_HEADING_PATTERN = /^h[1-6]$/u;

const LIST_HEADING_MARKER =
  /^(?:[0-9]{1,9}[.):]|\([0-9]{1,9}\)|[A-Za-z][.):]|\([A-Za-z]\)|[-+*•])(?=\s|$)/u;

/** Source location and marker for one list-shaped authored heading. */
const AuthoredListHeadingOccurrenceSchema = Schema.Struct({
  column: Schema.Finite.pipe(
    Schema.check(Schema.isInt()),
    Schema.check(Schema.isGreaterThan(0))
  ),
  depth: Schema.Finite.pipe(
    Schema.check(Schema.isInt()),
    Schema.check(Schema.isGreaterThan(0))
  ),
  line: Schema.Finite.pipe(
    Schema.check(Schema.isInt()),
    Schema.check(Schema.isGreaterThan(0))
  ),
  marker: Schema.Trimmed.check(Schema.isNonEmpty()),
});
type AuthoredListHeadingOccurrence =
  typeof AuthoredListHeadingOccurrenceSchema.Type;

/** Authored headings must name concepts instead of encoding list items. */
export class AuthoredListHeadingError extends Schema.TaggedError<AuthoredListHeadingError>()(
  "AuthoredListHeadingError",
  {
    contentKey: ContentKeySchema,
    occurrences: Schema.Array(AuthoredListHeadingOccurrenceSchema).pipe(
      Schema.check(Schema.isMinLength(1))
    ),
  }
) {}

/** Authored lesson and article headings cannot exceed the third level. */
export class AuthoredHeadingDepthError extends Schema.TaggedError<AuthoredHeadingDepthError>()(
  "AuthoredHeadingDepthError",
  {
    contentKey: ContentKeySchema,
    maximumDepth: Schema.Literal(3),
    occurrences: Schema.Array(
      AuthoredListHeadingOccurrenceSchema.mapFields(Struct.omit(["marker"]))
    ).pipe(Schema.check(Schema.isMinLength(1))),
  }
) {}

/** Returns the level of an explicit HTML heading, excluding component names. */
function htmlHeadingDepth(name: string | null) {
  return name !== null && HTML_HEADING_PATTERN.test(name)
    ? Number(name.slice(1))
    : 0;
}

/** Creates one source occurrence when a heading begins with a list marker. */
function listHeadingOccurrence(
  node: Heading
): AuthoredListHeadingOccurrence | undefined {
  const match: RegExpExecArray | null = LIST_HEADING_MARKER.exec(
    mdastToString(node).trim()
  );
  if (!match) {
    return;
  }
  const start = node.position?.start;
  return {
    column: start?.column ?? 1,
    depth: node.depth,
    line: start?.line ?? 1,
    marker: match[0],
  };
}

/** Creates one compiler policy for recording and rejecting list-shaped headings. */
export function createHeadingPolicy(
  contentKey: ContentKey,
  sourcePath: CorpusSourcePath
) {
  const bounded =
    sourcePath.startsWith("packages/corpus/material/lesson/") ||
    sourcePath.startsWith("packages/corpus/articles/");
  const depths: (typeof AuthoredHeadingDepthError.fields.occurrences.Type)[number][] =
    [];
  /** Records source positions for headings that exceed the owning genre's limit. */
  function recordDepth(depth: number, line: number, column: number) {
    if (bounded && depth > 3) {
      depths.push({ column, depth, line });
    }
  }
  /** Inspects JSX headings inside expressions and component properties. */
  function inspectProgram(node: Node) {
    const program = readNodeProgram(node);
    if (!program) {
      return;
    }
    visitEstree(program, (child) => {
      if (
        child.type === "JSXOpeningElement" &&
        child.name.type === "JSXIdentifier"
      ) {
        recordDepth(
          htmlHeadingDepth(child.name.name),
          child.loc?.start.line ?? 1,
          (child.loc?.start.column ?? 0) + 1
        );
      }
    });
  }
  /** Inspects literal JSX headings and their expression-valued properties. */
  function inspectJsx(
    node: Extract<
      Root["children"][number],
      { type: "mdxJsxFlowElement" | "mdxJsxTextElement" }
    >
  ) {
    recordDepth(
      htmlHeadingDepth(node.name),
      node.position?.start.line ?? 1,
      node.position?.start.column ?? 1
    );
    for (const attribute of node.attributes) {
      inspectProgram(attribute);
      if (
        attribute.type === "mdxJsxAttribute" &&
        Predicate.isNotNullish(attribute.value) &&
        !Predicate.isString(attribute.value)
      ) {
        inspectProgram(attribute.value);
      }
    }
  }
  const occurrences: AuthoredListHeadingOccurrence[] = [];
  /** Records list-shaped headings during the remark pass. */
  const remarkPlugin: Plugin<[], Root> = () => (tree) => {
    visit(tree, (node) => {
      if (node.type === "heading") {
        const occurrence = listHeadingOccurrence(node);
        if (occurrence) {
          occurrences.push(occurrence);
        }
        recordDepth(
          node.depth,
          node.position?.start.line ?? 1,
          node.position?.start.column ?? 1
        );
      }
      inspectProgram(node);
      if (
        node.type === "mdxJsxFlowElement" ||
        node.type === "mdxJsxTextElement"
      ) {
        inspectJsx(node);
      }
    });
  };

  /** Rejects every occurrence recorded by the completed remark pass. */
  const validate = Effect.fn("AksaraCompiler.validateHeadingPolicy")(
    function* () {
      if (occurrences.length > 0) {
        return yield* new AuthoredListHeadingError({
          contentKey,
          occurrences: [...occurrences],
        });
      }
      if (depths.length > 0) {
        return yield* new AuthoredHeadingDepthError({
          contentKey,
          maximumDepth: 3,
          occurrences: [...depths],
        });
      }
    }
  );

  return { remarkPlugin, validate };
}
