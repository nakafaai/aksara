import { createProcessor } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";

export interface SourcePosition {
  column?: number;
  line?: number;
  offset?: number;
}

export interface SourceRange {
  end?: SourcePosition;
  start?: SourcePosition;
}

export interface MdxAttribute {
  name?: string;
  position?: SourceRange;
  value?: unknown;
}

export interface MdxNode {
  alt?: string;
  attributes?: MdxAttribute[];
  children?: MdxNode[];
  data?: {
    estree?: EstreeNode;
  };
  name?: string;
  position?: SourceRange;
  title?: string;
  type?: string;
  url?: string;
  value?: unknown;
}

export interface EstreeNode {
  end?: number;
  start?: number;
  type: string;
  value?: unknown;
  [key: string]: unknown;
}

/** Returns one ESTree child only after checking its structural shape. */
export function asEstreeNode(value: unknown): EstreeNode | undefined {
  if (
    value &&
    typeof value === "object" &&
    "type" in value &&
    typeof value.type === "string"
  ) {
    return value as EstreeNode;
  }
  return undefined;
}

/** Converts an ESTree offset pair into the shared source range shape. */
export function estreeRange(node: EstreeNode): SourceRange | undefined {
  if (node.start === undefined || node.end === undefined) {
    return undefined;
  }
  return {
    end: { offset: node.end },
    start: { offset: node.start },
  };
}

/** Reads a static identifier or string key from an ESTree field. */
export function staticFieldName(
  node: EstreeNode | undefined
): string | undefined {
  if (node?.type === "Identifier" || node?.type === "JSXIdentifier") {
    return typeof node.name === "string" ? node.name : undefined;
  }
  return node?.type === "Literal" && typeof node.value === "string"
    ? node.value
    : undefined;
}

/** Parses authored MDX and includes the source path in parser failures. */
export function parseLessonMdx(
  source: string,
  sourcePath = "lesson MDX"
): MdxNode {
  try {
    return createProcessor({ format: "mdx" })
      .use(remarkGfm)
      .parse(source) as MdxNode;
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : String(cause);
    throw new SyntaxError(`Failed to parse ${sourcePath}: ${message}`, {
      cause,
    });
  }
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
