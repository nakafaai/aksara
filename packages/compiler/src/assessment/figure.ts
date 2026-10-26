import { FigureNodeSchema } from "@nakafa/aksara-contracts/assessment/figure";
import type {
  ContentTreeElement,
  ContentTreeProps,
  ContentTreeValue,
} from "@nakafa/aksara-contracts/tree";
import { Array as Arr, Effect, Predicate, Record as Rec, Schema } from "effect";
import {
  type AssessmentSite,
  type AssessmentSourceError,
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

/** Converted members of a props object, which the figure contract then decodes. */
type Members = Readonly<Record<string, unknown>>;

/** Checks whether a value is a plain object of props rather than a list, an element, or a scalar. */
function isTreeRecord(
  value: ContentTreeValue | undefined
): value is ContentTreeProps {
  return (
    value !== undefined &&
    Predicate.isObject(value) &&
    !Arr.isArray(value) &&
    !isTreeElement(value)
  );
}

/** Converts the named members that hold rich text, leaving a missing one for the contract to refuse. */
function richMembers(
  record: ContentTreeProps,
  keys: readonly string[],
  element: string,
  site: AssessmentSite
): Effect.Effect<Members, AssessmentSourceError> {
  return Effect.map(
    Effect.forEach(keys, (key) => {
      const value = record[key];
      return value === undefined
        ? Effect.succeed([])
        : Effect.map(richText(value, element, site), (text) => [
            [key, text] as const,
          ]);
    }),
    (entries) => Rec.fromEntries(Arr.flatten(entries))
  );
}

/** Checks whether a value of the tree is a list. */
function isTreeList(
  value: ContentTreeValue | undefined
): value is readonly ContentTreeValue[] {
  return Arr.isArray(value);
}

/** Converts the members of each record in one list prop. */
function listMember(
  record: ContentTreeProps,
  key: string,
  convert: (
    item: ContentTreeProps
  ) => Effect.Effect<Members, AssessmentSourceError>
): Effect.Effect<Members, AssessmentSourceError> {
  const list = record[key];
  if (!isTreeList(list)) {
    return Effect.succeed({});
  }
  return Effect.map(
    Effect.forEach(
      list,
      (item): Effect.Effect<unknown, AssessmentSourceError> =>
        isTreeRecord(item)
          ? Effect.map(convert(item), (members) => ({ ...item, ...members }))
          : Effect.succeed(item)
    ),
    (items) => ({ [key]: items })
  );
}

/**
 * Converts the members of one figure component that its contract takes as rich
 * text. A scene without label anchors is authored without labels, so a missing
 * `labels` is the empty record that the contract checks against the scene; the
 * authoring policy refuses labels that are no object.
 */
function componentMembers(
  component: (typeof FIGURE_COMPONENTS)[number],
  props: ContentTreeProps,
  site: AssessmentSite
): Effect.Effect<Members, AssessmentSourceError> {
  if (component === "LineEquation") {
    return listMember(props, "data", (line) =>
      listMember(line, "labels", (label) =>
        richMembers(label, ["text"], component, site)
      )
    );
  }
  if (component === "NumberLine") {
    return listMember(props, "segments", (segment) =>
      richMembers(segment, ["endLabel", "label", "startLabel"], component, site)
    );
  }
  const labels = props.labels ?? {};
  if (component !== "MathVisual" || !isTreeRecord(labels)) {
    return Effect.succeed({});
  }
  return Effect.map(
    richMembers(labels, Rec.keys(labels), component, site),
    (converted) => ({ labels: { ...labels, ...converted } })
  );
}

/** Converts the props of one figure component into the props its contract takes. */
function figureProps(
  component: (typeof FIGURE_COMPONENTS)[number],
  props: ContentTreeProps,
  site: AssessmentSite
): Effect.Effect<Members, AssessmentSourceError> {
  if (component === "Mermaid") {
    return Effect.succeed(props);
  }
  return Effect.map(
    Effect.all([
      richMembers(props, ["description", "title"], component, site),
      componentMembers(component, props, site),
    ]),
    ([card, members]) => ({ ...props, ...card, ...members })
  );
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
  return Effect.map(richText(description, element.name, site), plainText);
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
    Effect.mapError((cause) => sourceError(site, element.name, "props", cause))
  );
});
