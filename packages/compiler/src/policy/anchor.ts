import type { ContentKey } from "@nakafa/aksara-contracts/ids";
import { ContentKeySchema } from "@nakafa/aksara-contracts/ids";
import {
  Array as Arr,
  Effect,
  HashMap,
  MutableList,
  Option,
  Predicate,
  Schema,
} from "effect";
import type { Heading, Root } from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

const INLINE_MATH_MARKUP = /<InlineMath[^>]*math="(?<math>[^"]*)"[^>]*\/>/gu;
const BLOCK_MATH_MARKUP = /<BlockMath[^>]*math="(?<math>[^"]*)"[^>]*\/>/gu;
const CODE_BLOCK_MARKUP = /<CodeBlock[^>]*\/>/gu;
const MARKUP = /<[^>]*>/gu;
const LATEX_COMMAND = /\\(?<command>[a-zA-Z]+)/gu;
const WHITESPACE = /\s+/gu;

/** One positive source coordinate. */
const PositionSchema = Schema.Finite.pipe(
  Schema.check(Schema.isInt()),
  Schema.check(Schema.isGreaterThan(0))
);

/** One heading whose anchor an earlier heading of the same source already renders. */
const AuthoredHeadingAnchorOccurrenceSchema = Schema.Struct({
  anchor: Schema.String,
  column: PositionSchema,
  firstLine: PositionSchema,
  line: PositionSchema,
});
type AuthoredHeadingAnchorOccurrence =
  typeof AuthoredHeadingAnchorOccurrenceSchema.Type;

/**
 * Two headings of one source render the same anchor, so the page outline
 * links both entries to the first heading and the second is unreachable.
 */
export class AuthoredHeadingAnchorError extends Schema.TaggedError<
  AuthoredHeadingAnchorError,
  { readonly brand: unique symbol }
>()("AuthoredHeadingAnchorError", {
  contentKey: ContentKeySchema,
  occurrences: Schema.Array(AuthoredHeadingAnchorOccurrenceSchema).pipe(
    Schema.check(Schema.isMinLength(1))
  ),
}) {}

/**
 * The readable label nakafa.com shows for a heading's words, as its
 * `createHeadingLabel` builds it: the source of each math component, a marker
 * for a code block, no other markup, and each LaTeX command by its name.
 */
export function headingLabel(text: string): string {
  return text
    .replace(INLINE_MATH_MARKUP, "$1")
    .replace(BLOCK_MATH_MARKUP, "$1")
    .replace(CODE_BLOCK_MARKUP, "[Code]")
    .replace(MARKUP, "")
    .replace(LATEX_COMMAND, "$1")
    .trim();
}

/**
 * The anchor nakafa.com gives a heading, as its `createHeadingId` builds it:
 * the readable label in lower case with each run of whitespace as one hyphen.
 * Anchors are not de-duplicated there, so two headings with one anchor collide.
 */
export function headingAnchor(text: string): string {
  return headingLabel(text).toLowerCase().replace(WHITESPACE, "-");
}

/** Reads the literal `math` prop of one inline JSX element, when it has one. */
function mathProp(node: object): Option.Option<string> {
  const attributes =
    Predicate.hasProperty(node, "attributes") && Arr.isArray(node.attributes)
      ? node.attributes
      : [];
  return Arr.findFirst(attributes, (attribute: unknown) =>
    Predicate.hasProperty(attribute, "name") &&
    attribute.name === "math" &&
    Predicate.hasProperty(attribute, "value") &&
    Predicate.isString(attribute.value)
      ? Option.some(attribute.value)
      : Option.none()
  );
}

/**
 * The words of one heading node as the rendered page reads them: its text,
 * and the source of each formula, which stands in a `math` prop instead of
 * the component's children. This mirrors nakafa.com's `textOf`. It reads any
 * Markdown or MDX node, so the compiler's tree and the content skill's parser
 * share one reading.
 */
export function headingWords(node: unknown): string {
  if (!Predicate.hasProperty(node, "type")) {
    return "";
  }
  if (node.type === "text" || node.type === "inlineCode") {
    return Predicate.hasProperty(node, "value") ? String(node.value) : "";
  }
  const math =
    node.type === "mdxJsxTextElement" ? mathProp(node) : Option.none();
  return Option.getOrElse(math, () =>
    Predicate.hasProperty(node, "children") && Arr.isArray(node.children)
      ? Arr.join(Arr.map(node.children, headingWords), "")
      : ""
  );
}

/** Creates one compiler policy that rejects two headings with one anchor. */
export function createAnchorPolicy(contentKey: ContentKey) {
  const occurrences = MutableList.make<AuthoredHeadingAnchorOccurrence>();
  /** Records every heading whose anchor an earlier heading already renders. */
  const remarkPlugin: Plugin<[], Root> = () => (tree) => {
    let seen = HashMap.empty<string, number>();
    visit(tree, "heading", (node: Heading) => {
      const anchor = headingAnchor(headingWords(node));
      const line = node.position?.start.line ?? 1;
      if (anchor === "") {
        return;
      }
      Option.match(HashMap.get(seen, anchor), {
        onNone: () => {
          seen = HashMap.set(seen, anchor, line);
        },
        onSome: (firstLine) => {
          MutableList.append(occurrences, {
            anchor,
            column: node.position?.start.column ?? 1,
            firstLine,
            line,
          });
        },
      });
    });
  };

  /** Rejects every collision recorded by the completed remark pass. */
  const validate = Effect.fn("AksaraCompiler.validateAnchorPolicy")(
    function* () {
      if (occurrences.length > 0) {
        return yield* new AuthoredHeadingAnchorError({
          contentKey,
          occurrences: MutableList.toArray(occurrences),
        });
      }
    }
  );

  return { remarkPlugin, validate };
}
