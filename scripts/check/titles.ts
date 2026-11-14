import { Array as Arr, Option, Predicate, Schema } from "effect";
import {
  attributeEstree,
  type MdxAttribute,
  type MdxNode,
  parseLessonMdx,
  visitMdxNodes,
  walkEstreeDeep,
} from "#nakafa-content/mdx/parse";

/** Where the parser placed an element; the MDX parser always records it. */
const PlacedSchema = Schema.Struct({
  name: Schema.String,
  position: Schema.Struct({
    start: Schema.Struct({ column: Schema.Finite, line: Schema.Finite }),
  }),
});

/** Everything but letters and digits, which normalising a title drops. */
const NON_WORD_PATTERN = /[^\p{L}\p{N}]+/gu;

/**
 * Reads the words an attribute renders: its string, or the text and the
 * strings of its JSX, such as the source of an inline formula.
 */
function attributeText(attribute: MdxAttribute) {
  if (Predicate.isString(attribute.value)) {
    return attribute.value;
  }
  const estree = attributeEstree(attribute);
  if (estree === undefined) {
    return "";
  }
  let text = "";
  walkEstreeDeep(estree, (node) => {
    if (
      (node.type === "JSXText" || node.type === "Literal") &&
      Predicate.isString(node.value)
    ) {
      text = `${text} ${node.value}`;
    }
  });
  return text;
}

/** Folds case, accents, punctuation and whitespace away, leaving the words. */
export function normalizeCopy(text: string) {
  return text.normalize("NFKD").toLowerCase().replaceAll(NON_WORD_PATTERN, "");
}

/** Reads the text of one named attribute of an element, if it has one. */
function namedText(node: MdxNode, name: string) {
  return Option.map(
    Arr.findFirst(
      node.attributes ?? [],
      (attribute) => attribute.name === name
    ),
    attributeText
  );
}

/**
 * Lists every element whose description only repeats its title: the two are
 * equal once case, accents, punctuation and whitespace are folded away, as in
 * a card titled "Tempe" described as "Tempe.". A description adds what the
 * title does not carry. Each finding gives the element's line, column and name.
 */
export function redundantDescriptions(source: string) {
  let repeated: readonly MdxNode[] = [];
  visitMdxNodes(parseLessonMdx(source), (node) => {
    const title = Option.map(namedText(node, "title"), normalizeCopy);
    const description = Option.map(
      namedText(node, "description"),
      normalizeCopy
    );
    if (
      Option.isSome(title) &&
      Option.isSome(description) &&
      title.value.length > 0 &&
      title.value === description.value
    ) {
      repeated = Arr.append(repeated, node);
    }
  });
  return Arr.map(repeated, (node) => {
    const { name, position } = Schema.decodeUnknownSync(PlacedSchema)(node);
    return `${position.start.line}:${position.start.column} ${name} description repeats its title`;
  });
}
