import { FigureNodeSchema } from "@nakafa/aksara-contracts/assessment/figure";
import type { RichText } from "@nakafa/aksara-contracts/assessment/inline";
import type { ContentTreeElement } from "@nakafa/aksara-contracts/tree";
import {
  answerState,
  FigureNameSchema,
  type VisualName,
} from "@nakafa/aksara-contracts/visual/catalog";
import { Array as Arr, Effect, Option, Predicate, Schema } from "effect";
import { type BlockSite, sourceError } from "#compiler/assessment/error";
import { plainText } from "#compiler/assessment/inline";
import { decodeTreeProps } from "#compiler/tree/catalog";

/** Checks whether decoded rich text is the words of a description. */
function isRichText(value: unknown): value is RichText {
  return Arr.isArray(value) && Arr.isArrayNonEmpty(value);
}

/**
 * Reads the text alternative of a figure: the `alt` an author wrote, or else
 * the words of its description, which say what the figure shows.
 */
function altOf(element: ContentTreeElement, props: unknown, site: BlockSite) {
  const { alt } = element.props;
  if (Predicate.isString(alt)) {
    return Effect.succeed(alt.trim());
  }
  const description = Predicate.hasProperty(props, "description")
    ? props.description
    : undefined;
  if (isRichText(description)) {
    return Effect.succeed(plainText(description));
  }
  return Effect.fail(sourceError(site, element.name, "props"));
}

/** Reads the figure component that an element names, if it names one. */
export function figureComponent(element: ContentTreeElement) {
  return Option.liftPredicate(element.name, Schema.is(FigureNameSchema));
}

/**
 * Refuses answer state where a learner reads before answering: a prompt, a
 * shared reading, or an option label. An explanation may show everything.
 */
function hideAnswer(
  element: ContentTreeElement,
  component: VisualName,
  props: unknown,
  site: BlockSite
) {
  const answers = answerState(component, props);
  if (site.answers === "shown" || Arr.isReadonlyArrayEmpty(answers)) {
    return Effect.void;
  }
  return Effect.fail(sourceError(site, element.name, "answer", answers));
}

/**
 * Converts one figure component into a figure node: the props its catalog
 * schema reads from the tree, its text alternative, and no caption. A figure
 * where a learner reads before answering holds no answer state. The catalog
 * schema has checked the props already, so a node that its contract then
 * refuses is a defect, not an authoring failure.
 */
export const figureNode = Effect.fn("AksaraCompiler.figureNode")(function* (
  element: ContentTreeElement,
  component: VisualName,
  site: BlockSite
) {
  const { alt: _alt, ...authored } = element.props;
  const props = yield* decodeTreeProps(component, authored).pipe(
    Effect.mapError((issue) => sourceError(site, element.name, "props", issue))
  );
  yield* hideAnswer(element, component, props, site);
  const alt = yield* altOf(element, props, site);
  return yield* Schema.decodeUnknownEffect(FigureNodeSchema)(
    {
      attrs: { alt, caption: null, component, props },
      type: "figure",
    },
    { onExcessProperty: "error" }
  ).pipe(Effect.orDie);
});
