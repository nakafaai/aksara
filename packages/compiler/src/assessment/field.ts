import type {
  BlockNode,
  InteractionNode,
} from "@nakafa/aksara-contracts/assessment/document";
import { documentPlacements } from "@nakafa/aksara-contracts/assessment/document";
import type { InlineInteractionNode } from "@nakafa/aksara-contracts/assessment/inline";
import type { ContentTreeElement } from "@nakafa/aksara-contracts/tree";
import { Array as Arr, Effect, Option, Predicate, Record as Rec } from "effect";
import type { AssessmentSite, Field } from "#compiler/assessment/error";
import { InlineError, sourceError } from "#compiler/assessment/error";

/**
 * The component that places the field of one part in a prompt, such as
 * `<Field part="a" />`: inside a line of text for a gap, or on a line of its
 * own for a block. It becomes an interaction node and never reaches a renderer.
 */
export const FIELD_COMPONENT = "Field";

/** Names one placement in an error, such as `Field part="b"`. */
function placementName(part: string) {
  return `${FIELD_COMPONENT} part="${part}"`;
}

/**
 * Reads the field that one `Field` element places. Its one prop names a part
 * of the item, and it holds no children.
 */
function fieldOf(element: ContentTreeElement, fields: readonly Field[]) {
  const { part, ...rest } = element.props;
  const name = Predicate.isString(part) ? part : "?";
  const found =
    Rec.isEmptyRecord(rest) && Arr.isReadonlyArrayEmpty(element.children)
      ? Arr.findFirst(fields, (field) => field.part === name)
      : Option.none();
  return Effect.fromOption(found).pipe(
    Effect.mapError(
      () => new InlineError({ element: placementName(name), reason: "props" })
    )
  );
}

/** Places a field on a line of its own, as every kind of field may sit. */
export function blockField(
  element: ContentTreeElement,
  fields: readonly Field[]
): Effect.Effect<InteractionNode, InlineError> {
  return Effect.map(fieldOf(element, fields), ({ interaction }) => ({
    attrs: { interaction },
    type: "interaction",
  }));
}

/**
 * Places a field inside a line of text, which only a text, number, or math
 * entry may: a written answer needs room of its own.
 */
export function inlineField(
  element: ContentTreeElement,
  fields: readonly Field[]
): Effect.Effect<InlineInteractionNode, InlineError> {
  return Effect.flatMap(fieldOf(element, fields), (field) =>
    field.inline
      ? Effect.succeed({
          attrs: { gap: null, interaction: field.interaction },
          type: "inlineInteraction",
        })
      : Effect.fail(
          new InlineError({
            element: placementName(field.part),
            reason: "placement",
          })
        )
  );
}

/**
 * Requires a prompt to place each of its fields exactly once, so every part
 * of the item has one place to be answered.
 */
export function requirePlacedFields(
  blocks: readonly BlockNode[],
  fields: readonly Field[],
  site: AssessmentSite
) {
  const placed = Arr.map(
    Arr.flatMap(blocks, documentPlacements),
    ({ attrs }) => attrs.interaction
  );
  const misplaced = Arr.findFirst(
    fields,
    ({ interaction }) =>
      Arr.filter(placed, (id) => id === interaction).length !== 1
  );
  return Option.match(misplaced, {
    onNone: () => Effect.void,
    onSome: ({ part }) =>
      Effect.fail(sourceError(site, placementName(part), "placement")),
  });
}
