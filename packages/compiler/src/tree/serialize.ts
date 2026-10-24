import {
  ContentKeySchema,
  CorpusSourcePathSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  type ContentTreeChild,
  type ContentTreeElement,
  ContentTreeIntrinsicTagSchema,
  type ContentTreeValue,
} from "@nakafa/aksara-contracts/tree";
import { Array as Arr, Effect, Predicate, Record as Rec, Schema } from "effect";
import {
  ContentTreePolicyError,
  type ContentTreePolicyReason,
} from "#compiler/errors";
import {
  componentNameOf,
  TREE_FRAGMENT,
  TreeCall,
} from "#compiler/tree/runtime";

/** Document identity that every serialization failure names. */
export const TreeSiteSchema = Schema.Struct({
  contentKey: ContentKeySchema,
  sourcePath: CorpusSourcePathSchema,
});
export type TreeSite = typeof TreeSiteSchema.Type;

/** The element and the prop that hold one value of the tree. */
const ValueLocationSchema = Schema.Struct({
  element: Schema.String,
  prop: Schema.String,
});
type ValueLocation = typeof ValueLocationSchema.Type;

/** Name of the fragment element, which renders its children without an element. */
const FRAGMENT_NAME = "fragment";
/** Name of the JSX prop that carries an element's children. */
const CHILDREN_PROP = "children";
/** Reserved key that only an element may carry. */
const ELEMENT_KEY = "$node";

/** Builds the policy error for one value, naming its document, element, and prop. */
function valueError(
  site: TreeSite,
  location: ValueLocation,
  reason: ContentTreePolicyReason
) {
  return new ContentTreePolicyError({
    contentKey: site.contentKey,
    element: location.element,
    prop: location.prop,
    reason,
    sourcePath: site.sourcePath,
  });
}

