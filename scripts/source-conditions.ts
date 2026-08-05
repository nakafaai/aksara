import { isRecord } from "effect/Predicate";

/** Reads the one workspace source condition owned by TypeScript configuration. */
export function sourceConditionFromConfig(source: string): string {
  const config: unknown = JSON.parse(source);
  const compilerOptions = isRecord(config) ? config.compilerOptions : undefined;
  const conditions = isRecord(compilerOptions)
    ? compilerOptions.customConditions
    : undefined;
  if (
    !Array.isArray(conditions) ||
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
  const manifest: unknown = JSON.parse(source);
  if (!isRecord(manifest)) {
    return [`${file}: package manifest must be an object`];
  }

  return ["imports", "exports"].flatMap((section) => {
    const entries = manifest[section];
    if (!isRecord(entries)) {
      return [];
    }
    return Object.entries(entries).flatMap(([specifier, descriptor]) =>
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
  if (Array.isArray(descriptor)) {
    return descriptor.flatMap((entry, index) =>
      descriptorViolations(file, `${path}[${index}]`, entry, sourceCondition)
    );
  }
  if (!isRecord(descriptor)) {
    return [];
  }

  const violations: string[] = [];
  if (
    sourceCondition in descriptor &&
    Object.keys(descriptor)[0] !== sourceCondition
  ) {
    violations.push(`${file}: ${path} must put ${sourceCondition} first`);
  }
  for (const [condition, target] of Object.entries(descriptor)) {
    violations.push(
      ...descriptorViolations(
        file,
        `${path}/${condition}`,
        target,
        sourceCondition
      )
    );
  }
  return violations;
}
