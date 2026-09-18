const GENERAL_TEXT_ATTRIBUTES = new Set([
  "alt",
  "aria-label",
  "caption",
  "description",
  "helperCaption",
  "label",
  "placeholder",
  "subtitle",
  "title",
]);
const ADDRESS_TEXT_ATTRIBUTES = new Set([
  ...GENERAL_TEXT_ATTRIBUTES,
  "accessibilityLabel",
  "codomainLabel",
  "domainLabel",
  "inputLabel",
  "machineLabel",
  "timeUnit",
  "xAxisLabel",
  "yAxisLabel",
]);
const NESTED_ADDRESS_ATTRIBUTES = new Set([
  "chartConfig",
  "codomain",
  "content",
  "data",
  "datasets",
  "domain",
  "labels",
  "vectors",
]);
const TECHNICAL_LEAF_FIELDS = new Set([
  "chart",
  "className",
  "code",
  "color",
  "config",
  "dark",
  "decimalSeparator",
  "direction",
  "fill",
  "filename",
  "formulaType",
  "href",
  "id",
  "kind",
  "labelAnchorX",
  "labelPosition",
  "lang",
  "language",
  "light",
  "math",
  "position",
  "source",
  "src",
  "stroke",
  "style",
  "url",
  "xAxisDomain",
]);
const MATH_COMPONENT_NAMES = new Set(["BlockMath", "InlineMath"]);
const CODE_COMPONENT_NAMES = new Set(["CodeBlock"]);
const PROTECTED_COMPONENT_NAMES = new Set([
  ...MATH_COMPONENT_NAMES,
  ...CODE_COMPONENT_NAMES,
]);
const NON_PROSE_FIELD_NAMES = new Set([
  "chart",
  "className",
  "code",
  "color",
  "config",
  "fill",
  "href",
  "lang",
  "language",
  "source",
  "src",
  "stroke",
  "style",
  "url",
]);
const PROTECTED_LINE_COMPONENT_NAMES = new Set([
  ...PROTECTED_COMPONENT_NAMES,
  "a",
]);

/** Identifies a direct attribute already covered by general prose rules. */
export function isGeneralTextAttribute(name: string): boolean {
  return GENERAL_TEXT_ATTRIBUTES.has(name);
}

/** Identifies every direct JSX attribute covered by learner-address policy. */
export function isAddressTextAttribute(name: string): boolean {
  return ADDRESS_TEXT_ATTRIBUTES.has(name);
}

/** Identifies a structured prop that contains selected visible string leaves. */
export function isNestedAddressAttribute(name: string): boolean {
  return NESTED_ADDRESS_ATTRIBUTES.has(name);
}

/** Tells the address pass whether one nested string is rendered learner copy. */
export function isNestedAddressField(
  attributeName: string,
  fieldName: string | undefined
): boolean {
  if (!fieldName || TECHNICAL_LEAF_FIELDS.has(fieldName)) {
    return false;
  }
  if (attributeName === "labels") {
    return true;
  }
  if (attributeName === "content") {
    return fieldName === "input" || fieldName === "output";
  }
  if (attributeName === "chartConfig") {
    return fieldName === "label";
  }
  if (attributeName === "datasets" || attributeName === "data") {
    return fieldName === "name";
  }
  if (attributeName === "vectors") {
    return fieldName === "name";
  }
  return (
    (attributeName === "domain" || attributeName === "codomain") &&
    fieldName === "label"
  );
}

/** Tells prose traversal whether a component owns code or math source. */
export function isProtectedProseComponent(name: string | undefined): boolean {
  return PROTECTED_COMPONENT_NAMES.has(name ?? "");
}

/** Tells math traversal whether a component renders authored mathematics. */
export function isMathComponentName(name: string | undefined): boolean {
  return MATH_COMPONENT_NAMES.has(name ?? "");
}

/** Tells semicolon traversal whether a component renders authored code. */
export function isCodeComponentName(name: string | undefined): boolean {
  return CODE_COMPONENT_NAMES.has(name ?? "");
}

/** Tells raw-line traversal whether a component subtree stays uninspected. */
export function isProtectedLineComponent(name: string | undefined): boolean {
  return PROTECTED_LINE_COMPONENT_NAMES.has(name ?? "");
}

/** Tells the MDX adapter whether an attribute stores non-prose configuration. */
export function isNonProseFieldName(name: string | undefined): boolean {
  return name === undefined || NON_PROSE_FIELD_NAMES.has(name);
}
