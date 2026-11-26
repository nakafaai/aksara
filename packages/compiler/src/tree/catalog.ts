import { RichTextSchema } from "@nakafa/aksara-contracts/assessment/inline";
import type {
  ContentTreeElement,
  ContentTreeProps,
  ContentTreeValue,
} from "@nakafa/aksara-contracts/tree";
import type { RichSlot } from "@nakafa/aksara-contracts/visual/card";
import type {
  VisualCatalog,
  VisualName,
} from "@nakafa/aksara-contracts/visual/catalog";
import {
  VisualNameSchema,
  visualCatalog,
} from "@nakafa/aksara-contracts/visual/catalog";
import {
  Array as Arr,
  Effect,
  Option,
  Predicate,
  Record as Rec,
  Schema,
  SchemaGetter,
  SchemaIssue,
  SchemaTransformation,
} from "effect";
import type { AssessmentSite } from "#compiler/assessment/error";
import { isTreeElement, treeRichText } from "#compiler/assessment/inline";
import { VisualPropsError } from "#compiler/errors";

/** Element names that are not components: the fragment and the intrinsic tags start in lower case. */
const COMPONENT_PATTERN = /^[A-Z]/u;

/**
 * Rich text as a content tree writes it, a string or an element of text and
 * formulas, read as the inline nodes an assessment stores. A tree is only read
 * this way to check it, so rich text is never written back to a tree.
 */
export const TreeRichSchema: RichSlot = Schema.Unknown.pipe(
  Schema.decodeTo(
    RichTextSchema,
    new SchemaTransformation.Transformation(
      SchemaGetter.transformEffect((value: unknown) =>
        treeRichText(value).pipe(
          Effect.mapError(
            ({ element, reason }) =>
              new SchemaIssue.InvalidValue(
                { message: `Expected rich text, not ${element} (${reason}).` },
                value
              )
          )
        )
      ),
      SchemaGetter.forbidden(() => "Rich text is never written to a tree.")
    )
  )
);

/** The Visual Catalog of a content tree: its rich text is read from elements. */
export const treeVisuals: VisualCatalog = visualCatalog(TreeRichSchema);

/** Formats a schema failure for the author, path by path. */
const formatIssue = SchemaIssue.makeFormatterDefault();

/**
 * Decodes the props of one catalog component as a content tree writes them,
 * refusing a prop that its schema does not name.
 */
export function decodeTreeProps(
  component: VisualName,
  props: ContentTreeProps
) {
  const schema: Schema.Decoder<unknown> = treeVisuals[component].props;
  return Schema.decodeEffect(schema)(props, {
    onExcessProperty: "error",
  }).pipe(Effect.mapError((error) => formatIssue(error.issue)));
}

/** Lists one element and every element nested in its children and its props. */
function elementsOf(
  element: ContentTreeElement
): readonly ContentTreeElement[] {
  return [
    element,
    ...Arr.flatMap(element.children, (child) =>
      isTreeElement(child) ? elementsOf(child) : []
    ),
    ...Arr.flatMap(Rec.values(element.props), elementsOfValue),
  ];
}

/** Checks whether a prop value is a list of values. */
function isList(value: ContentTreeValue): value is readonly ContentTreeValue[] {
  return Arr.isArray(value);
}

/** Lists the elements a prop value holds, in lists and objects too. */
function elementsOfValue(
  value: ContentTreeValue
): readonly ContentTreeElement[] {
  if (isTreeElement(value)) {
    return elementsOf(value);
  }
  if (isList(value)) {
    return Arr.flatMap(value, elementsOfValue);
  }
  if (Predicate.isObject(value)) {
    return Arr.flatMap(Rec.values(value), elementsOfValue);
  }
  return [];
}

/** Checks one component element against its catalog schema. */
function checkElement(element: ContentTreeElement, site: AssessmentSite) {
  const component = Option.liftPredicate(
    element.name,
    Schema.is(VisualNameSchema)
  );
  if (Option.isNone(component)) {
    return Effect.fail(
      new VisualPropsError({
        ...site,
        component: element.name,
        reason: "unknown",
      })
    );
  }
  return decodeTreeProps(component.value, element.props).pipe(
    Effect.mapError(
      (issue) =>
        new VisualPropsError({
          ...site,
          component: element.name,
          issue,
          reason: "props",
        })
    )
  );
}

/**
 * Checks every component of a content tree against the Visual Catalog: each
 * is a catalog component, and its props are the ones its schema takes.
 */
export const checkTreeVisuals = Effect.fn("AksaraCompiler.checkTreeVisuals")(
  function* (tree: ContentTreeElement, site: AssessmentSite) {
    const components = Arr.filter(elementsOf(tree), ({ name }) =>
      COMPONENT_PATTERN.test(name)
    );
    yield* Effect.forEach(
      components,
      (element) => checkElement(element, site),
      {
        discard: true,
      }
    );
  }
);
