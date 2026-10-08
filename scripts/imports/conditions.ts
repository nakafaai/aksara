import { Array as Arr, Predicate, Record as Rec, Schema } from "effect";

const JsonText = Schema.fromJsonString(Schema.Unknown);

/** Reads the one workspace source condition owned by TypeScript configuration. */
export function sourceConditionFromConfig(source: string): string {
  const config: unknown = Schema.decodeSync(JsonText)(source);
  const compilerOptions = Predicate.isObject(config)
    ? config.compilerOptions
    : undefined;
  const conditions = Predicate.isObject(compilerOptions)
    ? compilerOptions.customConditions
    : undefined;
  if (
    !Arr.isArray(conditions) ||
    conditions.length !== 1 ||
    typeof conditions[0] !== "string"
  ) {
    throw new Error(
      "TypeScript config must own exactly one workspace source condition"
    );
  }
  return conditions[0];
}

/** Preserves semantic condition order in one workspace package manifest. */
export function sourceConditionViolations(
  file: string,
  source: string,
  sourceCondition: string
): readonly string[] {
  const manifest: unknown = Schema.decodeSync(JsonText)(source);
  if (!Predicate.isObject(manifest)) {
    return [`${file}: package manifest must be an object`];
  }

  return Arr.flatMap(["imports", "exports"], (section) => {
    const entries = manifest[section];
    if (!Predicate.isObject(entries)) {
      return [];
    }
    return Arr.flatMap(Rec.toEntries(entries), ([specifier, descriptor]) =>
      descriptorViolations(
        file,
        `${section}/${specifier}`,
        descriptor,
        sourceCondition
      )
    );
  });
}

/** Checks every nested condition map and fallback descriptor in one export. */
function descriptorViolations(
  file: string,
  path: string,
  descriptor: unknown,
  sourceCondition: string
): readonly string[] {
  if (Arr.isArray(descriptor)) {
    return Arr.flatMap(descriptor, (entry, index) =>
      descriptorViolations(file, `${path}[${index}]`, entry, sourceCondition)
    );
  }
  if (!Predicate.isObject(descriptor)) {
    return [];
  }

  const orderViolations =
    sourceCondition in descriptor && Rec.keys(descriptor)[0] !== sourceCondition
      ? [`${file}: ${path} must put ${sourceCondition} first`]
      : [];
  const nestedViolations = Arr.flatMap(
    Rec.toEntries(descriptor),
    ([condition, target]) =>
      descriptorViolations(
        file,
        `${path}/${condition}`,
        target,
        sourceCondition
      )
  );
  return [...orderViolations, ...nestedViolations];
}
