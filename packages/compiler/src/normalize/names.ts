import type { RendererDomain } from "@nakafa/aksara-contracts/renderer/domain";
import { Effect, Schema } from "effect";

const LEGACY_ROOT = "packages/contents";
const MAXIMUM_COMPONENT_NAME_LENGTH = 128;
const SEGMENT_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
const COMPONENT_PATTERN = /^[A-Z][A-Za-z0-9]*$/u;

/** One relative implementation cannot form a stable renderer contract name. */
export class RelativeComponentNameError extends Schema.TaggedError<RelativeComponentNameError>()(
  "RelativeComponentNameError",
  {
    componentName: Schema.String,
    reason: Schema.Literal(
      "component-name",
      "module-path",
      "name-length",
      "owner-kind",
      "unexpected-duplicate"
    ),
    sourcePath: Schema.String,
  }
) {}

/** Multiple implementation identities would claim one renderer contract. */
export class RelativeComponentCollisionError extends Schema.TaggedError<RelativeComponentCollisionError>()(
  "RelativeComponentCollisionError",
  {
    contractName: Schema.NonEmptyTrimmedString,
    identities: Schema.Array(Schema.NonEmptyTrimmedString).pipe(
      Schema.minItems(2)
    ),
    rendererDomain: Schema.String,
  }
) {}

/** Exact component export owned by one resolved legacy TSX module. */
export interface RelativeComponentIdentity {
  readonly componentName: string;
  readonly rendererDomain: RendererDomain;
  readonly sourcePath: string;
}

/** Component identity paired with its canonical route-domain contract name. */
export interface NamedRelativeComponent extends RelativeComponentIdentity {
  readonly contractName: string;
}

interface OwnedComponent extends RelativeComponentIdentity {
  readonly owner: readonly string[];
}

interface NamedOwnedComponent extends OwnedComponent {
  readonly contractName: string;
}

type ComponentGroup<T> = readonly [T, ...T[]];

/** Converts one validated lower-kebab owner segment into PascalCase. */
function pascalSegment(segment: string) {
  return segment
    .split("-")
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join("");
}

/** Selects the route owner of one resolved legacy implementation. */
function componentOwner(
  sourcePath: string,
  componentName: string
): Effect.Effect<readonly string[], RelativeComponentNameError> {
  const segments = sourcePath.split("/");
  const fileName = segments.at(-1);
  const moduleName = fileName?.slice(0, -4);
  if (
    segments.slice(0, 2).join("/") !== LEGACY_ROOT ||
    !fileName?.endsWith(".tsx") ||
    !moduleName ||
    !SEGMENT_PATTERN.test(moduleName) ||
    segments.some((segment) => !segment)
  ) {
    return Effect.fail(
      new RelativeComponentNameError({
        componentName,
        reason: "module-path",
        sourcePath,
      })
    );
  }
  const path = segments.slice(2, -1);
  if (path.some((segment) => !SEGMENT_PATTERN.test(segment))) {
    return Effect.fail(
      new RelativeComponentNameError({
        componentName,
        reason: "module-path",
        sourcePath,
      })
    );
  }
  if (path[0] === "articles") {
    return Effect.succeed(["article", ...path.slice(1)]);
  }
  if (path[0] === "material" && path[1] === "lesson") {
    return Effect.succeed(["material", ...path.slice(2)]);
  }
  if (path[0] === "question-bank" && path[1] === "tryout") {
    return Effect.succeed(["tryout", ...path.slice(2)]);
  }
  return Effect.fail(
    new RelativeComponentNameError({
      componentName,
      reason: "owner-kind",
      sourcePath,
    })
  );
}

/** Validates one implementation identity and resolves its route owner. */
const ownComponent = Effect.fn("AksaraCompiler.ownRelativeComponent")(
  function* (identity: RelativeComponentIdentity) {
    if (!COMPONENT_PATTERN.test(identity.componentName)) {
      return yield* new RelativeComponentNameError({
        ...identity,
        reason: "component-name",
      });
    }
    const owner = yield* componentOwner(
      identity.sourcePath,
      identity.componentName
    );
    return { ...identity, owner } satisfies OwnedComponent;
  }
);

/** Unifies the two measured quantitative graph export names. */
function componentRole(component: RelativeComponentIdentity) {
  if (
    component.rendererDomain === "snbt-quant" &&
    component.componentName === "QuestionGraph"
  ) {
    return "Graph";
  }
  return component.componentName;
}

/** Produces one domain-qualified key for collision-safe grouping. */
function domainKey(component: RelativeComponentIdentity, name: string) {
  return `${component.rendererDomain}\u0000${name}`;
}

