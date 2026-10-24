import { Array as Arr, Order, Predicate, Record as Rec, Schema } from "effect";
import { encodeJsonText } from "#contracts/text/json";

/** Key that only an element may carry, so a plain JSON object can never imitate one. */
const ELEMENT_KEY = "$node";
/** Name of the element that renders its children without an element of its own. */
const FRAGMENT_NAME = "fragment";
/** Renderer components are capitalized JSX names, never intrinsic tags. */
const COMPONENT_NAME_PATTERN = /^[A-Z][A-Za-z0-9]*$/;

/** Intrinsic HTML tags that the Markdown and MDX pipeline may emit, in code-unit order. */
export const CONTENT_TREE_INTRINSIC_TAGS = [
  "a",
  "blockquote",
  "br",
  "code",
  "del",
  "div",
  "em",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hr",
  "img",
  "input",
  "li",
  "ol",
  "p",
  "pre",
  "section",
  "strong",
  "sub",
  "sup",
  "table",
  "tbody",
  "td",
  "th",
  "thead",
  "tr",
  "ul",
] as const;

/** One intrinsic HTML tag from the allowed pipeline list. */
export const ContentTreeIntrinsicTagSchema = Schema.Literals(
  CONTENT_TREE_INTRINSIC_TAGS
);

/** The element name of one tree node: the fragment, an intrinsic tag, or a renderer component. */
export const ContentTreeElementNameSchema = Schema.Union([
  Schema.Literal(FRAGMENT_NAME),
  ContentTreeIntrinsicTagSchema,
  Schema.String.check(Schema.isPattern(COMPONENT_NAME_PATTERN)),
]);
export type ContentTreeElementName = typeof ContentTreeElementNameSchema.Type;

/**
 * A value a prop or a list may hold: JSON data, an element of the tree, or a
 * plain JSON object whose values are tree values. The recursive shapes are
 * object members of this union, which is how the repository names recursive
 * Schema types, so the element and props names below are derived from it.
 */
export type ContentTreeValue =
  | null
  | boolean
  | number
  | string
  | readonly ContentTreeValue[]
  | {
      readonly $node: "element";
      readonly children: readonly ContentTreeChild[];
      readonly name: ContentTreeElementName;
      readonly props: { readonly [key: string]: ContentTreeValue };
    }
  | { readonly [key: string]: ContentTreeValue };

/** One rendered node: its name, its props, and its ordered children. */
export type ContentTreeElement = Extract<
  ContentTreeValue,
  { readonly $node: "element" }
>;

/** Named props of one element, each a JSON value or an element of the tree. */
export type ContentTreeProps = ContentTreeElement["props"];

/** Text, or one element in the order React would render it. */
export type ContentTreeChild = string | ContentTreeElement;

/** Rejects a props object that uses the reserved element key. */
function hasNoElementKey(props: ContentTreeProps) {
  return !Predicate.hasProperty(props, ELEMENT_KEY);
}

/** Any prop value: JSON data or a nested element. */
const ContentTreeValueSchema: Schema.Codec<ContentTreeValue> = Schema.suspend(
  (): Schema.Codec<ContentTreeValue> =>
    Schema.Union([
      Schema.Null,
      Schema.Boolean,
      Schema.Finite,
      Schema.String,
      Schema.Array(ContentTreeValueSchema),
      ContentTreeElementSchema,
      ContentTreePropsSchema,
    ])
);

/** Props of one element or one plain JSON object, never carrying the element key. */
const ContentTreePropsSchema: Schema.Codec<ContentTreeProps> = Schema.suspend(
  (): Schema.Codec<ContentTreeProps> =>
    Schema.Record(Schema.String, ContentTreeValueSchema).check(
      Schema.makeFilter(hasNoElementKey, {
        message: "Expected props without the reserved element key.",
      })
    )
);

/** Text or a nested element. */
const ContentTreeChildSchema: Schema.Codec<ContentTreeChild> = Schema.suspend(
  (): Schema.Codec<ContentTreeChild> =>
    Schema.Union([Schema.String, ContentTreeElementSchema])
);

/**
 * One element of the tree, with its reserved marker and its exact fields. The
 * signed bytes come from canonicalizeContentTree, never from the key order of a
 * decoded object, which the repository's formatter keeps alphabetical.
 */