/** Checks whether a non-null object is a plain JSON object. */
function isPlainObject(value: object): value is Record<string, unknown> {
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

/** Resolves the name of one recorded call: the fragment, an intrinsic tag, or a component. */
function elementName(call: TreeCall, site: TreeSite) {
  if (call.type === TREE_FRAGMENT) {
    return Effect.succeed(FRAGMENT_NAME);
  }
  const component = componentNameOf(call.type);
  if (component !== undefined) {
    return Effect.succeed(component);
  }
  if (Schema.is(ContentTreeIntrinsicTagSchema)(call.type)) {
    return Effect.succeed(call.type);
  }
  const element = typeof call.type === "string" ? call.type : "unknown";
  return Effect.fail(
    new ContentTreePolicyError({
      contentKey: site.contentKey,
      element,
      prop: null,
      reason: "unknown-element",
      sourcePath: site.sourcePath,
    })
  );
}

/** Keeps a finite number as JSON data, writing -0 as 0 because JSON cannot carry it. */
function serializeNumber(
  value: number,
  site: TreeSite,
  location: ValueLocation
) {
  if (!Number.isFinite(value)) {
    return Effect.fail(valueError(site, location, "non-finite-number"));
  }
  return Effect.succeed(value === 0 ? 0 : value);
}

/** Serializes one prop value to JSON data or to a nested element. */
function serializeValue(
  value: unknown,
  site: TreeSite,
  location: ValueLocation
): Effect.Effect<ContentTreeValue, ContentTreePolicyError> {
  if (
    value === null ||
    typeof value === "string" ||
    typeof value === "boolean"
  ) {
    return Effect.succeed(value);
  }
  if (typeof value === "number") {
    return serializeNumber(value, site, location);
  }
  if (value instanceof TreeCall) {
    return serializeCall(value, site);
  }
  if (Arr.isArray(value)) {
    return Effect.forEach(value, (item, index) =>
      serializeValue(item, site, {
        ...location,
        prop: `${location.prop}[${index}]`,
      })
    );
  }
  if (Predicate.isObject(value) && isPlainObject(value)) {
    return serializeObject(value, site, location);
  }
  return Effect.fail(valueError(site, location, "not-json"));
}

/**
 * Serializes one plain object of JSON data. A symbol key cannot be written as
 * JSON, and the reserved element key is never data. An undefined member is
 * omitted, as React omits it, while an undefined list value stays refused.
 */
function serializeObject(
  value: Record<string, unknown>,
  site: TreeSite,
  location: ValueLocation
) {
  if (Object.getOwnPropertySymbols(value).length > 0) {
    return Effect.fail(valueError(site, location, "not-json"));
  }
  const keys = Rec.keys(value);
  if (Arr.contains(keys, ELEMENT_KEY)) {
    return Effect.fail(valueError(site, location, "reserved-key"));
  }
  return Effect.map(
    Effect.forEach(
      Arr.filter(keys, (key) => value[key] !== undefined),
      (key) =>
        Effect.map(
          serializeValue(value[key], site, {
            ...location,
            prop: `${location.prop}.${key}`,
          }),
          (serialized): [string, ContentTreeValue] => [key, serialized]
        )
    ),
    (entries) => Rec.fromEntries(entries)
  );
}

/** Serializes one child value into the text or elements React would render for it. */
function serializeChild(
  value: unknown,
  site: TreeSite,
  location: ValueLocation
): Effect.Effect<ContentTreeChild[], ContentTreePolicyError> {
  if (value === null || value === undefined || typeof value === "boolean") {
    return Effect.succeed([]);
  }
  if (typeof value === "string") {
    return Effect.succeed([value]);
  }
  if (typeof value === "number") {
    return Effect.map(serializeNumber(value, site, location), (number) => [
      String(number),
    ]);
  }
  if (value instanceof TreeCall) {
    return Effect.map(serializeCall(value, site), (element) => [element]);
  }
  if (Arr.isArray(value)) {
    return Effect.map(
      Effect.forEach(value, (item) => serializeChild(item, site, location)),
      Arr.flatten
    );
  }
  return Effect.fail(valueError(site, location, "unsupported-child"));
}

/** Serializes one recorded call with its name, its props, and its children. */
function serializeCall(
  call: TreeCall,
  site: TreeSite
): Effect.Effect<ContentTreeElement, ContentTreePolicyError> {
  return Effect.gen(function* () {
    const name = yield* elementName(call, site);
    const props = yield* serializeProps(call, site, name);
    const children = yield* serializeChild(call.props[CHILDREN_PROP], site, {
      element: name,
      prop: CHILDREN_PROP,
    });
    const element: ContentTreeElement = {
      $node: "element",
      children,
      name,
      props,
    };
    return element;
  });
}

/**
 * Serializes every prop of one call except its children. A symbol-keyed prop
 * is named by its symbol, and an undefined prop is omitted as React omits it.
 */
function serializeProps(call: TreeCall, site: TreeSite, element: string) {
  const [symbolKey] = Object.getOwnPropertySymbols(call.props);
  if (symbolKey !== undefined) {
    return Effect.fail(
      valueError(site, { element, prop: String(symbolKey) }, "not-json")
    );
  }
  const keys = Arr.filter(Rec.keys(call.props), (key) => key !== CHILDREN_PROP);
  if (Arr.contains(keys, ELEMENT_KEY)) {
    return Effect.fail(
      valueError(site, { element, prop: ELEMENT_KEY }, "reserved-key")
    );
  }
  return Effect.map(
    Effect.forEach(
      Arr.filter(keys, (key) => call.props[key] !== undefined),
      (key) =>
        Effect.map(
          serializeValue(call.props[key], site, { element, prop: key }),
          (value): [string, ContentTreeValue] => [key, value]
        )
    ),
    (entries) => Rec.fromEntries(entries)
  );
}

/** Serializes the root call returned by the compiled body, failing on its first policy violation. */
export function serializeContentTree(
  root: TreeCall,
  site: TreeSite
): Effect.Effect<ContentTreeElement, ContentTreePolicyError> {
  return Effect.map(serializeCall(root, site), (element) =>
    element.name === FRAGMENT_NAME
      ? element
      : {
          $node: "element",
          children: [element],
          name: FRAGMENT_NAME,
          props: {},
        }
  );
}