/** Groups components by renderer domain and measured component role. */
function groupComponents<T extends RelativeComponentIdentity>(
  components: readonly T[]
) {
  const groups = new Map<string, [T, ...T[]]>();
  for (const component of components) {
    const key = domainKey(component, componentRole(component));
    const group = groups.get(key);
    if (group) {
      group.push(component);
    } else {
      groups.set(key, [component]);
    }
  }
  return groups;
}

/** Restricts alias generation to the four measured collision families. */
function supportsAlias(component: RelativeComponentIdentity) {
  const role = componentRole(component);
  return (
    (component.rendererDomain === "politics" && role === "ElectabilityChart") ||
    (component.rendererDomain === "snbt-general" && role === "SalesChart") ||
    (component.rendererDomain === "snbt-math" && role === "Graph") ||
    (component.rendererDomain === "snbt-quant" && role === "Graph")
  );
}

/** Builds the exact measured route-owned alias for one duplicate component. */
function routeContract(component: OwnedComponent) {
  const role = componentRole(component);
  if (component.rendererDomain === "politics") {
    const article = component.owner
      .slice(-1)
      .flatMap((segment) => segment.split("-").slice(0, 1))
      .map(pascalSegment)
      .join("");
    return `${article}${role}`;
  }
  const owner = component.owner.slice(-2).map(pascalSegment).join("");
  return `${owner}${role}`;
}

/** Rejects a contract name above the renderer contract ceiling. */
function validateLength(
  component: OwnedComponent,
  contractName: string
): Effect.Effect<string, RelativeComponentNameError> {
  if (contractName.length <= MAXIMUM_COMPONENT_NAME_LENGTH) {
    return Effect.succeed(contractName);
  }
  return Effect.fail(
    new RelativeComponentNameError({
      componentName: component.componentName,
      reason: "name-length",
      sourcePath: component.sourcePath,
    })
  );
}

/** Creates one typed collision for a domain-qualified renderer identity. */
function collision(
  components: ComponentGroup<RelativeComponentIdentity>,
  contractName: string
) {
  return new RelativeComponentCollisionError({
    contractName,
    identities: components.map(
      ({ componentName, sourcePath }) => `${sourcePath}#${componentName}`
    ),
    rendererDomain: components[0].rendererDomain,
  });
}

/** Assigns exact route aliases to one measured same-domain collision group. */
const nameDuplicateGroup = Effect.fn("AksaraCompiler.nameDuplicateGroup")(
  function* (
    components: ComponentGroup<OwnedComponent>,
    reservedNames: ReadonlySet<string>
  ) {
    const [first] = components;
    const role = componentRole(first);
    if (!supportsAlias(first)) {
      return yield* new RelativeComponentNameError({
        componentName: first.componentName,
        reason: "unexpected-duplicate",
        sourcePath: first.sourcePath,
      });
    }
    const candidates = components.map(routeContract);
    const collides =
      new Set(candidates).size !== candidates.length ||
      candidates.some((name) => reservedNames.has(domainKey(first, name)));
    if (collides) {
      return yield* collision(components, role);
    }
    return yield* Effect.forEach(components, (component) =>
      validateLength(component, routeContract(component)).pipe(
        Effect.map((contractName) => ({ ...component, contractName }))
      )
    );
  }
);

/**
 * Preserves cross-domain names and assigns exact route-owned aliases only to
 * the measured same-domain collisions. Delete this Module after cutover.
 */
export const nameRelativeComponents = Effect.fn(
  "AksaraCompiler.nameRelativeComponents"
)(function* (identities: readonly RelativeComponentIdentity[]) {
  const owned = yield* Effect.forEach(identities, ownComponent);
  const groups = groupComponents(owned);
  const reservedNames = new Set(
    [...groups.values()].flatMap((components) =>
      components.length === 1
        ? [domainKey(components[0], components[0].componentName)]
        : []
    )
  );
  const named: NamedOwnedComponent[] = [];
  for (const components of groups.values()) {
    if (components.length === 1) {
      const [component] = components;
      const contractName = yield* validateLength(
        component,
        component.componentName
      );
      named.push({ ...component, contractName });
    } else {
      named.push(...(yield* nameDuplicateGroup(components, reservedNames)));
    }
  }
  return named.map(
    ({ componentName, contractName, rendererDomain, sourcePath }) => ({
      componentName,
      contractName,
      rendererDomain,
      sourcePath,
    })
  ) satisfies readonly NamedRelativeComponent[];
});
