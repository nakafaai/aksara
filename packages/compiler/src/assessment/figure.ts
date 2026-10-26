import { FigureNodeSchema } from "@nakafa/aksara-contracts/assessment/figure";
import type {
  ContentTreeElement,
  ContentTreeValue,
} from "@nakafa/aksara-contracts/tree";
import { Array as Arr, Effect, Predicate, Record as Rec, Schema } from "effect";
import {
  type AssessmentSite,
  sourceError,
} from "#compiler/assessment/error";
import {
  isTreeElement,
  plainText,
  richText,
} from "#compiler/assessment/inline";

/** The renderer components that a document draws as figures. */
export const FIGURE_COMPONENTS = [
  "Chart",
  "LineEquation",
  "MathVisual",
  "Mermaid",
  "NumberLine",
  "UnitCircle",
] as const;

/** A props object of the tree: JSON members, some of them elements of rich text. */
type TreeRecord = { readonly [key: string]: ContentTreeValue };

/** Checks whether a value is a plain object of props rather than a list, an element, or a scalar. */
function isTreeRecord(value: ContentTreeValue | undefined): value is TreeRecord {
  return (
    value !== undefined &&
    Predicate.isObject(value) &&
    !Arr.isArray(value) &&
    !isTreeElement(value)
  );
}

/** Converts one member that holds rich text, leaving a missing one for the schema to refuse. */
function richMember(
  record: TreeRecord,
  key: string,
  element: string,
  site: AssessmentSite
) {
  const value = record[key];
  if (value === undefined) {
    return Effect.succeed(record);
  }
  return Effect.map(richText(value, element, site), (text) => ({
    ...record,
    [key]: text,
  }));
}

/** Converts several rich-text members of one record, in order. */
function richMembers(
  record: TreeRecord,
  keys: readonly string[],
  element: string,
  site: AssessmentSite
) {
  return Effect.reduce(keys, record, (current, key) =>
    richMember(current, key, element, site)
  );
}

/** Converts the rich-text members of each record in one list prop. */
function richList(
  record: TreeRecord,
  key: string,
  convert: (item: TreeRecord) => Effect.Effect<TreeRecord, ReturnType<typeof sourceError>>
) {
  const list = record[key];
  if (!Arr.isArray(list)) {
    return Effect.succeed(record);
  }
  return Effect.map(
    Effect.forEach(list, (item) =>
      isTreeRecord(item) ? convert(item) : Effect.succeed(item)
    ),
    (items) => ({ ...record, [key]: items })
  );
}

/** Converts the rich text of each line label of a `LineEquation`. */
function lineEquationProps(
  props: TreeRecord,
  element: string,
  site: AssessmentSite
) {
  return richList(props, "data", (line) =>
    richList(line, "labels", (label) =>
      richMember(label, "text", element, site)
    )
  );
}

/** Converts the rich labels of each segment of a `NumberLine`. */
function numberLineProps(
  props: TreeRecord,
  element: string,
  site: AssessmentSite
) {
  return richList(props, "segments", (segment) =>
    richMembers(segment, ["endLabel", "label", "startLabel"], element, site)
  );
}

/** Converts the rich label of each anchor of a `MathVisual` scene. */
function mathVisualProps(
  props: TreeRecord,
  element: string,
  site: AssessmentSite
) {
  const { labels } = props;
  if (!isTreeRecord(labels)) {
    return Effect.succeed(props);
  }
  return Effect.map(
    richMembers(labels, Rec.keys(labels), element, site),
    (converted) => ({ ...props, labels: converted })
  );
}

/** Converts the props of one figure component into the props its contract takes. */
function figureProps(
  component: (typeof FIGURE_COMPONENTS)[number],
  props: TreeRecord,
  site: AssessmentSite
) {
  if (component === "Mermaid") {
    return Effect.succeed(props);
  }
  const card = richMembers(props, ["description", "title"], component, site);
  if (component === "LineEquation") {
    return Effect.flatMap(card, (current) =>
      lineEquationProps(current, component, site)
    );
  }
  if (component === "NumberLine") {
    return Effect.flatMap(card, (current) =>
      numberLineProps(current, component, site)
    );
  }
  if (component === "MathVisual") {
    return Effect.flatMap(card, (current) =>
      mathVisualProps(current, component, site)
    );
  }
  return card;
}

/**
 * Reads the text alternative of a figure: the `alt` an author wrote, or else
 * the words of its description, which say what the figure shows.
 */
function altOf(element: ContentTreeElement, site: AssessmentSite) {
  const { alt, description } = element.props;
  if (Predicate.isString(alt)) {
    return Effect.succeed(alt.trim());
  }
  if (description === undefined) {
    return Effect.fail(sourceError(site, element.name, "props"));
  }
  return Effect.map(
    richText(description, element.name, site),
    plainText
  );
}

/** Checks whether an element names one of the figure components. */
export function isFigure(
  element: ContentTreeElement
): element is ContentTreeElement & {
  readonly name: (typeof FIGURE_COMPONENTS)[number];
} {
  return Arr.contains(FIGURE_COMPONENTS, element.name);
}

/**
 * Converts one figure component into a figure node: its contract props, its
 * text alternative, and no caption. The contract checks the props.
 */
export const figureNode = Effect.fn("AksaraCompiler.figureNode")(function* (
  element: ContentTreeElement & {
    readonly name: (typeof FIGURE_COMPONENTS)[number];
  },
  site: AssessmentSite
) {
  const { alt: _alt, ...authored } = element.props;
  const props = yield* figureProps(element.name, authored, site);
  const alt = yield* altOf(element, site);
  return yield* Schema.decodeUnknownEffect(FigureNodeSchema)(
    {
      attrs: { alt, caption: null, component: element.name, props },
      type: "figure",
    },
    { onExcessProperty: "error" }
  ).pipe(
    Effect.mapError((cause) =>
      sourceError(site, element.name, "props", cause)
    )
  );
});
