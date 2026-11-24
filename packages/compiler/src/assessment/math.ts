import type { BlockNode } from "@nakafa/aksara-contracts/assessment/document";
import type {
  ContentTreeChild,
  ContentTreeElement,
} from "@nakafa/aksara-contracts/tree";
import { Array as Arr, Effect, Option, Predicate } from "effect";
import type { BlockSite } from "#compiler/assessment/error";
import { sourceError } from "#compiler/assessment/error";

type BlockError = ReturnType<typeof sourceError>;
type MathBlockNode = Extract<BlockNode, { readonly type: "mathBlock" }>;

const CODE_LANGUAGE_PREFIX = "language-";
const CLASS_NAME_SEPARATOR = /\s+/u;

/** Checks whether a child is whitespace-only text. */
function isBlankText(child: ContentTreeChild): boolean {
  return Predicate.isString(child) && child.trim().length === 0;
}

/** Converts one `<BlockMath />` element into a `mathBlock` node. */
export function mathBlockNode(
  element: ContentTreeElement,
  site: BlockSite
): Effect.Effect<MathBlockNode, BlockError> {
  const { math } = element.props;
  if (!Predicate.isString(math) || math.trim().length === 0) {
    return Effect.fail(sourceError(site, element.name, "math"));
  }
  return Effect.succeed({
    attrs: { latex: math.trim() },
    type: "mathBlock",
  });
}

/** Converts one direct child of `<MathContainer>` into a `mathBlock` node. */
function mathContainerChild(
  child: ContentTreeChild,
  containerName: string,
  site: BlockSite
): Effect.Effect<MathBlockNode, BlockError> {
  if (Predicate.isString(child)) {
    return Effect.fail(sourceError(site, containerName, "placement"));
  }
  if (child.name !== "BlockMath") {
    return Effect.fail(sourceError(site, child.name, "placement"));
  }
  return mathBlockNode(child, site);
}

/**
 * Converts a `<MathContainer>` into a `mathContainer` node. Only `<BlockMath>`
 * rows are admitted directly inside the stack, matching lessons and articles.
 */
export function mathContainerNode(
  element: ContentTreeElement,
  site: BlockSite
): Effect.Effect<BlockNode, BlockError> {
  const children = Arr.filter(element.children, (child) => !isBlankText(child));
  if (!Arr.isReadonlyArrayNonEmpty(children)) {
    return Effect.fail(sourceError(site, element.name, "document"));
  }
  const [first, ...rest] = children;
  return Effect.all([
    mathContainerChild(first, element.name, site),
    Effect.forEach(rest, (child) =>
      mathContainerChild(child, element.name, site)
    ),
  ]).pipe(
    Effect.map(([head, tail]) => ({
      content: [head, ...tail] as const,
      type: "mathContainer" as const,
    }))
  );
}

/** Extracts the language tag from a fenced code element's `className` prop. */
function codeLanguage(element: ContentTreeElement): string | null {
  const { className } = element.props;
  if (!Predicate.isString(className)) {
    return null;
  }
  return Arr.findFirst(className.split(CLASS_NAME_SEPARATOR), (part) =>
    part.startsWith(CODE_LANGUAGE_PREFIX)
  ).pipe(
    Option.map((token) => token.slice(CODE_LANGUAGE_PREFIX.length).trim()),
    Option.filter((language) => language.length > 0),
    Option.getOrNull
  );
}

/** Converts a Markdown fenced code block (`<pre><code>`) into a `codeBlock` node. */
export function codeBlockNode(
  element: ContentTreeElement,
  site: BlockSite
): Effect.Effect<BlockNode, BlockError> {
  const inner = Arr.findFirst(
    element.children,
    (child): child is ContentTreeElement =>
      !Predicate.isString(child) && child.name === "code"
  );
  if (Option.isNone(inner)) {
    return Effect.fail(sourceError(site, element.name, "placement"));
  }
  const code = inner.value;
  const raw = Arr.join(Arr.filter(code.children, Predicate.isString), "");
  const text = raw.endsWith("\n") ? raw.slice(0, -1) : raw;
  const language = codeLanguage(code);
  return Effect.succeed(
    text.length > 0
      ? {
          attrs: { language },
          content: [{ text, type: "text" as const }],
          type: "codeBlock" as const,
        }
      : { attrs: { language }, type: "codeBlock" as const }
  );
}
