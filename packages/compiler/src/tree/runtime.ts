import { Array as Arr, Record as Rec } from "effect";

/** Fragment identity that the compiled body receives in place of React's fragment. */
export const TREE_FRAGMENT = Symbol("aksara.content-tree.fragment");

/** Renderer component name of each placeholder that one evaluation created. */
const COMPONENT_NAMES = new WeakMap<object, string>();
/** Capitalized JSX names are renderer components; lowercase names are intrinsic tags. */
const CAPITALIZED_NAME = /^[A-Z]/u;

/** One call of the compiled body's JSX runtime, kept as data until it is serialized. */
export class TreeCall {
  readonly type: unknown;
  readonly props: Readonly<Record<string, unknown>>;

  /** Keeps the element type and the props exactly as the compiled body passed them. */
  constructor(type: unknown, props: Readonly<Record<string, unknown>>) {
    this.type = type;
    this.props = props;
  }
}

/** Returns the renderer component name of a placeholder, or nothing for any other type. */
export function componentNameOf(type: unknown) {
  return typeof type === "function" ? COMPONENT_NAMES.get(type) : undefined;
}

/** Creates the placeholder that the compiled body references as one renderer component. */
function createComponentReference(name: string) {
  /** Placeholder for one renderer component; the evaluation records it instead of rendering it. */
  const reference = () => null;
  COMPONENT_NAMES.set(reference, name);
  return reference;
}

/** Checks whether a JSX name is a renderer component rather than an intrinsic tag. */
function isComponentName(name: string) {
  return CAPITALIZED_NAME.test(name);
}

/** Records one JSX call exactly as the compiled body passes it. */
function recordCall(type: unknown, props: Readonly<Record<string, unknown>>) {
  return new TreeCall(type, props);
}

/**
 * Creates the JSX runtime that evaluates one compiled body into a tree. Every
 * capitalized name becomes a placeholder, and intrinsic tags stay plain names.
 */
export function createTreeRuntime(componentNames: readonly string[]) {
  const components = Rec.fromEntries(
    Arr.map(
      Arr.filter(componentNames, isComponentName),
      (name): [string, () => null] => [name, createComponentReference(name)]
    )
  );
  return {
    Fragment: TREE_FRAGMENT,
    jsx: recordCall,
    jsxs: recordCall,
    useMDXComponents: () => components,
  };
}
