import assert from "node:assert/strict";
import { createProcessor } from "@mdx-js/mdx";
import { Effect, Predicate, Schema } from "effect";
import type { PhrasingContent } from "mdast";
import remarkGfm from "remark-gfm";
import type {} from "remark-parse";

declare module "mdast" {
  interface Data {
    altChildren?: PhrasingContent[];
  }
}

export interface SourcePosition {
  column?: number;
  line?: number;
  offset?: number;
}

export interface SourceRange {
  end?: SourcePosition;
  rendered?: {
    offsets: readonly number[];
    text: string;
  };
  start?: SourcePosition;
}

export interface MdxAttribute {
  data?: {
    estree?: EstreeNode;
  };
  name?: string;
  position?: SourceRange;
  type?: string;
  value?: unknown;
}

export interface MdxNode {
  alt?: string;
  attributes?: MdxAttribute[];
  children?: MdxNode[];
  data?: {
    altChildren?: PhrasingContent[];
    estree?: EstreeNode;
  };
  /** Heading level, present only on a `heading` node. */
  depth?: number;
  identifier?: string;
  name?: string;
  position?: SourceRange;
  title?: string;
  type: string;
  url?: string;
  value?: unknown;
}

export interface EstreeNode extends Schema.Schema.Type<typeof EstreeNodeShape> {
  [key: string]: unknown;
}

/** Known parser-owned fields on an ESTree program node. */
const EstreeNodeShape = Schema.Struct({
  end: Schema.optional(Schema.Finite),
  start: Schema.optional(Schema.Finite),
  type: Schema.String,
  value: Schema.optional(Schema.Unknown),
});

/** Parser-owned program attached to an MDX expression attribute value. */
const ExpressionAttachment = Schema.Struct({
  data: Schema.Struct({
    estree: EstreeNodeShape,
  }),
});

/** Returns one ESTree child only after checking its structural shape. */
export function asEstreeNode(value: unknown): EstreeNode | undefined {
  return Schema.is(EstreeNodeShape)(value) ? value : undefined;
}

/** Collects every ESTree child from one field value or collection. */
export function estreeChildren(value: unknown): EstreeNode[] {
  return (Array.isArray(value) ? value : [value]).flatMap((item) => {
    const child = asEstreeNode(item);
    return child ? [child] : [];
  });
}

/** Converts an ESTree offset pair into the shared source range shape. */
export function estreeRange(node: EstreeNode) {
  assert.ok(node.start !== undefined);
  assert.ok(node.end !== undefined);
  return {
    end: { offset: node.end },
    start: { offset: node.start },
  };
}

/** Reads the parser-owned program from an expression-backed MDX attribute. */
export function attributeEstree(
  attribute: MdxAttribute
): EstreeNode | undefined {
  const direct = asEstreeNode(attribute.data?.estree);
  if (direct) {
    return direct;
  }
  if (!Schema.is(ExpressionAttachment)(attribute.value)) {
    return undefined;
  }
  return asEstreeNode(attribute.value.data.estree);
}

/** Reads a static identifier or string key from an ESTree field. */
export function staticFieldName(
  node: EstreeNode | undefined
): string | undefined {
  if (node?.type === "Identifier" || node?.type === "JSXIdentifier") {
    assert.ok(Predicate.isString(node.name));
    return node.name;
  }
  return node?.type === "Literal" && Predicate.isString(node.value)
    ? node.value
    : undefined;
}

/** Typed failure for an authored MDX document the parser rejects. */
export class MdxParseError extends Schema.TaggedError<MdxParseError>()(
  "MdxParseError",
  {
    cause: Schema.Unknown,
    detail: Schema.String,
    message: Schema.String,
    sourcePath: Schema.String,
  }
) {}

/** Parses authored MDX and includes the source path in parser failures. */
export function parseLessonMdx(
  source: string,
  sourcePath = "lesson MDX"
): MdxNode {
  return Effect.runSync(
    Effect.try({
      catch: (cause) => {
        const detail = `Failed to parse ${sourcePath}: ${String(cause)}`;
        return new MdxParseError({
          cause,
          detail,
          message: detail,
          sourcePath,
        });
      },
      try: () =>
        createProcessor({ format: "mdx" })
          .use(remarkGfm)
          .data("fromMarkdownExtensions", [
            {
              exit: {
                /** Retains image label positions before mdast flattens the alt text. */
                labelMarker(token) {
                  if (this.sliceSerialize(token) !== "]") {
                    return;
                  }
                  const image = this.stack.at(-2);
                  if (image?.type !== "image") {
                    return;
                  }
                  const fragment = this.stack.at(-1);
                  assert.ok(fragment?.type === "fragment");
                  image.data = {
                    ...image.data,
                    altChildren: fragment.children,
                  };
                },
              },
            },
          ])
          // Boundary assertion: the parser always returns an mdast Root, which
          // satisfies the loose MdxNode contract at runtime. Static
          // assignability is blocked by exactOptional foreign Data shapes, so
          // this single audited assertion stands in; every untrusted read
          // below it is Schema-validated (see asEstreeNode/attributeEstree).
          .parse(source) as MdxNode,
    })
  );
}

/** Traverses authored MDX children without recursing into ESTree metadata. */
export function visitMdxNodes(
  node: MdxNode,
  visit: (current: MdxNode) => void
): void {
  visit(node);
  for (const child of node.children ?? []) {
    visitMdxNodes(child, visit);
  }
}