const ContentTreeElementSchema: Schema.Codec<ContentTreeElement> =
  Schema.Struct({
    $node: Schema.Literal("element"),
    children: Schema.Array(ContentTreeChildSchema),
    name: ContentTreeElementNameSchema,
    props: ContentTreePropsSchema,
  });

/** The signed content tree: the fragment that Nakafa renders with its component map. */
export const ContentTreeSchema = ContentTreeElementSchema.check(
  Schema.makeFilter((tree) => tree.name === FRAGMENT_NAME, {
    message: "Expected the fragment as the content tree root.",
  })
);

/** Checks whether a tree value is an element rather than JSON data. */
function isElement(value: ContentTreeValue): value is ContentTreeElement {
  return (
    Predicate.isObject(value) &&
    !Arr.isArray(value) &&
    Predicate.hasProperty(value, ELEMENT_KEY)
  );
}

/** Checks whether a tree value is a list of tree values. */
function isList(value: ContentTreeValue): value is readonly ContentTreeValue[] {
  return Arr.isArray(value);
}

/** Checks whether a tree value is a plain props object. */
function isProps(value: ContentTreeValue): value is ContentTreeProps {
  return Predicate.isObject(value);
}

/**
 * Writes one props object as JSON text with its keys in code-unit order. The
 * text is assembled by hand, so no formatter or key sort can change its bytes.
 */
function canonicalPropsText(props: ContentTreeProps): string {
  const entries = Arr.sortWith(
    Rec.toEntries(props),
    ([key]) => key,
    Order.String
  );
  const texts = Arr.map(
    entries,
    ([key, value]) => `${encodeJsonText(key)}:${canonicalValueText(value)}`
  );
  return `{${Arr.join(texts, ",")}}`;
}

/** Writes one tree value as JSON text in the one canonical form. */
function canonicalValueText(value: ContentTreeValue): string {
  if (isElement(value)) {
    return canonicalElementText(value);
  }
  if (isList(value)) {
    return `[${Arr.join(Arr.map(value, canonicalValueText), ",")}]`;
  }
  if (isProps(value)) {
    return canonicalPropsText(value);
  }
  return encodeJsonText(value);
}

/** Writes one element as JSON text with its fields in the declared order. */
function canonicalElementText(element: ContentTreeElement): string {
  const children = Arr.join(
    Arr.map(element.children, (child) =>
      typeof child === "string"
        ? encodeJsonText(child)
        : canonicalElementText(child)
    ),
    ","
  );
  return `{"$node":"element","name":${encodeJsonText(element.name)},"props":${canonicalPropsText(element.props)},"children":[${children}]}`;
}

/** Serializes the tree as the exact JSON text that hashes and signatures cover. */
export function canonicalizeContentTree(tree: ContentTreeElement): string {
  return canonicalElementText(tree);
}

/** Checks whether an element name is a renderer component, not the fragment or an intrinsic tag. */
function isComponentElementName(name: ContentTreeElementName) {
  return (
    name !== FRAGMENT_NAME && !Schema.is(ContentTreeIntrinsicTagSchema)(name)
  );
}

/** Collects the component names of one element and of every element nested beneath it. */
function componentNamesOfElement(
  element: ContentTreeElement
): readonly string[] {
  const own = isComponentElementName(element.name) ? [element.name] : [];
  return [
    ...own,
    ...Arr.flatMap(element.children, (child) =>
      typeof child === "string" ? [] : componentNamesOfElement(child)
    ),
    ...Arr.flatMap(Rec.values(element.props), componentNamesOfValue),
  ];
}

/** Collects the component names of one prop value, which may hold lists, objects, and elements. */
function componentNamesOfValue(value: ContentTreeValue): readonly string[] {
  if (isElement(value)) {
    return componentNamesOfElement(value);
  }
  if (isList(value)) {
    return Arr.flatMap(value, componentNamesOfValue);
  }
  if (isProps(value)) {
    return Arr.flatMap(Rec.values(value), componentNamesOfValue);
  }
  return [];
}

/** Lists the renderer components that one tree uses, once each, in first-use order. */
export function contentTreeComponentNames(
  tree: ContentTreeElement
): readonly string[] {
  return Arr.dedupe(componentNamesOfElement(tree));
}
