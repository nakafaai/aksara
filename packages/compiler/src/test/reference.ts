import { type CompileOptions, compile, runSync } from "@mdx-js/mdx";
import { ContentTreeSchema } from "@nakafa/aksara-contracts/tree";
import {
  Array as Arr,
  Effect,
  FileSystem,
  MutableHashMap,
  Option,
  Order,
  Path,
  Predicate,
  Record as Rec,
  Schema,
} from "effect";
import type { PlatformError } from "effect/PlatformError";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { MDX_PROVIDER_SOURCE } from "#compiler/config";

/** Capitalized JSX tags name the renderer components that a document uses. */
const COMPONENT_TAG = /<([A-Z][A-Za-z0-9]*)[\s/>]/gu;
/** Inline function attributes compute their props, so the runtime evaluates them. */
const DATA_COMPUTING_ATTRIBUTE = /[=]\{\s*\(/u;
/** Type that the reference runtime gives to a fragment. */
const FRAGMENT = Symbol("reference.fragment");
/** Calls that the reference runtime recorded, so that prop data can never pass for one. */
const referenceCalls = new WeakSet<object>();
/** Renderer component name of every placeholder that one reference runtime created. */
const placeholderNames = MutableHashMap.empty<unknown, string>();

/** The reference body threw while it evaluated the compiled document. */
class ReferenceRunError extends Schema.TaggedError<
  ReferenceRunError,
  { readonly brand: unique symbol }
>()("ReferenceRunError", { cause: Schema.Unknown }) {}

/** One JSX call exactly as the React-style reference runtime received it. */
const ReferenceCallSchema = Schema.Struct({
  props: Schema.Record(Schema.String, Schema.Unknown),
  type: Schema.Unknown,
});
type ReferenceCall = typeof ReferenceCallSchema.Type;
/** Any plain record of unknown values. */
const RecordSchema = Schema.Record(Schema.String, Schema.Unknown);

/** MDX options that compile the corpus exactly as the publisher does. */
export const COMPILE_OPTIONS: CompileOptions = {
  development: false,
  format: "mdx",
  outputFormat: "function-body",
  providerImportSource: MDX_PROVIDER_SOURCE,
  remarkPlugins: [remarkGfm, [remarkMath, { singleDollarTextMath: false }]],
};

/** Creates one placeholder component whose renderer name the reference runtime reads back. */
function namedComponent(name: string) {
  /** Placeholder that the reference runtime records by identity and never renders. */
  const component = () => null;
  MutableHashMap.set(placeholderNames, component, name);
  return component;
}

/** Checks whether a value is a call that the reference runtime recorded. */
function isReferenceCall(value: unknown): value is ReferenceCall {
  return Predicate.isObject(value) && referenceCalls.has(value);
}

/** Records one reference JSX call exactly as the compiled body passes it. */
function recordReferenceCall(type: unknown, props: Record<string, unknown>) {
  const call = { props, type };
  referenceCalls.add(call);
  return call;
}

/** Names one reference element type the way the content tree names it. */
function referenceName(type: unknown): string {
  if (type === FRAGMENT) {
    return "fragment";
  }
  return Option.match(MutableHashMap.get(placeholderNames, type), {
    onNone: () => String(type),
    onSome: (name) => name,
  });
}

/** Normalizes one prop value, so that nested reference calls become elements too. */
function referenceValue(value: unknown): unknown {
  if (isReferenceCall(value)) {
    return referenceElement(value);
  }
  if (Arr.isArray(value)) {
    return Arr.map(value, referenceValue);
  }
  if (Schema.is(RecordSchema)(value)) {
    return Rec.map(value, referenceValue);
  }
  return value === 0 ? 0 : value;
}

/** Normalizes children the way React renders them: lists flatten and empty values vanish. */
function referenceChildren(value: unknown): readonly unknown[] {
  if (value === null || value === undefined || typeof value === "boolean") {
    return [];
  }
  if (Arr.isArray(value)) {
    return Arr.flatMap(value, referenceChildren);
  }
  if (typeof value === "number") {
    return [String(value)];
  }
  if (typeof value === "string") {
    return [value];
  }
  return [referenceValue(value)];
}

/** Normalizes one reference call into the element shape that the content tree must produce. */
function referenceElement(call: ReferenceCall) {
  const props = Arr.filter(
    Rec.toEntries(call.props),
    ([key, value]) => key !== "children" && value !== undefined
  );
  return {
    $node: "element",
    children: referenceChildren(call.props.children),
    name: referenceName(call.type),
    props: Rec.fromEntries(
      Arr.map(props, ([key, value]): [string, unknown] => [
        key,
        referenceValue(value),
      ])
    ),
  };
}

/** Lists every corpus document below one folder, in code-unit order. */
function corpusDocuments(
  folder: string
): Effect.Effect<
  readonly string[],
  PlatformError,
  FileSystem.FileSystem | Path.Path
> {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const entries = Arr.sort(yield* fs.readDirectory(folder), Order.String);
    const found = yield* Effect.forEach(entries, (entry) => {
      const full = path.join(folder, entry);
      return Effect.flatMap(fs.stat(full), (info) =>
        info.type === "Directory"
          ? corpusDocuments(full)
          : Effect.succeed(entry.endsWith(".mdx") ? [full] : [])
      );
    });
    return Arr.flatten(found);
  });
}

/** Reads every corpus document whose props compute data, with its repository-relative path. */
export const dataComputingDocuments = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const documents = yield* corpusDocuments(path.resolve("../corpus"));
  const sources = yield* Effect.forEach(documents, (document) =>
    Effect.map(fs.readFileString(document), (rawMdx) => ({
      rawMdx,
      sourcePath: path.relative(path.resolve("../.."), document),
    }))
  );
  return Arr.filter(sources, ({ rawMdx }) =>
    DATA_COMPUTING_ATTRIBUTE.test(rawMdx)
  );
});

/** Lists the renderer components that a document names, with the placeholder every document has. */
export function componentNamesOf(rawMdx: string): readonly string[] {
  const matches = Arr.map(
    [...rawMdx.matchAll(COMPONENT_TAG)],
    (match) => match[1] ?? ""
  );
  return Arr.sort(Arr.dedupe(["BlockMath", ...matches]), Order.String);
}

/** Evaluates one compiled document with the reference runtime and returns its normalized tree. */
export const referenceTree = (rawMdx: string) =>
  Effect.gen(function* () {
    const compiled = yield* Effect.promise(() =>
      compile(rawMdx, COMPILE_OPTIONS)
    );
    const names = componentNamesOf(rawMdx);
    const components = Rec.fromEntries(
      Arr.map(names, (name): [string, () => null] => [
        name,
        namedComponent(name),
      ])
    );
    const root = yield* Effect.try({
      catch: (cause) => new ReferenceRunError({ cause }),
      try: () =>
        runSync(String(compiled), {
          Fragment: FRAGMENT,
          jsx: recordReferenceCall,
          jsxs: recordReferenceCall,
          useMDXComponents: () => components,
        }).default({}),
    }).pipe(Effect.orDie);
    const element = referenceValue(root);
    const isFragment =
      Schema.is(RecordSchema)(element) && element.name === "fragment";
    return yield* Schema.decodeUnknownEffect(ContentTreeSchema)(
      isFragment
        ? element
        : { $node: "element", children: [element], name: "fragment", props: {} }
    );
  }).pipe(Effect.orDie);
