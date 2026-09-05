const URI_SCHEME_PATTERN = /^[A-Za-z][A-Za-z\d+.-]*:/u;
const PROTOCOL_RELATIVE_PATTERN = /^\/\//u;
const EXPLICIT_EXTERNAL_PATTERN = /(?:(?:https?|ftp):\/\/|(?:mailto|tel):)/iu;
const EMBEDDED_PROTOCOL_RELATIVE_PATTERN =
  /(?:^|[\s("'=])(\/\/(?=[A-Za-z\d.-]+\.[A-Za-z]{2,}(?:[/:?#]|$)))/iu;
const SRCSET_EXTERNAL_PATTERN = /(?:^|[\s,])(?:[A-Za-z][A-Za-z\d+.-]*:|\/\/)/iu;
const SRCSET_VALUE_PATTERN = /[A-Za-z/]/u;
const NON_WHITESPACE_PATTERN = /\S/u;
const DESTINATION_ATTRIBUTES = new Set([
  "action",
  "formaction",
  "href",
  "poster",
  "source",
  "src",
  "to",
  "uri",
  "url",
]);
const NATIVE_DESTINATION_ATTRIBUTES = new Map([
  ["blockquote", new Set(["cite"])],
  ["del", new Set(["cite"])],
  ["img", new Set(["srcset"])],
  ["ins", new Set(["cite"])],
  ["object", new Set(["data"])],
  ["q", new Set(["cite"])],
  ["source", new Set(["srcset"])],
]);
const DESTINATION_ATTRIBUTE_SUFFIXES = ["uri", "url"] as const;

export interface ExternalMatch {
  index: number;
  value: string;
}

/** Recognizes every absolute or protocol-relative external destination. */
export function isExternalDestination(destination: string): boolean {
  const normalized = destination.trim();
  return (
    PROTOCOL_RELATIVE_PATTERN.test(normalized) ||
    URI_SCHEME_PATTERN.test(normalized)
  );
}

/** Finds an explicit external protocol without mistaking ordinary colons. */
function explicitExternalMatch(text: string): ExternalMatch | undefined {
  const match = EXPLICIT_EXTERNAL_PATTERN.exec(text);
  if (match?.index !== undefined) {
    return { index: match.index, value: match[0] };
  }
  const protocolRelative = EMBEDDED_PROTOCOL_RELATIVE_PATTERN.exec(text);
  const value = protocolRelative?.[1];
  if (protocolRelative?.index === undefined || value === undefined) {
    return;
  }
  return {
    index: protocolRelative.index + protocolRelative[0].indexOf(value),
    value,
  };
}

/** Matches a complete destination only when the whole value is external. */
function completeExternalMatch(text: string): ExternalMatch | undefined {
  if (!isExternalDestination(text)) {
    return;
  }
  return {
    index: Math.max(0, text.search(NON_WHITESPACE_PATTERN)),
    value: text.trim(),
  };
}

/** Finds an external URL scheme at the start of any srcset candidate. */
function srcSetExternalMatch(text: string): ExternalMatch | undefined {
  const match = SRCSET_EXTERNAL_PATTERN.exec(text);
  if (!match) {
    return;
  }
  const valueIndex = Math.max(0, match[0].search(SRCSET_VALUE_PATTERN));
  return {
    index: match.index + valueIndex,
    value: match[0].slice(valueIndex),
  };
}

/** Applies the stricter whole-value rule only to destination fields. */
export function externalMatch(
  text: string,
  destinationAttribute: boolean,
  srcSetAttribute = false
): ExternalMatch | undefined {
  if (srcSetAttribute) {
    return srcSetExternalMatch(text);
  }
  return destinationAttribute
    ? completeExternalMatch(text)
    : explicitExternalMatch(text);
}

/** Recognizes exact and domain-specific JSX destination field names. */
export function isDestinationAttribute(
  name: string | undefined,
  elementName?: string
): boolean {
  if (!name) {
    return false;
  }
  const normalized = name.toLowerCase();
  return (
    DESTINATION_ATTRIBUTES.has(normalized) ||
    NATIVE_DESTINATION_ATTRIBUTES.get(elementName ?? "")?.has(normalized) ===
      true ||
    DESTINATION_ATTRIBUTE_SUFFIXES.some((suffix) => normalized.endsWith(suffix))
  );
}

/** Recognizes the candidate-list syntax used by native image sources. */
export function isSrcSetAttribute(
  name: string | undefined,
  elementName?: string
): boolean {
  return (
    name?.toLowerCase() === "srcset" &&
    (elementName === "img" || elementName === "source")
  );
}
